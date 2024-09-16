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
        uint256 end; // this would be 15 for UserA and 35 for UserB
    }

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
        uint256 withdrawn;
    }

    // winners raffleId => winner data
    mapping(uint256 => WinnerData) public winners;

    constructor(IPoolManager _manager, uint32 _raffleSize) BaseHook(_manager) {
        raffleSize = _raffleSize;
        owner = msg.sender;
    }

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

    //
    function afterSwap(
        address sender,
        PoolKey calldata key,
        IPoolManager.SwapParams calldata swapParams,
        BalanceDelta delta,
        bytes calldata hookData
    ) external override onlyPoolManager returns (bytes4, int128) {
        // Only if token0 is ERC20
        if (key.currency0.isNative()) return (this.afterSwap.selector, 0);

        uint128 amount0 = uint128(
            delta.amount0() < 0 ? -delta.amount0() : delta.amount0()
        );

        // Swap amount of token0 is too small
        if (amount0 < 100) return (this.afterSwap.selector, 0);

        _assignNumbers(sender, amount0);

        uint256 addToPrizeAmt = uint256(amount0 * RAFFLE_TIKETS_PRICE) / 10000;

        // TODO: take addToPrizeAmt of token0 from 
        // TODO: take hook fee

        // Add to the prize
        winners[raffleId].prizeAmount += addToPrizeAmt;
        swapCounter++;

        if (swapCounter >= raffleSize) {
            _closeRaffle();
        }

        return (this.afterSwap.selector, 0);
    }

    function _closeRaffle() private {
        // get the last number of current raffle
        uint256 lastEnd = raffleNumbers[raffleId][
            raffleStarts[raffleId][raffleStarts[raffleId].length - 1]
        ].end;

        // NOTE: random temporary solution. Should call an oracle to get a real random number
        uint256 rnd = _randomish(lastEnd);

        // find the winner
        winners[raffleId].winner = getTicketOwner(rnd);

        raffleId++;
    }

    function _assignNumbers(address ticketOwner, uint128 amount) private {
        uint256 lastStart = raffleStarts[raffleId][
            raffleStarts[raffleId].length - 1
        ];
        uint256 lastEnd = raffleNumbers[raffleId][lastStart].end;
        uint256 start = lastEnd + 1;
        uint256 end = start + uint256(amount); // for amount we could use gwei so we do not store than many zeros?

        raffleNumbers[raffleId][start] = RaffleData(ticketOwner, end);
        raffleStarts[raffleId].push(start);
    }

    function _randomish(uint256 max) private view returns (uint256) {
        return
            (uint256(keccak256(abi.encodePacked(block.timestamp, msg.sender))) %
                max) + 1;
    }

    function getTicketOwner(
        uint256 ticketNumber
    ) public view returns (address) {
        uint256 low = 0;
        uint256 high = raffleStarts[raffleId].length - 1;
        // binary search
        while (low <= high) {
            uint256 mid = (low + high) / 2;
            uint256 start = raffleStarts[raffleId][mid];
            if (
                ticketNumber >= start &&
                ticketNumber <= raffleNumbers[raffleId][start].end
            ) {
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
