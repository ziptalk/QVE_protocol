// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract Qve {
    address owner;

    constructor() {
        owner = msg.sender;
    }

    function depositTokens(uint256 amount) external {
        
    }
}