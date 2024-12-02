// SPDX-License-Identifier: MIT
pragma solidity ^0.7.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract WISENodeToken is ERC20 {
    constructor(uint256 initialSupply) ERC20("WISE Node Token", "WNT") {
        _mint(msg.sender, initialSupply * 10 ** decimals());
    }
}
