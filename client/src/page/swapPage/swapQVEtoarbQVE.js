import styled from "styled-components";
import QveImage from "../../assets/img/SwapImage.png"
import Qve from "../../assets/img/Qve.png";
import arbQve from "../../assets/img/arbQve.png"
import LiquidityArtifact from "../../artifact/LiquidityPool.json";
import arbQveArtifact from "../../artifact/ArbQVE.json";
import QveArtifact from "../../artifact/Qve.json";
import Web3 from "web3";
import SwapIcon from "../../assets/img/SwapIcon.png";
import { useState } from "react";
import Contract from "../../assets/contract/contract.js";
import ContractAddress from "../../assets/contract/contractAddress";
const Background = styled.div`
background-color: #1B1A1E;
height: 100vh;
display: flex;
flex-direction: column;

align-items: center;
`;
const EContainer = styled.div`

`;

const SwapContainer = styled.div`
width: 95%;
max-width: 414px;
height: 460px;
background: #2B2B34;
border-radius: 16px;
justify-content: center;
align-items: center;
`;

const Text = styled.div`
color: #B7B8CD;
`;

const TokenOneContainer = styled.div`
height: 134px;
margin-left: 25px;
margin-right: 25px;
background: linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), #202025;
border-radius: 16px;
`;

const TokenTwoContainer = styled.div`
height: 100px;
margin-left: 25px;
margin-right: 25px;
background: linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), #202025;
border-radius: 16px;
`;

const BackgroudImage = styled.img`
width: 100%;
z-index: 1;
`;

const Button = styled.button`
all:unset;
cursor: pointer;    
width: 90%;
height: 55px;
background: #4A3CE8;
border-radius: 16px;
font-weight: 600;
font-size: 14px;
line-height: 17px;
text-align: center;
color: #FFFFFF;
`;

const MaxButton = styled.button`
all: unset;
display: flex;
justify-content: center;
align-items: center;
cursor: pointer;
width: 61.07px;
height: 31px;
background: #5C5E81;
border-radius: 16px;
font-weight: 600;
font-size: 14px;
line-height: 17px;
color: #FFFFFF;
`;

const Image = styled.img`

`;

const Input = styled.input`
height: 24px;
font-weight: 700;
font-size: 18px;
line-height: 24px;
text-align: right;
letter-spacing: 0.02em;
color: #B7B8CD;
background: transparent;
border: none;
`;

