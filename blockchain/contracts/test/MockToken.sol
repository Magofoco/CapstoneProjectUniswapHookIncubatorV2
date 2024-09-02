// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import {ERC20} from "@uniswap/v4-core/lib/solmate/src/tokens/ERC20.sol";

contract MockToken is ERC20 {
    constructor() ERC20("MockTokenA", "MTKA", 18) {}
}
