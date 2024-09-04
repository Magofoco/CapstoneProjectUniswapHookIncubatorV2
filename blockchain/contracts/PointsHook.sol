// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

// PointsHook was taken from
// https://uniswap.atrium.academy/lessons/building-your-first-hook/
// Used only to test hardhat compilation with foundry libraries.

import {BaseHook} from "../lib/v4-periphery/src/base/hooks/BaseHook.sol";

import {ERC20} from "@uniswap/v4-core/lib/solmate/src/tokens/ERC20.sol";

import {IPoolManager} from "@uniswap/v4-core/src/interfaces/IPoolManager.sol";

import {CurrencyLibrary, Currency} from "@uniswap/v4-core/src/types/Currency.sol";
import {BalanceDeltaLibrary, BalanceDelta} from "@uniswap/v4-core/src/types/BalanceDelta.sol";
import {PoolKey} from "@uniswap/v4-core/src/types/PoolKey.sol";

import {Hooks} from "@uniswap/v4-core/src/libraries/Hooks.sol";

contract PointsHook is BaseHook, ERC20 {
    // Use CurrencyLibrary and BalanceDeltaLibrary
    // to add some helper functions over the Currency and BalanceDelta
    // data types
    using CurrencyLibrary for Currency;
    using BalanceDeltaLibrary for BalanceDelta;

    // Keeping track of user => referrer
    mapping(address => address) public referredBy;

    // Amount of points someone gets for referring someone else
    uint256 public constant POINTS_FOR_REFERRAL = 500 * 10 ** 18;

    // Initialize BaseHook and ERC20
    constructor(
        IPoolManager _manager,
        string memory _name,
        string memory _symbol
    ) BaseHook(_manager) ERC20(_name, _symbol, 18) {}

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
                afterAddLiquidity: true,
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

    // Stub implementation of `afterSwap`
    function afterSwap(
        address,
        PoolKey calldata key,
        IPoolManager.SwapParams calldata swapParams,
        BalanceDelta delta,
        bytes calldata hookData
    ) external override onlyByPoolManager returns (bytes4, int128) {
        // If this is not an ETH-TOKEN pool with this hook attached, ignore
        if (!key.currency0.isNative()) return (this.afterSwap.selector, 0);

        // We only mint points if user is buying TOKEN with ETH
        if (!swapParams.zeroForOne) return (this.afterSwap.selector, 0);

        // Mint points equal to 20% of the amount of ETH they spent
        // Since its a zeroForOne swap:
        // if amountSpecified < 0:
        //      this is an "exact input for output" swap
        //      amount of ETH they spent is equal to |amountSpecified|
        // if amountSpecified > 0:
        //      this is an "exact output for input" swap
        //      amount of ETH they spent is equal to BalanceDelta.amount0()

        uint256 ethSpendAmount = swapParams.amountSpecified < 0
            ? uint256(-swapParams.amountSpecified)
            : uint256(int256(-delta.amount0()));
        uint256 pointsForSwap = ethSpendAmount / 5;

        // Mint the points including any referral points
        _assignPoints(hookData, pointsForSwap);

        return (this.afterSwap.selector, 0);
    }

    // Stub implementation for `afterAddLiquidity`
    function afterAddLiquidity(
        address,
        PoolKey calldata key,
        IPoolManager.ModifyLiquidityParams calldata,
        BalanceDelta delta,
        bytes calldata hookData
    ) external override onlyByPoolManager returns (bytes4, BalanceDelta) {
        // If this is not an ETH-TOKEN pool with this hook attached, ignore
        if (!key.currency0.isNative()) return (this.afterSwap.selector, delta);

        // Mint points equivalent to how much ETH they're adding in liquidity
        uint256 pointsForAddingLiquidity = uint256(int256(-delta.amount0()));

        // Mint the points including any referral points
        _assignPoints(hookData, pointsForAddingLiquidity);

        return (this.afterAddLiquidity.selector, delta);
    }

    function getHookData(
        address referrer,
        address referree
    ) public pure returns (bytes memory) {
        return abi.encode(referrer, referree);
    }

    function _assignPoints(
        bytes calldata hookData,
        uint256 referreePoints
    ) internal {
        // If no referrer/referree specified, no points will be assigned to anyone
        if (hookData.length == 0) return;

        // Decode the referrer and referree addresses
        (address referrer, address referree) = abi.decode(
            hookData,
            (address, address)
        );

        // If referree is the zero address, ignore
        if (referree == address(0)) return;

        // If this referree is being referred by someone for the first time,
        // set the given referrer address as their referrer
        // and mint POINTS_FOR_REFERRAL to that referrer address
        if (referredBy[referree] == address(0) && referrer != address(0)) {
            referredBy[referree] = referrer;
            _mint(referrer, POINTS_FOR_REFERRAL);
        }

        // Mint 10% worth of the referree's points to the referrer
        if (referredBy[referree] != address(0)) {
            _mint(referrer, referreePoints / 10);
        }

        // Mint the appropriate number of points to the referree
        _mint(referree, referreePoints);
    }
}