function SwapQVEtoarbQVE({setIcon}) {
    const qveContract = Contract();
    const Address = ContractAddress();
    const [depositAmount, setDepositAmount] = useState('');
    const [qvePriceSwap, setQvePriceSwap] = useState('');
    const [arbQvePriceSwap, setArbQvePriceSwap] = useState('');
    const [BtoA, setBtoA] = useState('');
    const [maxQve, setMaxQve] = useState('');
    const web3 = new Web3(window.ethereum);
    let account = JSON.parse(localStorage.getItem('user'));

    // function SwapBtoA() {
    //     qveContract.QVEContract.methods.approve(Address.LiquidityAddress, web3.utils.toBN(depositAmount * 10**18)).send({ from: account });

    //     qveContract.LiquidityContract.methods.swapBtoA(web3.utils.toBN(depositAmount * 10**18)).send({ from: account });

    // }

    // const getSwapBData = qveContract.LiquidityContract.methods.getSwapBtoAReturnAmount(web3.utils.toBN(depositAmount * 10**18)).call();
    // const getSwapBtoACurrency = qveContract.LiquidityContract.methods.getSwapBtoAReturnAmount(web3.utils.toBN(1 * 10**18)).call();
    // const getMaxQve = qveContract.QVEContract.methods.balanceOf(account).call();
    // getSwapBData.then((result) => {
    //     setQvePriceSwap(result);
    //   });
    // getSwapBtoACurrency.then((result) => {
    //     setBtoA(result);
    // });
    // getMaxQve.then((result) => {
    //     setMaxQve(result)
    // });

    function SwapQVEtoArb() {
        const transaction = {
            type: "entry_function_aptos_transfer",
            function: '0x393368cfe77fda732c00f6a2b865bf89cf5bcf723c93a20547ebcd6f7a02ea07::liqpool::swapQvetoArb',
            arguments: [depositAmount * 10**8],
            type_arguments: [],
        };
        
        window.aptos.signAndSubmitTransaction(transaction).then(() => {
            console.log("전송 성공");
        })
    }

    return (
    <Background>
    <EContainer style={{height: '132px'}}></EContainer>
    <EContainer style={{width: '95%', maxWidth: '414px'}}>
    <Text style={{fontWeight: '700', fontSize: '24px', lineHeight: '36px', paddingLeft: '20px'}}>Swap</Text>
    </EContainer>
    <EContainer style={{height: '0px'}}></EContainer>
    <EContainer style={{display: 'flex', justifyContent: 'center'}}>
    <SwapContainer>
        <EContainer style={{height: '35px'}}></EContainer>
        <TokenOneContainer>
            <EContainer style={{height: '23px'}}></EContainer>
            <EContainer style={{display: 'flex',flexDirection: 'row', justifyContent: 'space-between', padding: '0px 25px 0px 25px', gap: '125px'}}>
                <EContainer style={{fontWeight: '500', fontSize: '14px', lineHeight: '17px', display: 'flex', flexDirection: 'row', justifyContent:'center', alignItems:'center'}}>
                <Text style={{color: '#5C5E81'}}>Available</Text>
                <EContainer style={{width: '4px'}}></EContainer>
                <Text style={{color: '#4A3CE8'}}>{(maxQve/10**18).toFixed(2)} QVE</Text>
                </EContainer>
                <MaxButton onClick={() => setDepositAmount((maxQve/10**18).toFixed(2))}>MAX</MaxButton>
            </EContainer>
            <EContainer style={{height: '10px'}}></EContainer>
            <EContainer style={{display: 'flex',flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: '0px 16px 0px 16px'}}>
                <EContainer style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                <Image src={Qve} style={{width: '46px', height: '43px'}}></Image>
               <EContainer style={{width: '5px'}}/>
                    <Text>QVE</Text>
                    </EContainer>
                <Input placeholder="0" value = {depositAmount} onChange={(e) => setDepositAmount((e.target.value))}></Input>
            </EContainer>
        </TokenOneContainer>
        <EContainer style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <Image src={SwapIcon} style={{width: '50px', height: '50px', cursor:'pointer'}} onClick={() => setIcon(0)}/>
        </EContainer>
        <TokenTwoContainer>
        <EContainer style={{height: '27px'}}></EContainer>
        <EContainer style={{display: 'flex',flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: '0px 16px 0px 16px'}}>
                <EContainer style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                <Image src={arbQve} style={{width: '46px', height: '43px'}}></Image>
                <EContainer style={{width: '5px'}}/>
                <Text>arbQVE</Text>
                </EContainer>
                <Input placeholder="0" value={(qvePriceSwap / 10**18).toFixed(2)}></Input>
            
        </EContainer>    
        </TokenTwoContainer>
        <EContainer style={{height: '20px'}}></EContainer>
        <Text style={{fontWeight: '400', fontSize: '11px', lineHeight: '13px', paddingLeft:'35px'}}>1 QVE ≈ {(BtoA/10**18).toFixed(2)} arbQVE</Text>
        <EContainer style={{height: '20px'}}></EContainer>
        <EContainer style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
        {depositAmount === '' ? 
            <Button style={{background: '#5C5E81'}}>Swap</Button> 
            : 
            <Button onClick={() => SwapQVEtoArb()}>Swap</Button>
            }
        </EContainer>
        <BackgroudImage src={QveImage}></BackgroudImage>
        
    </SwapContainer>
    </EContainer>
    </Background>
    );
}

export default SwapQVEtoarbQVE;