import styled from "styled-components";
import QveImage from "../../assets/SwapImage.png"
import Qve from "../../assets/Qve.png";
import arbQve from "../../assets/arbQve.png"
import LiquidityArtifact from "../../artifact/LiquidityPool.json";
import arbQveArtifact from "../../artifact/ArbQVE.json";
import QveArtifact from "../../artifact/Qve.json";
import Web3 from "web3";
import SwapIcon from "../../assets/SwapIcon.png";
import { useState } from "react";
import StakeQve from "../stakePage/stakeQve";
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
font-family: 'Inter';
font-style: normal;
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
font-family: 'Inter';
font-style: normal;
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
font-family: 'Inter';
font-style: normal;
font-weight: 600;
font-size: 14px;
line-height: 17px;
color: #FFFFFF;
`;

const Image = styled.img`

`;

const Input = styled.input`
height: 24px;
font-family: 'Inter';
font-style: normal;
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
    const [depositAmount, setDepositAmount] = useState('');
    const [qvePriceSwap, setQvePriceSwap] = useState('');
    const [arbQvePriceSwap, setArbQvePriceSwap] = useState('');
    const [BtoA, setBtoA] = useState('');
    const [maxQve, setMaxQve] = useState('');
    const web3 = new Web3(window.ethereum);
    let account = JSON.parse(localStorage.getItem('user'));
    const LiquidityAddress = "0x57Fc576deAf9558229B6c06468D29C16a42034c6";
    const QveAddress = "0x90eA2B148537CafbC47ACF5B805633dCa505D7fa";
    const arbQveAddress = "0x6735E238D15666f6af715b4f1EE9E481435Fea12";
    const LiquidityContract = new web3.eth.Contract(LiquidityArtifact.output.abi, LiquidityAddress);
    const QveContract = new web3.eth.Contract(QveArtifact.output.abi, QveAddress);
    const arbQveContract = new web3.eth.Contract(arbQveArtifact.output.abi, arbQveAddress);

    function SwapBtoA() {
        QveContract.methods.approve(LiquidityAddress, web3.utils.toBN(depositAmount * 10**18)).send({ from: account });

        LiquidityContract.methods.swapBtoA(web3.utils.toBN(depositAmount * 10**18)).send({ from: account });

    }

    const getSwapBData = LiquidityContract.methods.getSwapBtoAReturnAmount(web3.utils.toBN(depositAmount * 10**18)).call();
    const getSwapBtoACurrency = LiquidityContract.methods.getSwapBtoAReturnAmount(web3.utils.toBN(1 * 10**18)).call();
    const getMaxQve = QveContract.methods.balanceOf(account).call();
    console.log('a', getSwapBData);
    getSwapBData.then((result) => {
        setQvePriceSwap(result);
      });
    getSwapBtoACurrency.then((result) => {
        setBtoA(result);
    });
    getMaxQve.then((result) => {
        setMaxQve(result)
    });

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
            <Button onClick={() => SwapBtoA()}>Swap</Button>
            }
        </EContainer>
        <BackgroudImage src={QveImage}></BackgroudImage>
        
    </SwapContainer>
    </EContainer>
    </Background>
    );
}

export default SwapQVEtoarbQVE;