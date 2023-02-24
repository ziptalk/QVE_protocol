import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import LandingImg from "../../../assets/img/LandingImg.png";
import ArrowDown from "../../../assets/img/ArrowDown.png";
import Discord from "../../../assets/img/Discord.png";
import Twitter from "../../../assets/img/Twitter.png";
import Telegram from "../../../assets/img/Telegram.png";
import HowQveWorks from "../../../assets/img/HowQveWorks.png"

const Background = styled.div`
background-color: #1B1A1E;
height: 100%;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
`;

const EContainer = styled.div`

`;

const Text = styled.div`
font-family: 'Montserrat';
font-style: normal;
font-weight: 700;
font-size: 29px;
line-height: 35px;
text-align: center;
color: #FFFFFF;
`;

const Img = styled.img`

`;

const Button = styled.button`
all: unset;
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
gap: 10px;
background: #4A3CE8;
border-radius: 50px;
font-weight: 700;
font-size: 18px;
line-height: 24px;
color: #FFFFFF;
`;

const ThreeContainer = styled.div`
display: flex;
flex-direction: column;
justify-content: space-evenly;
box-sizing: border-box;
background: #2B2B34;
border: 1px solid #5C5E81;
box-shadow: 8px 8px 30px rgba(0, 0, 0, 0.2);
border-radius: 16px;
padding: 0px 25px 0px 25px;
`;

const StrategyContainer = styled.div`
height: 78px;
background: #2B2B34;
box-shadow: 8px 8px 30px rgba(0, 0, 0, 0.2);
border-radius: 16px;
width: 90%;
max-width: 374px;
display: flex;
flex-direction: row;
`;

