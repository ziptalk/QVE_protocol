import styled from "styled-components";
import XImg from "../../assets/X_Icon.png";
import BackgroundImage from "../../assets/SwapImage.png";
import Web3 from "web3";
import arbQveArtifact from "../../artifact/ArbQVE.json";
import stakeArtifact from "../../artifact/Stake.json";
import { useState } from "react";
const EContainer = styled.div`

`;

const StakeContainer = styled.div`
height: 283px;
background: #2B2B34;
border-radius: 16px;
display: flex;
flex-direction: column;
align-items: center;
position: relative;
`;

const Text = styled.div`

`;

const Image = styled.img`

`;

const DataContainer = styled.div`
height: 94px;
box-sizing: border-box;
border: 1px solid #3F3F46;
border-radius: 16px;
width: 90%;
padding: 21px 12px 16px 23px;

`;

const Input = styled.input`
all:  unset;
background: linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), #202025;
border-radius: 12px;
font-weight: 400;
font-size: 16px;
line-height: 19px;
text-align: right;
color: #B7B8CD;
width: 70%;
padding: '0px 0px 0px 0px'
`
const Button = styled.button`
all: unset;
width: 90%;
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

const InputContainer = styled.div`
background: linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), #202025;
border-radius: 12px;
font-weight: 400;
font-size: 16px;
line-height: 19px;
text-align: right;
color: #B7B8CD;
width: 200px;
display: flex;
justify-Content: flex-end;
align-items: center;
`;

const MaxButton = styled.button`
all: unset;
cursor: pointer;
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
width: 47.78px;
height: 21px;
background: #5C5E81;
border-radius: 16px;
font-weight: 700;
font-size: 9px;
line-height: 11px;
letter-spacing: 0.02em;

/* dark/white */

color: #FFFFFF;
`;

function StakeArbQve({setCount}) {
    const [amount, setAmount] = useState('');
    const [arbQveBalance, setArbQveBalance] = useState('');
    const web3 = new Web3(window.ethereum);
    let account = JSON.parse(localStorage.getItem('user'));
    const StakeAddress = "0xEbD58F66Cdca962e009fE304a61A591135091d9d";
    const arbQVEAddress = "0x6735E238D15666f6af715b4f1EE9E481435Fea12"
    const arbQveContract = new web3.eth.Contract(arbQveArtifact.output.abi, arbQVEAddress);
    const stakeContract = new web3.eth.Contract(stakeArtifact.output.abi, StakeAddress);

    function stakeArbQve() {
        arbQveContract.methods.approve(StakeAddress, web3.utils.toBN(amount * 10**18)).send({ from: account });

        stakeContract.methods.StakeArbQVE(web3.utils.toBN(amount * 10**18)).send({ from: account });
    }

    const availableArbQVE = arbQveContract.methods.balanceOf(account).call();
    availableArbQVE.then((result) => {
        console.log('arbQVEbalance',result);
        setArbQveBalance(result);
    })
    
    return (
        <EContainer style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <EContainer style={{height: '132px'}}></EContainer>
        <EContainer style={{display: 'flex', flexDirection: 'column', padding: '0px 20px 0px 20px', position: 'relative', width: '90%', maxWidth: '414px'}}>
        <EContainer style={{height: '178px'}}></EContainer>
        <EContainer style={{display: 'flex', flexDirection: 'column', padding: '0px 20px 0px 20px'}}>
        <StakeContainer>
            <EContainer style={{height: '30px'}}></EContainer>
            <Text style={{fontWeight: '700', fontSize: '18px', lineHeight: '24px', color: '#FFFFFF'}}>Staking Pool</Text>
            <Image style={{width: '19px', height: '19px', position: 'absolute', top: '31px', right:'31px', cursor: 'pointer'}} src={XImg} onClick={() => setCount(0)}></Image>
            <EContainer style={{height: '41px'}}></EContainer>
            <DataContainer>
                <EContainer style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                    <EContainer style={{display: 'flex', flexDirection: 'column'}}>
                        <Text style={{fontWeight: '700', fontSize: '18px', lineHeight: '24px', color: '#FFFFFF'}}>arbQVE</Text>
                        <Text style={{fontWeight: '700', fontSize: '12px', lineHeight: '15px', color: '#B7B8CD'}}>12.3%</Text>
                    </EContainer>
                    
                    <InputContainer>
                    <Input placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)}></Input>
                    <EContainer style={{width: '10px'}}/>
                    <MaxButton onClick={() => setAmount((arbQveBalance/10**18).toFixed(2))}>Max</MaxButton>
                    <EContainer style={{width: '10px'}}/>
                    </InputContainer>
                </EContainer>
                <EContainer style={{height: '5px'}} />
                <EContainer style={{display: 'flex', flexDirection: 'row', justifyContent:'flex-end'}}>
                        <Text style={{fontWeight: '700', fontSize: '9px', lineHeight: '11px', color: '#FFFFFF'}}>Available</Text>
                        <EContainer style={{width: '5px'}}></EContainer>
                        <Text style={{fontWeight: '700', fontSize: '9px', lineHeight: '11px', color: '#5C5E81'}}>{(arbQveBalance/10**18).toFixed(2)} arbQVE</Text>
                    </EContainer>
            </DataContainer>
            <EContainer style={{height: '15px'}}/>
            {amount === '' ? 
            <Button style={{background: '#5C5E81'}}>Amount is Empty</Button> 
            : 
            <Button onClick={() => stakeArbQve()}>Stake</Button>
            }
        </StakeContainer>
        </EContainer>
        <Image style={{height: '100%', width: '100%'}} src={BackgroundImage}/>
        <EContainer style={{height: '52px'}}/>
        </EContainer>
        </EContainer>
    );
}

export default StakeArbQve;

//<Input placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)}></Input>