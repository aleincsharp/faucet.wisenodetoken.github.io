import React, { useState } from "react";
import { ethers, BrowserProvider } from "ethers";

const FAUCET_ABI = ["function claimTokens() external"];

const ClaimFaucet = ({ faucetAddress }) => {
    const [loading, setLoading] = useState(false);

    const claimTokens = async () => {
        if (!window.ethereum) {
            alert("Please install MetaMask!");
            return;
        }

        const provider = new BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();

        try {
            setLoading(true);

            const faucetContract = new ethers.Contract(faucetAddress, FAUCET_ABI, signer);
            const tx = await faucetContract.claimTokens();
            await tx.wait();

            alert("Tokens claimed successfully!");
        } catch (error) {
            console.error("Error claiming tokens:", error);
            alert("Error claiming tokens.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h3>Claim 1000 WNT every 60 seconds, have fun:</h3>
            <button onClick={claimTokens} disabled={loading}>
                {loading ? "Claiming..." : "Claim WNT"}
            </button>
        </div>
    );
};

export default ClaimFaucet;