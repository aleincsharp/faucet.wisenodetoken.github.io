// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract WiseNodeTokenFaucet is Ownable, ReentrancyGuard {
    IERC20 public token;
    uint256 public maxClaimAmount;
    uint256 public cooldownTime;
    mapping(address => uint256) public lastClaimTime;
    bool public isPaused;

    event TokensClaimed(address indexed claimant, uint256 amount);
    event FaucetFunded(address indexed funder, uint256 amount);
    event TokensWithdrawn(address indexed owner, uint256 amount);

    constructor(
        address _tokenAddress,
        uint256 _maxClaimAmount,
        uint256 _cooldownTime,
        address initialOwner // Add this parameter
    ) Ownable(initialOwner) { // Pass initialOwner to the Ownable constructor
        token = IERC20(_tokenAddress);
        maxClaimAmount = _maxClaimAmount;
        cooldownTime = _cooldownTime;
    }

    function claimTokens() external nonReentrant {
        require(!isPaused, "Faucet is paused");
        require(block.timestamp - lastClaimTime[msg.sender] >= cooldownTime, "Cooldown period not over");
        require(token.balanceOf(address(this)) >= maxClaimAmount, "Faucet empty");

        lastClaimTime[msg.sender] = block.timestamp;
        token.transfer(msg.sender, maxClaimAmount);

        emit TokensClaimed(msg.sender, maxClaimAmount);
    }

    function fundFaucet(uint256 _amount) external onlyOwner {
        token.transferFrom(msg.sender, address(this), _amount);
        emit FaucetFunded(msg.sender, _amount);
    }

    function withdrawTokens(uint256 _amount) external onlyOwner {
        token.transfer(msg.sender, _amount);
        emit TokensWithdrawn(msg.sender, _amount);
    }

    function setCooldownTime(uint256 _cooldownTime) external onlyOwner {
        cooldownTime = _cooldownTime;
    }

    function setMaxClaimAmount(uint256 _maxClaimAmount) external onlyOwner {
        maxClaimAmount = _maxClaimAmount;
    }

    function pauseFaucet() external onlyOwner {
        isPaused = true;
    }

    function unpauseFaucet() external onlyOwner {
        isPaused = false;
    }
}
