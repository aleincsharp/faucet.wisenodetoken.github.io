
import React, { useState, useEffect } from "react";
import { ethers, BrowserProvider } from "ethers";

const ERC20_ABI = [
    "function approve(address spender, uint256 amount) external returns (bool)"
];

const FAUCET_ABI = [
    "function fundFaucet(uint256 amount) external",
    "function owner() external view returns (address)"
];

const FundFaucet = ({ faucetAddress, tokenAddress }) => {
    const [isOwner, setIsOwner] = useState(false);
    const [amount, setAmount] = useState("");

    useEffect(() => {
        const checkIfOwner = async () => {
            if (!window.ethereum) return;

            const provider = new BrowserProvider(window.ethereum);

            try {
                const signer = await provider.getSigner();
                const userAddress = await signer.getAddress();

                const faucetContract = new ethers.Contract(faucetAddress, FAUCET_ABI, provider);
                const ownerAddress = await faucetContract.owner();
                setIsOwner(userAddress.toLowerCase() === ownerAddress.toLowerCase());
            } catch (error) {
                console.error("Error checking ownership:", error);
            }
        };

        checkIfOwner();
    }, [faucetAddress]);

    const approveAndFund = async () => {
        if (!window.ethereum) {
            alert("Please install MetaMask!");
            return;
        }

        const provider = new BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();

        try {
            // Step 1: Approve the faucet contract to spend tokens
            const tokenContract = new ethers.Contract(tokenAddress, ERC20_ABI, signer);
            const approveTx = await tokenContract.approve(
                faucetAddress,
                ethers.parseUnits(amount.toString(), 18) // Parse amount into token decimals
            );
            await approveTx.wait();

            // Step 2: Fund the faucet
            const faucetContract = new ethers.Contract(faucetAddress, FAUCET_ABI, signer);
            const fundTx = await faucetContract.fundFaucet(ethers.parseUnits(amount.toString(), 18));
            await fundTx.wait();

            alert(`Successfully funded the faucet with ${amount} tokens!`);
        } catch (error) {
            console.error("Error funding the faucet:", error);
            alert("Error funding the faucet.");
        }
    };

    return (
        <div>
            {isOwner ? (
                <>
                    <h3>Fund the Faucet</h3>
                    <input
                        type="number"
                        placeholder="Amount to Fund"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                    />
                    <button onClick={approveAndFund}>Fund Faucet</button>
                </>
            ) : (
                <p>You must be the contract owner to fund the faucet.</p>
            )}
        </div>
    );
};

export default FundFaucet;