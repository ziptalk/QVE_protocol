
import { useState } from "react";
import styled from "styled-components";
import DepositImg from "../../../assets/Deposit.png";
import StakingImg from "../../../assets/Staking.png";
import LiquidityImg from "../../../assets/Liquidity.png";
import TotalLineImg from "../../../assets/TotalLine.png";
import XImg from "../../../assets/X_Icon.png";
import Favicon from "../../../assets/Favicon.png";
import { useNavigate } from "react-router-dom";
import AptosLogo from "../../../assets/AptosLogo.png";
import { Types, AptosClient, CoinClient } from 'aptos';
import arbQVEArtifact from "../../../artifact/ArbQVE.json";
import qveArtifact from "../../../artifact/Qve.json";
import UsdtIcon from "../../../assets/UsdtIcon.png";
import Web3 from "web3";
const Asset = styled.div`

/* Heading 2 */
width: 90%;
max-width: 414px;
font-family: 'Inter';
font-style: normal;
font-weight: 700;
font-size: 24px;
line-height: 36px;
align-self: flex-start;
/* identical to box height, or 150% */

letter-spacing: 0.02em;

align-self: center;
/* dark/label */

color: #B7B8CD;
`;
const EContainer = styled.div`

`;

const PreWalletConnectBackground = styled.div`
    width: 100%;
    height: 100%;
    backdrop-filter: blur(5px);
    position: fixed;
    left: 0; top: 0;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const TextContainer = styled.div`
font-family: 'Inter';
font-style: normal;
color: #B7B8CD;
`;

const DepositContainer = styled.div`
display: flex;
flex-direction: column;
width: 90vw;
max-width: 414px;
background: #2B2B34;
border-radius: 16px;
`;

const StakingRewardsContainer = styled.div`
display: flex;
flex-direction: column;
width: 90vw;
max-width: 414px;
background: #2B2B34;
border-radius: 16px;
`;

const LiquidityRewardsContainer = styled.div`
display: flex;
flex-direction: column;
width: 90vw;
max-width: 414px;
background: #2B2B34;
border-radius: 16px;
`;

const Text = styled.div`
font-family: 'Inter';
font-style: normal;
letter-spacing: 0.02em;
color: #FFFFFF;
`;

const Button = styled.button`
all: unset;
cursor: pointer;
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
gap: 10px;
background: #5C5E81;
border-radius: 16px;
font-family: 'Inter';
font-style: normal;
font-weight: 700;
font-size: 12px;
line-height: 15px;
letter-spacing: 0.02em;
color: #FFFFFF;


`;

const Image = styled.img`