function Main ({setSelectedOption}){
    
    const navigate = useNavigate();

    function MainPage() {
        setSelectedOption('Arbitrage');
        navigate("/mainPage");
    }

    function MainPageHedge() {
        setSelectedOption('BTC Hedge');
        navigate("/mainPage");
    }

    function MainPageFunding() {
        setSelectedOption('Funding Rate');
        navigate("/mainPage");
    }
    return (
        <Background>
        <EContainer style={{maxWidth: "374px"}}>
        <EContainer style={{height: '159px'}}></EContainer>
        <Text style={{fontWeight: '500'}}>Decentralized</Text>
        <Text>Fund Liquidation</Text>
        <Text>Solution</Text>
        <Img src={LandingImg} style={{height: '100%', width: '100%'}}></Img>
        <EContainer style={{height: '15px'}}/>
        <EContainer style={{display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
        <Button onClick={MainPage} style={{width: '200px', height: '60px'}}>Invest Now</Button>
        </EContainer>
        </EContainer>
        <EContainer style={{height: '50px'}}></EContainer>
        <Text style={{fontWeight: '700', fontSize: '29px', lineHeight: '35px'}}>Get Back</Text>
        <Text style={{fontWeight: '700', fontSize: '29px', lineHeight: '35px'}}>Your share of fund</Text>
        <EContainer style={{height: '25px'}}></EContainer>
        <EContainer style={{width: '90%', maxWidth: "374px", justifyContent: 'space-between', height: "100px", display: "flex", flexDirection: "row"}}>
            <ThreeContainer>
                <EContainer>
                <Text style={{fontWeight: '600', fontSize: '14px', lineHeight: '17px'}}>Total</Text>
                <Text style={{fontWeight: '600', fontSize: '14px', lineHeight: '17px'}}>Volume</Text>
                </EContainer>
                <EContainer>
                <Text style={{fontWeight: '700', fontSize: '16px', lineHeight: '19px'}}>$123,456</Text>
                </EContainer>
            </ThreeContainer>
            <ThreeContainer>
                <Text style={{fontWeight: '600', fontSize: '14px', lineHeight: '17px'}}>Returns</Text>
                <Text style={{fontWeight: '700', fontSize: '16px', lineHeight: '19px'}}>$123,456</Text>
            </ThreeContainer>
            <ThreeContainer>
                <Text style={{fontWeight: '600', fontSize: '14px', lineHeight: '17px'}}>Investors</Text>
                <Text style={{fontWeight: '700', fontSize: '16px', lineHeight: '19px'}}>$123,456</Text>
            </ThreeContainer>
        </EContainer>
        <EContainer style={{height: '97px'}}></EContainer>
        <Img src={ArrowDown} style={{width: "24px", height: "12px"}}></Img>
        <EContainer style={{height: '53px'}}></EContainer>
        <EContainer style={{width: '90%', maxWidth: "374px", justifyContent: 'space-between', height: "48px"}}>
            <Text style={{fontWeight: '700', fontSize: '18px', lineHeight: '24px'}}>Check Out</Text>
            <Text style={{fontWeight: '700', fontSize: '18px', lineHeight: '24px'}}>Various Investment Strategies</Text>
        </EContainer>
        <EContainer style={{height: '67px'}}></EContainer>
        <StrategyContainer>
            <EContainer style={{width: '100%', padding: '20px 27px 20px 27px', display: 'flex', justifyContent: 'space-between'}}>
                <EContainer style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start'}}>
                <Text style={{fontWeight: '700', fontSize: '16px', lineHeight: '19px'}}>Arbitrage</Text>
                <Text style={{fontWeight: '700', fontSize: '12px', lineHeight: '15px'}}>APR 12.3%</Text>
                </EContainer>
                <Button style={{width: '102px', height: '37px', fontWeight: '600', fontSize: '14px', lineHeight: '17px'}} onClick={MainPage}>Invest</Button>
            </EContainer>
        </StrategyContainer>
        <EContainer style={{height: '20px'}}></EContainer>
        <StrategyContainer>
        <EContainer style={{width: '100%', padding: '20px 27px 20px 27px', display: 'flex', justifyContent: 'space-between'}}>
                <EContainer style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start'}}>
                <Text style={{fontWeight: '700', fontSize: '16px', lineHeight: '19px'}}>BTC Hedge</Text>
                <Text style={{fontWeight: '700', fontSize: '12px', lineHeight: '15px'}}>APR 12.3%</Text>
                </EContainer>
                <Button style={{width: '102px', height: '37px', fontWeight: '600', fontSize: '14px', lineHeight: '17px'}} onClick={MainPageHedge}>Invest</Button>
            </EContainer>
        </StrategyContainer>
        <EContainer style={{height: '20px'}}></EContainer>
        <StrategyContainer>
        <EContainer style={{width: '100%', padding: '20px 27px 20px 27px', display: 'flex', justifyContent: 'space-between'}}>
                <EContainer style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start'}}>
                <Text style={{fontWeight: '700', fontSize: '16px', lineHeight: '19px'}}>Funding Rate</Text>
                <Text style={{fontWeight: '700', fontSize: '12px', lineHeight: '15px'}}>APR 12.3%</Text>
                </EContainer>
                <Button style={{width: '102px', height: '37px', fontWeight: '600', fontSize: '14px', lineHeight: '17px'}} onClick={MainPageFunding}>Invest</Button>
            </EContainer>
        </StrategyContainer>
        <EContainer style={{height: '49px'}}></EContainer>
        <Button onClick={MainPage} style={{width: '200px', height: '60px'}}>View Portfolio</Button>
        <EContainer style={{height: '97px'}}></EContainer>
        <Img src={ArrowDown} style={{width: "24px", height: "12px"}}></Img>
        <EContainer style={{height: '57px'}}></EContainer>
        <Text>How Qve Work?</Text>
        <EContainer style={{height: '62px'}}></EContainer>
        <Img src={HowQveWorks} style={{width: "248px", height: "434px"}}></Img>
        <EContainer style={{height: '50px'}}></EContainer>
        <Button style={{height: '60px', width: '200px'}} onClick={MainPage}>Deposit Coins</Button>
        <EContainer style={{height: "139px"}}></EContainer>
        <Text>Community</Text>
        <EContainer style={{height: '41px'}}></EContainer>
        <EContainer style={{width: '60%', maxWidth: '250px', height: '38px', display: 'flex', justifyContent:'space-between'}}>
            <Img src={Discord} style={{width: '50.14px'}}></Img>
            <Img src={Twitter} style={{width: '50.14px'}}></Img>
            <Img src={Telegram} style={{width: '50.14px'}}></Img>
        </EContainer>
        <EContainer style={{height: '140px'}}></EContainer>
        </Background>
    );
}

export default Main;