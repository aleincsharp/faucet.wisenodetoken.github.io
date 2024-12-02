import React from "react";
import FundFaucet from "./components/FundFaucet";
import ClaimFaucet from "./components/ClaimFaucet";
import './App.css';

const App = () => {
    const FAUCET_ADDRESS = "0x57d7E9B401d3573CD45d5777E97a277A07AD9Ad9";
    const TOKEN_ADDRESS = "0x4E8E5cE777C3DbB296E18d7d6a174c934323e872";

    return (
        <div className="container">
            <h1>WISE Node Token Faucet - WMC Testnet</h1>
            <ClaimFaucet faucetAddress={FAUCET_ADDRESS} />
            <FundFaucet faucetAddress={FAUCET_ADDRESS} tokenAddress={TOKEN_ADDRESS} />
        </div>
    );
};

export default App;