`;

const Input = styled.input`
all: unset;
`;

const InputContainer = styled.div`
all: unset;
position: relative;
height: 57px;
width: 90%;
background: #2B2B34;
border: 1px solid #5C5E81;
border-radius: 16px;
font-family: 'Inter';
font-style: normal;
font-weight: 600;
font-size: 14px;
line-height: 17px;
color: #FFFFFF;
display: flex;
flex-direction: row;
align-items: center;
justify-content: space-between;
`;
// console.log("lc in connected",localStorage.getItem('user'))
// const aptosWeb3 = require('@martiandao/aptos-web3.js');

// const client = new CoinClient('https://fullnode.devnet.aptoslabs.com/v1');
// console.log('client is', client);

function AssetConnected({preWalletCount, setPreWalletCount, setAccount, setStakeContract, account, stakeContract, usdtContract, setUsdtContract, liquidityContract, setLiquidityContract, aptosBalance}) {
    // console.log('Balance:', aptosWeb3.getBalance(account));
    const web3 = new Web3(window.ethereum);
    const stakeContractAddress = "0xF1EbEC1689b771464DB6258E48E200A2367C49eB";
    const arbQVEContractAddress = "0x5258C637dF12c5ED1F244b955D57737DE22e1fAf";
    const qveContractAddress = "0x7c10E21A952C1979f12aE63bCA789DA3F9B2fE20";
    const arbQVEContract = new web3.eth.Contract(arbQVEArtifact.output.abi, arbQVEContractAddress);
    const qveContract = new web3.eth.Contract(qveArtifact.output.abi, qveContractAddress);
    const [depositAmount, setDepositAmount] = useState(0);
    const [data, setData] = useState('');
    const navigate = useNavigate();
    account = JSON.parse(localStorage.getItem('user'));
    
    // // client.getAccountResources(account).then(setData);
    // console.log("CHECK BALANCE", client.checkBalance(account));
    // console.log("data is", data);
    function DepositMetamask() {
        // Approve the transfer of the specified amount of USDT from the current account to the contract
        usdtContract.methods.approve(stakeContractAddress, depositAmount).send({ from: account });
        
        // Deposit the approved amount of USDT to the contract
        stakeContract.methods.deposit(depositAmount).send({ from: account });

        // qveContract.methods.mintToken(account,account,depositAmount).send({ from : account });
        // console.log("Deposit success!");
    }
    // console.log('account is', account);

    const DepositAptos = async(amount) => {
        // console.log("Deposit Aptos");
        const transaction = {
            type: "entry_function_aptos_transfer",
            function: '0xf2bc453c0aeb6e26e27bf2f04b5e25ee3c02dd04fa56f2fc4b5e98fac6c86a24::qve_mint::exchange_to_entry',
            arguments: [amount * 10**8],
            type_arguments: [],
        };
        window.aptos.signAndSubmitTransaction(transaction).then(() => {
            // console.log("전송 성공");
        })
        //TODO 추후에 staking하는 코드 넣기
    }

    function Deposit() {
        DepositMetamask();
        setPreWalletCount(null);
    }
    // console.log("APTOS BALANCE IS", aptosBalance);
    return (
        <EContainer>
            <Asset>My Asset</Asset>
            <DepositContainer>
                <EContainer style={{height: '25px'}}></EContainer>
                <EContainer style={{display: 'flex', flexDirection: 'row', padding: '0px 25px 0px 25px', justifyContent: "space-between"}}>
                    <EContainer style={{display: 'flex', flexDirection: 'column'}}>
                        <EContainer style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                            <Image src={DepositImg} style={{width: '15px', height: '15px'}}></Image>
                            <EContainer style={{width: '3px'}}/>
                            <Text style={{fontWeight: '700', fontSize: '12px', lineHeight: '15px', color: '#B7B8CD'}}>Deposit</Text>
                        </EContainer>
                        <EContainer style={{height: '3px'}}/>
                        <Text style={{fontWeight: '700', fontSize: '18px', lineHeight: '24px', color: '#FFFFFF'}}>100 SOL</Text>
                    </EContainer>
                    <Button style={{width: '83px', height: '27px'}} onClick={() => setPreWalletCount(3)}>Deposit</Button>
                </EContainer>
                <EContainer style={{height: '45px'}}></EContainer>
                <EContainer style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', padding: '0px 25px 0px 25px'}}>
                    <Text style={{fontWeight: '700', fontSize: '14px', lineHeight: '17px', color: '#B7B8CD'}}>10 arbQVE</Text>
                    <EContainer style={{display: 'flex', flexDirection: 'column'}}>
                        <Text style={{fontWeight: '700', fontSize: '14px', lineHeight: '17px', color: '#0FB63E'}}>+ $ 100 (↑10%)</Text>
                        <Text style={{fontWeight: '500', fontSize: '12px', lineHeight: '15px', color: '#FFFFFF', display: 'flex', justifyContent:'flex-end'}}>= $ 1,100</Text>
                    </EContainer>
                </EContainer>
                <EContainer style={{height: '25px'}}></EContainer>
                <EContainer style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', padding: '0px 25px 0px 25px'}}>
                    <Text style={{fontWeight: '700', fontSize: '14px', lineHeight: '17px', color: '#B7B8CD'}}>10 QVE</Text>
                    <EContainer style={{display: 'flex', flexDirection: 'column'}}>
                        <Text style={{fontWeight: '700', fontSize: '14px', lineHeight: '17px', color: '#0FB63E'}}>+ $ 100 (↑10%)</Text>
                        <Text style={{fontWeight: '500', fontSize: '12px', lineHeight: '15px', color: '#FFFFFF', display: 'flex', justifyContent:'flex-end'}}>= $ 1,100</Text>
                    </EContainer>
                </EContainer>
                <EContainer style={{height: '20px'}}></EContainer>
                <EContainer style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <Image src={TotalLineImg} style={{width: '90%'}}></Image>
                </EContainer>
                <EContainer style={{height: '20px'}}></EContainer>
                <EContainer style={{display: 'flex', flexDirection: 'column', padding: '0px 30px 0px 20px', justifyContent: 'flex-end', alignItems: 'flex-end'}}>
                    <Text style={{fontWeight: '700', fontSize: '14px', lineHeight: '17px', color: '#0FB63E'}}>+ $ 200 (↑10%)</Text>
                    <Text style={{fontWeight: '500', fontSize: '12px', lineHeight: '15px', color: '#FFFFFF'}}>= $ 2,200</Text>
                </EContainer>
                <EContainer style={{height: '25px'}}/>
            </DepositContainer>

            <EContainer style={{height: '20px'}}/>
            <StakingRewardsContainer>
                <EContainer style={{height: '25px'}}></EContainer>
                <EContainer style={{display: 'flex', flexDirection: 'row', padding: '0px 25px 0px 25px', justifyContent: 'space-between'}}>
                <EContainer style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                    <Image src={StakingImg} style={{width: '15px', height: '15px'}}></Image>
                    <EContainer style={{width: '3px'}}/>
                    <Text style={{fontWeight: '700', fontSize: '12px', lineHeight: '15px', color: '#B7B8CD', padding: '5px 0px 5px 0px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>Staking Rewards</Text>
                    </EContainer>
                    <Button style={{width: '83px', height: '27px'}} onClick={() => navigate('/stakePage')}>Stake</Button>
                </EContainer>
                <EContainer style={{height: '20px'}}/>
                <EContainer style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', padding: '0px 25px 0px 25px'}}>
                    <Text style={{fontWeight: '700', fontSize: '14px', lineHeight: '17px', color: '#B7B8CD'}}>10 QVE</Text>
                    <EContainer style={{display: 'flex', flexDirection: 'column'}}>
                        <Text style={{fontWeight: '700', fontSize: '14px', lineHeight: '17px', color: '#0FB63E'}}>+ $ 100 (↑10%)</Text>
                        <Text style={{fontWeight: '500', fontSize: '12px', lineHeight: '15px', color: '#FFFFFF', display: 'flex', justifyContent:'flex-end'}}>= $ 1,100</Text>
                    </EContainer>
                </EContainer>
                <EContainer style={{height: '25px'}}/>
            </StakingRewardsContainer>
            <EContainer style={{height: '20px'}}/>
            <LiquidityRewardsContainer>
            <EContainer style={{height: '25px'}}></EContainer>
                <EContainer style={{display: 'flex', flexDirection: 'row', padding: '0px 25px 0px 25px', justifyContent: 'space-between'}}>
                    <EContainer style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                    <Image src={LiquidityImg} style={{width: '15px', height: '15px'}}></Image>
                    <EContainer style={{width: '3px'}}/>
                    <Text style={{fontWeight: '700', fontSize: '12px', lineHeight: '15px', color: '#B7B8CD', padding: '5px 0px 5px 0px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>Liquidity Rewards</Text>
                    </EContainer>
                    <Button style={{width: '115px', height: '27px'}} onClick={() => navigate('/poolPage')}>Add Liquidity</Button>
                </EContainer>
                <EContainer style={{height: '20px'}}/>
                <EContainer style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', padding: '0px 25px 0px 25px'}}>
                    <Text style={{fontWeight: '700', fontSize: '14px', lineHeight: '17px', color: '#B7B8CD'}}>arbQVE/QVE</Text>
                    <EContainer style={{display: 'flex', flexDirection: 'column'}}>
                        <Text style={{fontWeight: '700', fontSize: '14px', lineHeight: '17px', color: '#0FB63E'}}>+ $ 100 (↑10%)</Text>
                        <Text style={{fontWeight: '500', fontSize: '12px', lineHeight: '15px', color: '#FFFFFF', display: 'flex', justifyContent:'flex-end'}}>= $ 1,100</Text>
                    </EContainer>
                </EContainer>
                <EContainer style={{height: '25px'}}/>
                <PreWalletConnectBackground style={{visibility : preWalletCount === 3 ? "visible" : "hidden"}}>
        <DepositContainer>
        <EContainer style={{height: '39px'}}></EContainer>
        <EContainer style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'flex-end'}}>
        <Image src={XImg} style={{width: '19px', height: '19px', cursor: 'pointer', paddingRight: '30px'}} onClick={() => {setPreWalletCount(null)}}></Image>
        </EContainer>
        <EContainer style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignContent: 'center'}}>
        <Image src={Favicon} style={{width: '45px', height: '40px'}}></Image>
        </EContainer>
        <EContainer style={{height: '8px'}}></EContainer>
        <EContainer style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{fontWeight: '700', fontSize: '12px', lineHeight: '15px'}}>Deposit.QVE</Text>
        </EContainer>
        <EContainer style={{height: '5px'}}></EContainer>
        <EContainer style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{fontWeight: '500', fontSize: '12px', lineHeight: '15px'}}>Neon EVM Devnet</Text>
        </EContainer>
        <EContainer style={{height: '38px'}}></EContainer>
        <EContainer style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{fontWeight: '700', fontSize: '36px', lineHeight: '48px'}}>{aptosBalance} USDT</Text>
        </EContainer>
        <EContainer style={{height: '18px'}}></EContainer>
        <EContainer style={{display:'flex', justifyContent:'center'}}>
            <InputContainer>
            <EContainer style={{display: 'flex', flexDirection: 'row'}}>
            <EContainer style={{width: '15px'}}/>
            <Image src={UsdtIcon} style={{height: '31px', height: '31px'}}/>
            <EContainer style={{width: '10px'}}/>
            <Input placeholder="Amount" onChange={(e) => setDepositAmount(e.target.value)} />
            </EContainer>
            <EContainer style={{display: 'flex', flexDirection: 'row'}}>
            <Button style={{height: '31px', width: '60px'}}>MAX</Button>
            <EContainer style={{width: '15px'}}/>
            </EContainer>
        </InputContainer>
        </EContainer>
        <EContainer style={{height: '30px'}}></EContainer>
        <EContainer style={{display: 'flex', justifyContent:'center', alignItems:'center'}}>
        <EContainer style={{display: 'flex', flexDirection: 'row', width: '90%', justifyContent: 'space-between'}}>
        <TextContainer style={{fontWeight: '400', fontSize: '11px', lineHeight:'13px'}}>Exchange rate</TextContainer>
        <TextContainer style={{fontWeight: '700', fontSize: '12px', lineHeight:'15px'}}>1 USDT = 1 arbQve</TextContainer>
        </EContainer>
        </EContainer>
        <EContainer style={{height: '10px'}}></EContainer>
        <EContainer style={{display: 'flex', justifyContent:'center', alignItems:'center'}}>
        <EContainer style={{display: 'flex', flexDirection: 'row', width: '90%', justifyContent: 'space-between'}}>
        <TextContainer style={{fontWeight: '400', fontSize: '11px', lineHeight:'13px'}}>Swap fee</TextContainer>
        <TextContainer style={{fontWeight: '700', fontSize: '12px', lineHeight:'15px'}}>0.01 SOL</TextContainer>
        </EContainer>
        </EContainer>
        <EContainer style={{height: '10px'}}></EContainer>
        <EContainer style={{display: 'flex', justifyContent:'center', alignItems:'center'}}>
        <EContainer style={{display: 'flex', flexDirection: 'row', width: '90%', justifyContent: 'space-between'}}>
        <TextContainer style={{fontWeight: '400', fontSize: '11px', lineHeight:'13px'}}>Slippage</TextContainer>
        <TextContainer style={{fontWeight: '700', fontSize: '12px', lineHeight:'15px'}}>0.5 %</TextContainer>
        </EContainer>
        </EContainer>
        <EContainer style={{height: '53px'}}></EContainer>
        <EContainer style={{display: 'flex', justifyContent:'center', alignItems:'center'}}>
        <EContainer style={{display: 'flex', flexDirection: 'row', width: '90%', justifyContent: 'space-between'}}>
        <Button onClick={() => {setPreWalletCount(null)}} style={{width: '152px', height: '55px', background: '#5C5E81'}}>Cancel</Button>
        <Button onClick={() => Deposit()} style={{width: '152px', height: '55px', background: '#4A3CE8'}}>Deposit</Button>
        </EContainer>
        </EContainer>
        <EContainer style={{height: '35px'}}/>
        </DepositContainer>
        </PreWalletConnectBackground>
            </LiquidityRewardsContainer>
        
        </EContainer>
    );

}

export default AssetConnected;

