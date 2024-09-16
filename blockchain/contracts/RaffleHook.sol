// SPDX-License-Identifier: MIT
pragma solidity 0.8.26;

import {BaseHook} from "../lib/v4-periphery/src/base/hooks/BaseHook.sol";

import {ERC20} from "@uniswap/v4-core/lib/solmate/src/tokens/ERC20.sol";

import {IPoolManager} from "@uniswap/v4-core/src/interfaces/IPoolManager.sol";

import {CurrencyLibrary, Currency} from "@uniswap/v4-core/src/types/Currency.sol";
import {BalanceDeltaLibrary, BalanceDelta} from "@uniswap/v4-core/src/types/BalanceDelta.sol";
import {PoolId, PoolKey, PoolIdLibrary} from "@uniswap/v4-core/src/types/PoolId.sol";

import {Hooks} from "@uniswap/v4-core/src/libraries/Hooks.sol";


/**
* RaffleHook: Takes a percentage of the user's swap token0 for a raffle prize.
* The user receives the same number of raffle tickets as the amount of token0 swapped.
* The more the user swaps, the more tickets they receive.
* 
* The prize grows with each swap until it reaches the required number of swaps to close the raffle (`swapsPerRaffle`).
* With the final swap, a random winner is chosen, and a new raffle begins.
* 
* The winner of each raffle can `withdrawPrize()` at any time.
* 
* TODO: Deduct XX% of the prize for the hook owner.
*/
contract RaffleHook is BaseHook {
    using BalanceDeltaLibrary for BalanceDelta;
    using PoolIdLibrary for PoolKey;

    struct RaffleData {
        address owner;
        uint256 end;
    }

    struct WinnerData {
        address winner;
        uint256 prizeAmount;
        bool withdrawn;
    }

    event RaffleClosed(PoolId poolId, uint256 raffleId, uint256 amount, address winner, uint256 ticketNunmber);

    error SenderNotWinner();
    error PrizeAlreadyWithdrawn();

    // Percentage of token0 for raffle tiket (100=1%)
    uint128 public constant RAFFLE_TIKETS_PRICE = 100;

    // Amounts of swaps that will close the raffle.
    uint32 public immutable swapsPerRaflle;

    // Hook owner
    address public owner;

    // Current raffle id for the poolId
    mapping(PoolId => uint256) raffleIds;

    // poolId => raffleId => start => raffle numbers
    mapping(PoolId => mapping(uint256 => mapping(uint256 => RaffleData))) public raffleNumbers;

    // poolId => raffleId => raffleStarts
    mapping(PoolId => mapping(uint256 => uint256[])) raffleStarts;

    // Swap counter for current raffleId incremented when a swap happens.
    mapping(PoolId => uint256) public swapCounter;


    // winners poolId => raffleId => winner data
    mapping(PoolId => mapping(uint256 => WinnerData)) public winners;

    constructor(IPoolManager _manager, uint32 _swapsPerRaflle) BaseHook(_manager) {
        swapsPerRaflle = _swapsPerRaflle;
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

    function withdrawPrize(PoolKey calldata key, uint256 _raffleId) external {
        PoolId poolId = key.toId();
        if (winners[poolId][_raffleId].winner != msg.sender) revert SenderNotWinner();
        if (winners[poolId][_raffleId].withdrawn) revert PrizeAlreadyWithdrawn();

        winners[poolId][_raffleId].withdrawn = true;

        ERC20(Currency.unwrap(key.currency0)).transfer(msg.sender, winners[poolId][_raffleId].prizeAmount);
    }

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

        PoolId poolId = key.toId();

        _assignNumbers(poolId, sender, amount0);

        uint256 addToPrizeAmt = uint256(amount0 * RAFFLE_TIKETS_PRICE) / 10000;

        // TODO: take hook fee

        // Take addToPrizeAmt of token0 from user
        ERC20(Currency.unwrap(key.currency0)).transferFrom(sender, address(this), addToPrizeAmt);

        // Add token amount to the prize
        uint256 _raffleId = raffleIds[poolId];
        winners[poolId][_raffleId].prizeAmount += addToPrizeAmt;

        swapCounter[poolId]++;

        if (swapCounter[poolId] >= swapsPerRaflle) {
            _closeRaffle(poolId);
        }

        return (this.afterSwap.selector, 0);
    }

    function _closeRaffle(PoolId poolId) private {
        uint256 _raffleId = raffleIds[poolId];
        uint256 _lastId = raffleStarts[poolId][_raffleId].length - 1;
        uint256 _lastStar = raffleStarts[poolId][_raffleId][_lastId];
        // Get the last number of current raffle
        uint256 lastEnd = raffleNumbers[poolId][_raffleId][_lastStar].end;

        // NOTE: Temporary random solution. Should call an oracle to get a real random number
        uint256 winnerTicket = _randomish(lastEnd);

        // find the winner
        address winner = getTicketOwner(poolId, winnerTicket);
        winners[poolId][_raffleId].winner = winner;

        emit RaffleClosed(poolId, _raffleId, winners[poolId][_raffleId].prizeAmount, winner, winnerTicket);

        // Start a new raffle
        raffleIds[poolId]++;
    }

    function _assignNumbers(PoolId poolId, address ticketOwner, uint128 amount) private {
        uint256 _raffleId = raffleIds[poolId];
        uint256 _lastId = raffleStarts[poolId][_raffleId].length - 1;
        uint256 lastStart = raffleStarts[poolId][_raffleId][_lastId];

        uint256 lastEnd = raffleNumbers[poolId][_raffleId][lastStart].end;
        uint256 start = lastEnd + 1;
        uint256 end = start + uint256(amount); // for amount we could use gwei so we do not store than many zeros?

        raffleNumbers[poolId][_raffleId][start] = RaffleData(ticketOwner, end);
        raffleStarts[poolId][_raffleId].push(start);
    }

    function _randomish(uint256 max) private view returns (uint256) {
        // Get a random number between 0 and max
        return (uint256(keccak256(abi.encodePacked(block.timestamp, msg.sender))) % max) + 1;
    }

    function getTicketOwner(PoolId poolId, uint256 ticketNumber) public view returns (address) {
        uint256 _raffleId = raffleIds[poolId];
        uint256 low = 0;
        uint256 high = raffleStarts[poolId][_raffleId].length - 1;
        // binary search
        while (low <= high) {
            uint256 mid = (low + high) / 2;
            uint256 start = raffleStarts[poolId][_raffleId][mid];
            if (ticketNumber >= start && ticketNumber <= raffleNumbers[poolId][_raffleId][start].end) {
                return raffleNumbers[poolId][_raffleId][start].owner;
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
