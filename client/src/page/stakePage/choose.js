import styled from "styled-components";
import Qve from "../../assets/img/Qve.png";
import arbQve from "../../assets/img/arbQve.png";
import BackgroundImage from "../../assets/img/SwapImage.png";
import { useState } from "react";
const Background = styled.div`
height: 90vh;
display: flex;
flex-direction: column;
align-items: center;
`;

const EContainer = styled.div`

`;

const Text = styled.div`
font-weight: 700;
font-size: 24px;
line-height: 36px;
/* identical to box height, or 150% */

letter-spacing: 0.02em;

/* dark/label */

color: #B7B8CD;
`;

const StakeContainer = styled.div`
display: flex;
flex-direction: column;

background: #2B2B34;
border-radius: 16px;
padding: 30px 27px 25px 27px;
`;

const Image = styled.img`

`;

const Button = styled.button`
all: unset;
cursor: pointer;
height: 55px;
width: 100%;
background: #4A3CE8;
border-radius: 16px;
font-weight: 600;
font-size: 14px;
line-height: 17px;
/* identical to box height */

text-align: center;

/* dark/white */

color: #FFFFFF;
`;

function Choose({setCount}) {
    const [connected, setConnected] = useState('');

    async function Connect() {
        console.log('connnect');
        try {
            await window.aptos.connect();
            const account = await window.aptos.account();
            localStorage.setItem('user', JSON.stringify(account.address));
        } catch (error) {

        }
    }
    
    try {
        let connectionStatus = window.aptos.isConnected();
        connectionStatus.then((result) => {
            setConnected(result);
        })
    }
    catch (error) {

    }
    console.log(connected)

    return (
        <Background>
        <EContainer style={{height: '132px'}}></EContainer>
        <EContainer style={{width: '90%', maxWidth: '374px'}}>
        <Text style={{fontWeight: '700', fontSize: '24px', lineHeight: '36px'}}>Stake</Text>
        <EContainer style={{height: '10px'}}/>
        <StakeContainer>
            <EContainer style={{display: 'flex', justifyContent: 'space-between'}}>
                <EContainer style={{display: 'flex', flexDirection: 'row'}}>
                <Image src={Qve} style={{width: '54.72px', height: '57.53px'}}></Image>
                <EContainer style={{width: '20px'}} />
                    <EContainer style={{display: 'flex', flexDirection: 'column'}}>
                        <Text style={{fontWeight: '700', fontSize: '24px', lineHeight: '36px', color: '#FFFFFF'}}>QVE</Text>
                        <Text style={{fontWeight: '600', fontSize: '14px', lineHeight: '17px', color: '#5C5E81'}}>Staking Pool</Text>
                    </EContainer>
                </EContainer>
                <EContainer style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly'}}>
                <EContainer style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly'}}>
                    <Text style={{fontWeight: '700', fontSize: '12px', lineHeight: '15px', color: '#B7B8CD'}}>APY</Text>
                    <Text style={{fontWeight: '700', fontSize: '12px', lineHeight: '15px', color: '#B7B8CD'}}>TVL</Text>
                </EContainer>
                <EContainer style={{width: '14px'}}/>
                <EContainer style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', alignItems: 'flex-end'}}>
                        <Text style={{fontWeight: '700', fontSize: '16px', lineHeight: '19px', color: '#FFFFFF'}}>12.3%</Text>
                <Text style={{fontWeight: '700', fontSize: '16px', lineHeight: '19px', color: '#FFFFFF'}}>$12.3M</Text>
                </EContainer>
                </EContainer>
            </EContainer>
            <EContainer style={{height: '30px'}}/>
            { connected === false ? 
            <Button onClick={() => Connect()}>Connect Wallet</Button>
            : 
            <Button onClick={() => {setCount(1)}}>Stake</Button>
            }
        </StakeContainer>
        <EContainer style={{height: '25px'}}/>
        <StakeContainer>
        <EContainer style={{display: 'flex', justifyContent: 'space-between'}}>
                <EContainer style={{display: 'flex', flexDirection: 'row'}}>
                <Image src={arbQve} style={{width: '54.72px', height: '57.53px'}}></Image>
                <EContainer style={{width: '20px'}} />
                    <EContainer style={{display: 'flex', flexDirection: 'column'}}>
                        <Text style={{fontWeight: '700', fontSize: '24px', lineHeight: '36px', color: '#FFFFFF'}}>arbQVE</Text>
                        <Text style={{fontWeight: '600', fontSize: '14px', lineHeight: '17px', color: '#5C5E81'}}>Staking Pool</Text>
                    </EContainer>
                </EContainer>
                <EContainer style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly'}}>
                <EContainer style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly'}}>
                    <Text style={{fontWeight: '700', fontSize: '12px', lineHeight: '15px', color: '#B7B8CD'}}>APY</Text>
                    <Text style={{fontWeight: '700', fontSize: '12px', lineHeight: '15px', color: '#B7B8CD'}}>TVL</Text>
                </EContainer>
                <EContainer style={{width: '14px'}}/>
                <EContainer style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', alignItems: 'flex-end'}}>
                        <Text style={{fontWeight: '700', fontSize: '16px', lineHeight: '19px', color: '#FFFFFF'}}>12.3%</Text>
                <Text style={{fontWeight: '700', fontSize: '16px', lineHeight: '19px', color: '#FFFFFF'}}>$12.3M</Text>
                </EContainer>
                </EContainer>
            </EContainer>
            <EContainer style={{height: '30px'}}/>
            { connected === false ? 
            <Button onClick={() => Connect()}>Connect Wallet</Button>
            : 
            <Button onClick={() => {setCount(2)}}>Stake</Button>
            }
        </StakeContainer>
        </EContainer>
        
    </Background>
    );
}

export default Choose;