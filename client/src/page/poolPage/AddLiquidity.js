import styled from "styled-components";
import XIcon from "../../assets/X_Icon.png";
import { useState } from "react";
import LiquidityArtifact from "../../artifact/LiquidityPool.json";
import QveArtifact from "../../artifact/Qve.json";
import arbQveArtifact from "../../artifact/ArbQVE.json";
import Web3 from "web3";
const Container = styled.div`
background: #2B2B34;
border-radius: 16px;
display: flex;
flex-direction: column;
align-items: center;
width: 90%;
max-width: 414px;
`;

const EContainer = styled.div`

`;

const Text = styled.div`
color: #FFFFFF;
`;

const QveArbContainer = styled.div`
box-sizing: border-box;
border: 1px solid #3F3F46;
border-radius: 16px;
width: 90%;
`;

const Input = styled.input`
all: unset;
background: linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), #202025;
border-radius: 12px;
font-weight: 700;
font-size: 18px;
line-height: 24px;
text-align: right;
letter-spacing: 0.02em;
color: #B7B8CD;
height: 40px;
width: 200px;
padding-right: 65px;
`;

const Button = styled.button`
all: unset;
width: 324px;
height: 55px;
font-weight: 600;
font-size: 14px;
line-height: 17px;
text-align: center;
color: #FFFFFF;
background: #4A3CE8;
border-radius: 16px;
cursor: pointer;
`;

const Image = styled.img`

`;

function AddLiquidity({setLiquidityCount}) {
    const [token, setToken] = useState(0);
    const web3 = new Web3(window.ethereum);
    const [amount, setAmount] = useState(0);
    const [qvePrice, setQvePrice] = useState(0);
    const [a, setA] = useState(0);
    const [b, setB] = useState(0);
    let account = JSON.parse(localStorage.getItem('user'));
    
    const AddLiquidityAddress = "0x57Fc576deAf9558229B6c06468D29C16a42034c6";
    const QveAddress = "0x90eA2B148537CafbC47ACF5B805633dCa505D7fa";
    const arbQveAddress = "0x6735E238D15666f6af715b4f1EE9E481435Fea12";
    const LiquidityContract = new web3.eth.Contract(LiquidityArtifact.output.abi , AddLiquidityAddress);
    const QveContract = new web3.eth.Contract(QveArtifact.output.abi, QveAddress);
    const arbQveContract = new web3.eth.Contract(arbQveArtifact.output.abi, arbQveAddress);
    account  = JSON.parse(localStorage.getItem('user'));
    function AddingLiquidity(amount) {

        QveContract.methods.approve(AddLiquidityAddress, web3.utils.toBN(amount * 10**18)).send({ from: account });;

        arbQveContract.methods.approve(AddLiquidityAddress, web3.utils.toBN(amount * 10**18)).send({ from: account });
        
        LiquidityContract.methods.addLiquidity_1(web3.utils.toBN(amount * 10**18)).send({ from: account });

        
    }
    let getQVEPoolData = LiquidityContract.methods.getLiquidityValue_1(amount).call();
    console.log(getQVEPoolData);
    let QvePrice = 0;
   
    getQVEPoolData.then((result) => {
        setQvePrice(result);
      });

    return(
        <Container style={{position: 'relative'}}>

            <EContainer style={{height: '30px'}}></EContainer>
            <EContainer style={{display: 'flex', flexDirection: 'row'}}>
            <Text style={{fontWeight:'700', fontSize: '18px', lineHeight: '24px'}}>Add Liquidity</Text>
            <Image src={XIcon} style={{width: '19px', height: '19px', cursor: 'pointer', position: 'absolute', right: '30px'}} onClick={() => (setLiquidityCount(0))}></Image>
            </EContainer>
            <EContainer style={{height: '40px'}}></EContainer>
            <QveArbContainer>
                <EContainer style={{display: 'flex', flexDirection: 'row', padding:'22px 12px 18px 23px', justifyContent:'space-between'}}>
                    <EContainer style={{display: 'flex', flexDirection: 'column'}}>
                        <Text style={{fontWeight: '700', fontSize: '18px', lineHeight: '24px', color: '#FFFFFF'}}>arbQVE</Text>
                        <EContainer style={{height: '8px'}}></EContainer>
                        <Text style={{fontWeight: '700', fontSize: '12px', lineHeight: '15px', color: '#B7B8CD'}}>50%</Text>
                    </EContainer>
                <EContainer style={{display: 'flex', flexDirection: 'column'}}>
                    <EContainer style={{display: 'flex', flexDirection: 'row', justifyContent:'flex-end'}}>
                        <Text style={{fontWeight: '700', fontSize: '9px', lineHeight: '11px', color: '#FFFFFF'}}>Available</Text>
                        <EContainer style={{width: '5px'}}></EContainer>
                        <Text style={{fontWeight: '700', fontSize: '9px', lineHeight: '11px', color: '#5C5E81'}}>0.000000 ATOM</Text>
                    </EContainer>
                    <EContainer style={{height: '4px'}}></EContainer>
                    <Input value={amount} placeholder="0" onChange={(e) => setAmount(e.target.value)}></Input>
                </EContainer>
                </EContainer>
            </QveArbContainer>
            <EContainer style={{height: '14px'}}></EContainer>
            <QveArbContainer>
            <EContainer style={{display: 'flex', flexDirection: 'row', padding:'22px 12px 18px 23px', justifyContent:'space-between'}}>
                    <EContainer style={{display: 'flex', flexDirection: 'column'}}>
                        <Text style={{fontWeight: '700', fontSize: '18px', lineHeight: '24px', color: '#FFFFFF'}}>QVE</Text>
                        <EContainer style={{height: '8px'}}></EContainer>
                        <Text style={{fontWeight: '700', fontSize: '12px', lineHeight: '15px', color: '#B7B8CD'}}>50%</Text>
                    </EContainer>
                <EContainer style={{display: 'flex', flexDirection: 'column'}}>
                    <EContainer style={{display: 'flex', flexDirection: 'row', justifyContent:'flex-end'}}>
                        <Text style={{fontWeight: '700', fontSize: '9px', lineHeight: '11px', color: '#FFFFFF'}}>Available</Text>
                        <EContainer style={{width: '5px'}}></EContainer>
                        <Text style={{fontWeight: '700', fontSize: '9px', lineHeight: '11px', color: '#5C5E81'}}>0.000000 ATOM</Text>
                    </EContainer>
                    <EContainer style={{height: '4px'}}></EContainer>
                    <Input value={qvePrice} placeholder="0"></Input>
                </EContainer>
                </EContainer>
            </QveArbContainer>
            <EContainer style={{height: '20px'}}></EContainer>
            <Button onClick={() => AddingLiquidity(amount)}>Amount is Empty</Button>
            <EContainer style={{height: '30px'}}/>
        </Container>
    );
}

export default AddLiquidity;