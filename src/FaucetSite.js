import React from "react";
import FundFaucet from "./components/FundFaucet";

const FaucetSite = () => {
    const FAUCET_ADDRESS = "YOUR_FAUCET_CONTRACT_ADDRESS";
    const TOKEN_ADDRESS = "YOUR_TOKEN_CONTRACT_ADDRESS";

    return (
        <div>
            <h1>Token Faucet</h1>
            <FundFaucet faucetAddress={FAUCET_ADDRESS} tokenAddress={TOKEN_ADDRESS} />
        </div>
    );
};

export default FaucetSite;
