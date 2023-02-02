import styled from "styled-components";
import SwapImage from "../../assets/SwapImage.png"
import Qve from "../../assets/Qve.png";
import arbQve from "../../assets/arbQve.png"
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
height: 432px;
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
margin-left: 25px;
background: #5C5E81;
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

function Main() {
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
                <Text style={{color: '#4A3CE8'}}>0 QVE</Text>
                </EContainer>
                <MaxButton>MAX</MaxButton>
            </EContainer>
            <EContainer style={{height: '10px'}}></EContainer>
            <EContainer style={{display: 'flex',flexDirection: 'row', justifyContent: 'space-between',padding: '0px 25px 0px 25px'}}>
                <EContainer style={{display: 'flex', flexDirection: 'row'}}>
                <Image src={Qve} style={{width: '46px', height: '43px'}}></Image>
                <EContainer style={{width: '10px'}}></EContainer>
                <EContainer style={{display: 'flex', flexDirection: 'column'}}>
                    <Text>QVE</Text>
                    <EContainer style={{height: '4px'}}></EContainer>
                    <Text>QVE Hub</Text>
                    </EContainer>
                </EContainer>
                <Input placeholder="0"></Input>
            </EContainer>
        </TokenOneContainer>
        <EContainer style={{height: '20px'}}></EContainer>
        <TokenTwoContainer>
        <EContainer style={{height: '27px'}}></EContainer>
        <EContainer style={{display: 'flex',flexDirection: 'row', justifyContent: 'space-between', padding: '0px 25px 0px 25px'}}>
                <EContainer style={{display: 'flex',flexDirection: 'row'}}>
                <Image src={arbQve} style={{width: '46px', height: '43px'}}></Image>
                <EContainer style={{width: '10px'}}></EContainer>
                <EContainer style={{display: 'flex', flexDirection: 'column'}}>
                    <Text>arbQVE</Text>
                    <EContainer style={{height: '4px'}}></EContainer>
                    <Text>QVE Hub</Text>
                </EContainer>
                </EContainer>
                <Input placeholder="0"></Input>
            
        </EContainer>    
        </TokenTwoContainer>
        <EContainer style={{height: '20px'}}></EContainer>
        <Text style={{fontWeight: '400', fontSize: '11px', lineHeight: '13px', paddingLeft:'35px'}}>1 QVE ≈ 12.345678 arbQVE</Text>
        <EContainer style={{height: '20px'}}></EContainer>
        <Button>Swap</Button>
        <BackgroudImage src={SwapImage}></BackgroudImage>
    </SwapContainer>
    </EContainer>
    </Background>
    );
}

export default Main;