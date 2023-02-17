import Web3 from "web3";
import ContractAddress from "./contractAddress";
import ArbQVEArtifact from "../../artifact/ArbQVE.json";
import QVEArtifact from "../../artifact/Qve.json";
import UsdtArtifact from "../../artifact/Usdt.json";
import DepositArtifact from "../../artifact/Deposit.json";
import LiquidityArtifact from "../../artifact/LiquidityPool.json";
import StakeArtifact from "../../artifact/Stake.json";
const Address = ContractAddress();
    const web3 = new Web3(window.ethereum);
    const ArbQVEContract = new web3.eth.Contract(ArbQVEArtifact.output.abi, Address.ArbQVEAddress);
    const QVEContract = new web3.eth.Contract(QVEArtifact.output.abi, Address.QVEAddress);
    const UsdtContract = new web3.eth.Contract(UsdtArtifact.output.abi, Address.UsdtAddress);
    const DepositContract = new web3.eth.Contract(DepositArtifact.output.abi, Address.DepositAddress);
    const LiquidityContract = new web3.eth.Contract(LiquidityArtifact.output.abi, Address.LiquidityAddress);
    const StakeContract = new web3.eth.Contract(StakeArtifact.output.abi, Address.StakeAddress);

    export default function Contract() {
    return {
        ArbQVEContract,
        QVEContract,
        UsdtContract,
        DepositContract,
        LiquidityContract,
        StakeContract
    };
}
