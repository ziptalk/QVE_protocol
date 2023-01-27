const { expect } = require("chai");
import { useState } from "react";
import Web3 from "web3";

import StakeArtifact from "./artifact/Stake.json";
import UsdtArtifact from "./artifact/Usdt.json";


function Qve() {
    const[account, setAccount] = useState(null);
    const[stakeContract, setStakeContract] = useState(null);
    const accounts = window.ethereum.request({ method: 'eth_requestAccounts' });
    setAccount(accounts[0]);

const Stakecontract = new web3.eth.Contract(StakeArtifact.abi, "0xb27A31f1b0AF2946B7F582768f03239b1eC07c2c");
const contractAddress = "0xb27A31f1b0AF2946B7F582768f03239b1eC07c2c";
setStakeContract(Stakecontract);

async function deposit() {
    // Approve the transfer of the specified amount of USDT from the current account to the contract
    await stakeContract.methods.approve(contractAddress, amount).send({ from: account });
    
    // Deposit the approved amount of USDT to the contract
    await stakeContract.methods.deposit(usdtAddress, amount).send({ from: account });
}
}

export default Qve;