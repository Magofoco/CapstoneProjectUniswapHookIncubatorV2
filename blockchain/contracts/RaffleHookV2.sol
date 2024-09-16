// SPDX-License-Identifier: MIT 
pragma solidity 0.8.26;

import {BaseHook} from "../lib/v4-periphery/src/base/hooks/BaseHook.sol";
import {ERC20} from "solmate/src/tokens/ERC20.sol";

import {CurrencyLibrary, Currency} from "v4-core/types/Currency.sol";
import {CurrencySettler} from "@uniswap/v4-core/test/utils/CurrencySettler.sol";
import {PoolKey} from "v4-core/types/PoolKey.sol";
import {BalanceDeltaLibrary, BalanceDelta} from "v4-core/types/BalanceDelta.sol";

import {IPoolManager} from "v4-core/interfaces/IPoolManager.sol";
import {PoolId, PoolIdLibrary} from "v4-core/types/PoolId.sol";

import {Hooks} from "v4-core/libraries/Hooks.sol";
import {BeforeSwapDelta, toBeforeSwapDelta} from "v4-core/types/BeforeSwapDelta.sol";


contract RaffleHookV2 is BaseHook {
	// Use CurrencyLibrary and BalanceDeltaLibrary
	// to add some helper functions over the Currency and BalanceDelta
	// data types 
	using CurrencySettler for Currency;
    using BalanceDeltaLibrary for BalanceDelta;
    
    int128 public constant COMMISSION_RATE = 1000;
    uint256 constant batchSize = 50000; // every 50K ticket issued will reset the batch

    struct Prize {
        uint256 prizeAmount; 
        bool claimed;
        Ticket winningTicket;
    }

    struct Ticket {
        uint256 raffleBatch;
        uint256 lowerNumber;
        uint256 upperNumber;
    }

    struct Batch {
        uint256 currentBatch;
        uint256 currentBatchTicketNumber;
    }

    // pool raffle status
    mapping(PoolId poolId => Batch raffleBatch) public raffleBatchByPool;

	// winners, and allocated prize
	mapping(PoolId poolId =>
        mapping(uint256 raffeBatch => Prize prize))
                public winnersTicketList;

    mapping(PoolId poolId => 
        mapping(uint256 raffeBatch =>
            mapping(address participants => Ticket ticket)))
                public ticketList;
    

    // recording the unallocated portion of Pot
    mapping(PoolId poolId => uint256 unallocatedPot) public RafflePot;

	// Amount of points someone gets for referring someone else
    uint256 public constant POINTS_FOR_REFERRAL = 500 * 10 ** 18;


    // Callback Data for winner claiming prize
    struct CallbackData {
        uint256 amount;
        Currency currency0;
        address sender;
    }

	// Initialize BaseHook and ERC20
    constructor(
        IPoolManager _manager,
        string memory _name,
        string memory _symbol
    ) BaseHook(_manager) {}

	// Set up hook permissions to return `true`
	// for the two hook functions we are using
    function getHookPermissions()
        public
        pure
        override
        returns (Hooks.Permissions memory)
    {
        return
            Hooks.Permissions({
                beforeInitialize: false,
                afterInitialize: false,
                beforeAddLiquidity: false,
                beforeRemoveLiquidity: false,
                afterAddLiquidity: false,
                afterRemoveLiquidity: false,
                beforeSwap: true,
                afterSwap: true,
                beforeDonate: false,
                afterDonate: false,
                beforeSwapReturnDelta: true,
                afterSwapReturnDelta: false,
                afterAddLiquidityReturnDelta: false,
                afterRemoveLiquidityReturnDelta: false
            });
    }

	function beforeSwap(
        address,
        PoolKey calldata key,
        IPoolManager.SwapParams calldata params,
        bytes calldata
    ) external override returns (bytes4, BeforeSwapDelta, uint24) {
        int128 amountInOutPositive = params.amountSpecified > 0
            ? int128( params.amountSpecified)
            : int128(-params.amountSpecified);

        // taking a cut from token0
        int128 commissionAmount = (amountInOutPositive * COMMISSION_RATE) / 10000;
        
        // in current version, we handle selling ETH only
        if(params.zeroForOne){
            BeforeSwapDelta beforeSwapDelta = toBeforeSwapDelta(commissionAmount, 0);

            // creating a debit of token0 to PM as commission.
            key.currency0.take(
                poolManager,
                address(this),
                uint256(int256(commissionAmount)),
                true
            );
            return (this.beforeSwap.selector, beforeSwapDelta, 0);
        } else {
            BeforeSwapDelta beforeSwapDelta = toBeforeSwapDelta(0, 0);
            return (this.beforeSwap.selector, beforeSwapDelta, 0);
        }
    }


    function afterSwap(
        address sender,
        PoolKey calldata key,
        IPoolManager.SwapParams calldata params,
        BalanceDelta,
        bytes calldata
    ) external override returns (bytes4, int128) {
        
        // issue tickets for trader
        // in later version, number of tickets will be issued based on trading volume.
        uint256 TICKET_ISSUABLE = 5;
        
        Ticket storage tix;
        tix.raffleBatch = raffleBatchByPool[key.toId()].currentBatch;
        tix.lowerNumber = raffleBatchByPool[key.toId()].currentBatchTicketNumber+1;
        tix.upperNumber = raffleBatchByPool[key.toId()].currentBatchTicketNumber + TICKET_ISSUABLE;
        ticketList[key.toId()][tix.raffleBatch][sender] = tix;

        // update raffer pool
        raffleBatchByPool[key.toId()].currentBatchTicketNumber + TICKET_ISSUABLE;

    }


    // when user claim the prize
    function claimPrizeByWinner(
        address sender,
        PoolKey calldata poolKey
    ) external {
        // check if sender is a winner
        for(uint batch = 0; batch < raffleBatchByPool[poolKey.toId()].currentBatch ; batch++){
            Ticket storage tix = ticketList[poolKey.toId()][batch][sender];

            // if msg.sender has got some ticket in this batch
            if(tix.raffleBatch >= 0){
                Prize storage prize = winnersTicketList[poolKey.toId()][batch];  
                if(!prize.claimed){
                    if(tix.lowerNumber <= prize.winningTicket.lowerNumber || prize.winningTicket.upperNumber <= tix.upperNumber)
                    {
                        // it's a win!

                        // unlock the vault and send out prize
                        poolManager.unlock(
                            abi.encode(
                                CallbackData(
                                    prize.prizeAmount,
                                    poolKey.currency0,
                                    msg.sender
                                )
                            )
                        );

                        // update prize record
                        prize.claimed = true;
                        winnersTicketList[poolKey.toId()][batch] = prize;
                    }
                }
            }
        }


    }

    function _unlockCallback(
        bytes calldata data
    ) internal override returns (bytes memory){
        CallbackData memory callbackData = abi.decode(data, CallbackData);

        // burn the claim token and settle transfer to winner (80% only)
        callbackData.currency0.settle(
            poolManager,
            callbackData.sender,
            callbackData.amount * 4 / 5,
            false
        );

        // transfer token to winner, hook keeps 20%
        callbackData.currency0.settle(
            poolManager,
            address(this),
            callbackData.amount * 1 / 5,
            false
        );
        

    }


    // draw the winner of the current batch
    // expect to be ran in conjob and will be using Chainlink randomizer
    function drawWinnerForPool(
        address sender,
        PoolKey calldata poolKey
    ) external {
        // check if Batchsize > currentBatchTicketNumber, if so, draw the winner
        Batch storage batch = raffleBatchByPool[poolKey.toId()];
        if(batch.currentBatchTicketNumber >= batchSize){

            // draw the winner
            uint winnerNumber = getRandomNumber(0, batch.currentBatchTicketNumber);

            Ticket storage winnerTicket;
            winnerTicket.raffleBatch = batch.currentBatch;
            winnerTicket.lowerNumber = winnerTicket.upperNumber = winnerNumber;

            Prize storage prize;
            prize.prizeAmount = RafflePot[poolKey.toId()];         // get the unallocated of the current batch
            prize.claimed = false;
            prize.winningTicket = winnerTicket;
            winnersTicketList[poolKey.toId()][batch.currentBatch] = prize;


            // update the unallocated claim token in pot
            RafflePot[poolKey.toId()] -= prize.prizeAmount;

            // reset the raffle
            batch.currentBatch++;
            batch.currentBatchTicketNumber = 0;
            raffleBatchByPool[poolKey.toId()] = batch;
            
        }
    }

    // dummy function for randomizer on ChainLink later
    function getRandomNumber(uint start, uint end) internal returns (uint) { 
        return 100;
    }
}