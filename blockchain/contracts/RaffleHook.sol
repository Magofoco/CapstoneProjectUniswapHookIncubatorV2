// SPDX-License-Identifier: MIT
pragma solidity 0.8.26;

import {BaseHook} from "../lib/v4-periphery/src/base/hooks/BaseHook.sol";

import {ERC20} from "@uniswap/v4-core/lib/solmate/src/tokens/ERC20.sol";

import {IPoolManager} from "@uniswap/v4-core/src/interfaces/IPoolManager.sol";

import {CurrencyLibrary, Currency} from "@uniswap/v4-core/src/types/Currency.sol";
import {BalanceDeltaLibrary, BalanceDelta} from "@uniswap/v4-core/src/types/BalanceDelta.sol";
import {PoolKey} from "@uniswap/v4-core/src/types/PoolKey.sol";

import {Hooks} from "@uniswap/v4-core/src/libraries/Hooks.sol";

contract RaffleHook is BaseHook {
    // TODO; look for slot optimization

    using BalanceDeltaLibrary for BalanceDelta;

    struct RaffleData {
        address owner;
        uint256 end;
    }

    event RaffleClosed(uint256 raffleId, uint256 amount, address winner, uint256 ticketNunmber);

    error SenderNotWinner(uint256 raffleId);

    // Percentage of token0 for raffle tiket (100=1%)
    uint128 public constant RAFFLE_TIKETS_PRICE = 100;

    // Amounts of swaps that will close the raffle.
    uint32 public immutable raffleSize;

    // Current raffle id
    uint256 public raffleId;

    // raffleId => start => raffle numbers
    mapping(uint256 => mapping(uint256 => RaffleData)) public raffleNumbers;

    // raffleId => raffleStarts
    mapping(uint256 => uint256[]) raffleStarts;

    // Swap counter for current raffleId incremented when a swap happens.
    uint256 public swapCounter;

    address public owner;

    struct WinnerData {
        address winner;
        uint256 prizeAmount;
        bool withdrawn;
    }

    // winners raffleId => winner data
    mapping(uint256 => WinnerData) public winners;

    constructor(IPoolManager _manager, uint32 _raffleSize) BaseHook(_manager) {
        raffleSize = _raffleSize;
        owner = msg.sender;
    }

    function getHookPermissions() public pure override returns (Hooks.Permissions memory) {
        return Hooks.Permissions({
            beforeInitialize: false,
            afterInitialize: false,
            beforeAddLiquidity: false,
            beforeRemoveLiquidity: false,
            afterAddLiquidity: false,
            afterRemoveLiquidity: false,
            beforeSwap: false,
            afterSwap: true,
            beforeDonate: false,
            afterDonate: false,
            beforeSwapReturnDelta: false,
            afterSwapReturnDelta: false,
            afterAddLiquidityReturnDelta: false,
            afterRemoveLiquidityReturnDelta: false
        });
    }

    function withdrawPrize(uint256 _raffleId) external {
        if (winners[_raffleId].winner != msg.sender) revert SenderNotWinner(_raffleId);

        winners[_raffleId].withdrawn = true;

        // TODO: token0.transfer(msg.sender,winners[_raffleId].prizeAmount)
    }

    /* 
    // Credit: DixonW
    Currency denominatorCurrency; // key of token0 of the Raffle, i.e. ETH initailly

    function beforeSwap (IHooks self, PoolKey memory key,IPoolManager.SwapParams memroy params, bytes calldata hookData)
    {
        
        //... taken from the course
        
        // any return in unspecified is passed to the afterSwap hook for handling
        int128 hookDeltaSpecified = hookReturn.getSpecifiedDelta();

        // Update the swap amount according to the hook's return, and check that the swap type doesnt change (exact input/output)
        if (hookDeltaSpecified != 0) {
            bool exactInput = amountToSwap < 0;
            amountToSwap += hookDeltaSpecified;
            if (exactInput ? amountToSwap > 0 : amountToSwap < 0) {
                HookDeltaExceedsSwapAmount.selector.revertWith();
            }
        }

        // taking a cut from token0.
        uint128 commissionAmount = (token0BalanceBefore * COMMISSION_RATE) / 10000;    // from deniz
        
        // assuming we always take ETH
        if(params.zeroToOne){
            BeforeSwapDelta beforeSwapDelta = toBeforeSwapDelta(-commissionAmount,0);
        }else{
            BeforeSwapDelta beforeSwapDelta = toBeforeSwapDelta(0, -commissionAmount);
        }

        // minting claim token from PM for later winner to claim
        key.currency0.take(
            PoolManaer,
            address(this),
            commissionAmount,
            true  
        );

        return (this.beforeSwap.selector, beforeSwapDelta, 0);
    }


    // when user claim the prize
    function claimPrizeByWinner() external
    {
        // retrive the winner price amount
        // assuming WinnerMap stores (sender -> (amount, 0 or 1, claimed))
        (amountPrize, currencyPrize, claimed) = WinnerMap(msg.sender);
        if(claimed){
            // TODO: return
            return;
        }else{
            // TODO: update claimed = false
        }

        poolManager.unlock(
            abi.encode(
                CallbackData(
                    amountPrize, 
                    currencyPrize,
                    msg.sender
                )
            )
        )
    }


    function _unlockCallback(
        bytes calldata data
    ) internal override returns (bytes memory){
        CallbackData memory callbackData = abi.decode(data, (CallbackData));

        // burn the claim token and settle / transfer
        callbackData.currencyPrize.settle(
            poolManager,
            callbackData.sender,
            callbackData.amountPrize,
            false
        )

        // TODO: transfer token0 back to Winner
        // ....

        // TODO: transfer profit to Safe
        // ...
    }
    */

    function afterSwap(
        address sender,
        PoolKey calldata key,
        IPoolManager.SwapParams calldata swapParams,
        BalanceDelta delta,
        bytes calldata hookData
    ) external override onlyPoolManager returns (bytes4, int128) {
        // Only if token0 is ERC20
        if (key.currency0.isNative()) return (this.afterSwap.selector, 0);

        uint128 amount0 = uint128(delta.amount0() < 0 ? -delta.amount0() : delta.amount0());

        // Swap amount of token0 is too small
        if (amount0 < 100) return (this.afterSwap.selector, 0);

        _assignNumbers(sender, amount0);

        uint256 addToPrizeAmt = uint256(amount0 * RAFFLE_TIKETS_PRICE) / 10000;

        // TODO: take hook fee

        // Take addToPrizeAmt of token0 from user
        ERC20(Currency.unwrap(key.currency0)).transferFrom(sender, address(this), addToPrizeAmt);

        // Add token amount to the prize
        winners[raffleId].prizeAmount += addToPrizeAmt;
        swapCounter++;

        if (swapCounter >= raffleSize) {
            _closeRaffle();
        }

        return (this.afterSwap.selector, 0);
    }

    function _closeRaffle() private {
        // Get the last number of current raffle
        uint256 lastEnd = raffleNumbers[raffleId][raffleStarts[raffleId][raffleStarts[raffleId].length - 1]].end;

        // NOTE: Temporary random solution. Should call an oracle to get a real random number
        uint256 winnerTicket = _randomish(lastEnd);

        // find the winner
        address winner = getTicketOwner(winnerTicket);
        winners[raffleId].winner = winner;

        emit RaffleClosed(raffleId, winners[raffleId].prizeAmount, winner, winnerTicket);

        raffleId++;
    }

    function _assignNumbers(address ticketOwner, uint128 amount) private {
        uint256 lastStart = raffleStarts[raffleId][raffleStarts[raffleId].length - 1];
        uint256 lastEnd = raffleNumbers[raffleId][lastStart].end;
        uint256 start = lastEnd + 1;
        uint256 end = start + uint256(amount); // for amount we could use gwei so we do not store than many zeros?

        raffleNumbers[raffleId][start] = RaffleData(ticketOwner, end);
        raffleStarts[raffleId].push(start);
    }

    function _randomish(uint256 max) private view returns (uint256) {
        // Get a random number between 0 and max
        return (uint256(keccak256(abi.encodePacked(block.timestamp, msg.sender))) % max) + 1;
    }

    function getTicketOwner(uint256 ticketNumber) public view returns (address) {
        uint256 low = 0;
        uint256 high = raffleStarts[raffleId].length - 1;
        // binary search
        while (low <= high) {
            uint256 mid = (low + high) / 2;
            uint256 start = raffleStarts[raffleId][mid];
            if (ticketNumber >= start && ticketNumber <= raffleNumbers[raffleId][start].end) {
                return raffleNumbers[raffleId][start].owner;
            } else if (ticketNumber < start) {
                high = mid - 1;
            } else {
                low = mid + 1;
            }
        }
        // No winner found for this number. This should not happen. Return hook's owner to accommodate prize latter.
        return owner;
    }
}
