import styled from "styled-components";
import Qve from "../../assets/Qve.png";
import arbQve from "../../assets/arbQve.png";
import BackgroundImage from "../../assets/SwapImage.png";
const EContainer = styled.div`

`;

const Text = styled.div`
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

    return (
    <EContainer style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <EContainer style={{height: '132px'}}></EContainer>
        <EContainer style={{display: 'flex', flexDirection: 'column', padding: '0px 20px 0px 20px', position: 'relative', width: '90%', maxWidth: '414px'}}>
            <Text style={{fontWeight: '700', fontSize: '24px', lineHeight: '36px', color: '#B7B8CD'}}>Stake</Text>
            <EContainer style={{height: '10px'}}></EContainer>
            <StakeContainer>
                <EContainer style={{display: 'flex', flexDirection: 'row'}}>
                    <Image src={Qve} style={{width: '54.72px', height: '57.53px'}}></Image>
                    <EContainer style={{width: '20px'}}></EContainer>
                    <EContainer style={{display: 'flex', flexDirection: 'column'}}>
                        <Text style={{fontWeight: '700', fontSize: '24px', lineHeight: '36px', color: '#FFFFFF'}}>QVE</Text>
                        <Text style={{fontWeight: '600', fontSize: '14px', lineHeight: '17px', color: '#5C5E81'}}>Staking Pool</Text>
                    </EContainer>
                    <EContainer style={{position: 'absolute', right: '47px', display: 'flex', flexDirection: 'column', height: '57.53px', justifyContent: 'space-evenly'}}>
                        <Text style={{fontWeight: '700', fontSize: '16px', lineHeight: '19px', color: '#FFFFFF'}}>APY 12.3%</Text>
                        <Text style={{fontWeight: '700', fontSize: '16px', lineHeight: '19px', color: '#FFFFFF'}}>TVL $12.3M</Text>
                    </EContainer>
                </EContainer>
                <EContainer style={{height: '32px'}}></EContainer>
                <Button onClick={() => {setCount(1)}}>Stake</Button>
            </StakeContainer>
            <EContainer style={{height: '25px'}}></EContainer>
            <StakeContainer>
            <EContainer style={{display: 'flex', flexDirection: 'row'}}>
                    <Image src={arbQve} style={{width: '54.72px', height: '57.53px'}}></Image>
                    <EContainer style={{width: '20px'}}></EContainer>
                    <EContainer style={{display: 'flex', flexDirection: 'column'}}>
                        <Text style={{fontWeight: '700', fontSize: '24px', lineHeight: '36px', color: '#FFFFFF'}}>arbQVE</Text>
                        <Text style={{fontWeight: '600', fontSize: '14px', lineHeight: '17px', color: '#5C5E81'}}>Staking Pool</Text>
                    </EContainer>
                    <EContainer style={{position: 'absolute', right: '47px', display: 'flex', flexDirection: 'column', height: '57.53px', justifyContent: 'space-evenly'}}>
                        <Text style={{fontWeight: '700', fontSize: '16px', lineHeight: '19px', color: '#FFFFFF'}}>APY 12.3%</Text>
                        <Text style={{fontWeight: '700', fontSize: '16px', lineHeight: '19px', color: '#FFFFFF'}}>TVL $12.3M</Text>
                    </EContainer>
                </EContainer>
                <EContainer style={{height: '32px'}}></EContainer>
                <Button onClick={() => {setCount(2)}}>Stake</Button>
            </StakeContainer>

        </EContainer>
        <Image src={BackgroundImage} style={{width: '100%', maxWidth: '414px',height: '100%'}}></Image>

    </EContainer>);
}

export default Choose;