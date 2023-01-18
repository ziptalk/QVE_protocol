import styled from "styled-components";
import LineChart from "./Chart";
import React, { useState, useEffect } from "react";
import { ReactDOM } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import ExcIcon from "../../../assets/Subtract.png";
import axios from "axios";
import { Action } from "@remix-run/router";
import HiddenMessage from "../../../assets/hiddenMessage.png";
import DropDown from "../dropdown";
import pleaseConnectYourWallet from "../../../assets/PleaseConnectYourWallet.png"
import PreWalletImg from "../../../assets/PreWalletImg.png";
import Web3 from "web3";
import XImg from "../../../assets/X_Icon.png";
import MetamaskImg from "../../../assets/Metamask.png";
const ContainerAll = styled.div`
height: 100%;
z-index: -1;
background-color: #1B1A1E;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
`;

const EContainer = styled.div`
`;

const FirstContainer = styled.div`
width: 95%;
max-width: 700px;
position: relative;
`;

const FirstContainerValue = styled.div`
display: flex;
flex-direction: row; 
padding: 0px 20px 0px 20px;
height: 32px;
justify-content:space-between;
`;

const FirstContainerValueStart = styled.div`
display: flex;
flex-direction: row;
`;

const FirstContainerValueEnd = styled.div`
display: flex;
flex-direction: row;
align-self: end;
`;
const LogoutButton = styled.div`
z-index: 1;
position: fixed;
right: 20px;
top: 20px;

box-sizing: border-box;

/* Auto layout */

flex-direction: row;
justify-content: center;
align-items: center;
padding: 10px 29px;
width: 127px;
height: 37px;

/* dark/dark */

background: #2B2B34;
/* dark/label */

border: 1px solid #B7B8CD;
border-radius: 21px;

/* Inside auto layout */

flex: none;
order: 1;
flex-grow: 0;


font-family: 'Inter';
font-style: normal;
font-weight: 600;
font-size: 14px;
line-height: 17px;
/* identical to box height */


/* dark/label */

color: #B7B8CD;
`;

const Overview = styled.div`
width: 116px;
height: 36px;

/* Heading 2 */

font-family: 'Inter';
font-style: normal;
font-weight: 700;
font-size: 24px;
line-height: 36px;
/* identical to box height, or 150% */

letter-spacing: 0.02em;

/* dark/label */

color: #B7B8CD;
`;

const Change = styled.div`
position: absolute;
width: 156.8px;
height: 36px;
left: 20px;
top: 734px;

/* Heading 2 */

font-family: 'Inter';
font-style: normal;
font-weight: 700;
font-size: 24px;
line-height: 36px;
/* identical to box height, or 150% */

letter-spacing: 0.02em;

/* dark/label */

color: #B7B8CD;
`;

const ChangePNL = styled.div`
position: absolute;
width: 28px;
height: 17px;
left: 28px;
top: calc(50% - 17px/2 - 23.5px);

/* Cell */

font-family: 'Inter';
font-style: normal;
font-weight: 600;
font-size: 14px;
line-height: 17px;
/* identical to box height */


/* dark/white */

color: #FFFFFF;
`;

const ChangePNLText = styled.div`
position: absolute;
height: 15px;
left: 28px;
right: 313px;
top: 48px;

/* Label Emp */

font-family: 'Inter';
font-style: normal;
font-weight: 700;
font-size: 12px;
line-height: 15px;
/* identical to box height */

letter-spacing: 0.02em;

/* dark/label */

color: #B7B8CD;
`;

const ChagePNLTextValue = styled.div`
position: absolute;
width: 16px;
height: 17px;
left: 28px;
top: calc(50% - 17px/2 + 20.5px);

/* Cell Bold */

font-family: 'Inter';
font-style: normal;
font-weight: 700;
font-size: 14px;
line-height: 17px;
/* identical to box height */


/* down */

color: #0FB63E;

`;

const PnlChangePercent = styled.div`
display: flex;
width: 47px;
height: 17px;
align-self: end;
/* Cell Bold */

font-family: 'Inter';
font-style: normal;
font-weight: 700;
font-size: 14px;
line-height: 17px;
/* identical to box height */


/* down */

color: #FF395D;


/* Inside auto layout */
`;

const ChangeSplit = styled.div`
position: absolute;
width: 64px;
height: 0px;
left: 150px;
top: 50px;

/* btc */

border: 1px solid #777777;
transform: rotate(90deg);
`;

const ChangeMDD = styled.div`
position: absolute;
width: 33px;
height: 17px;
left: 225px;
top: calc(50% - 17px/2 - 23.5px);

/* Cell */

font-family: 'Inter';
font-style: normal;
font-weight: 600;
font-size: 14px;
line-height: 17px;
/* identical to box height */


/* dark/white */

color: #FFFFFF;
`;

const ChangeMDDText = styled.div`
position: absolute;
height: 15px;
left: 225px;
right: 116px;
top: 48px;

/* Label Emp */

font-family: 'Inter';
font-style: normal;
font-weight: 700;
font-size: 12px;
line-height: 15px;
/* identical to box height */

letter-spacing: 0.02em;

/* dark/label */

color: #B7B8CD;
`;

const ChangeMDDTextValue = styled.div`
position: absolute;
width: 10px;
height: 17px;
left: 225px;
top: calc(50% - 17px/2 + 20.5px);

/* Cell Bold */

font-family: 'Inter';
font-style: normal;
font-weight: 700;
font-size: 14px;
line-height: 17px;
/* identical to box height */


/* up */

color: #FF395D;
`;

const ChangeMDDPercent = styled.div`
position: absolute;
height: 15px;
left: 307px;
right: 29px;
top: 48px;

/* Label Emp */

font-family: 'Inter';
font-style: normal;
font-weight: 700;
font-size: 12px;
line-height: 15px;
/* identical to box height */

letter-spacing: 0.02em;

/* dark/label */

color: #B7B8CD;
`;

const ChangeMDDPercentValue = styled.div`

/* Cell Bold */

font-family: 'Inter';
font-style: normal;
font-weight: 700;
font-size: 14px;
line-height: 17px;
/* identical to box height */


/* up */

color: #0FB63E;


/* Inside auto layout */

flex-direction: row;
align-items: center;
padding: 0px;
gap: 4px;

position: absolute;
width: 44px;
height: 17px;
left: 307px;
top: 65px;
`;

const Turnover = styled.div`
position: absolute;
width: 189.65px;
height: 17.3px;
left: 20px;
top: 948px;

/* Heading 2 */

font-family: 'Inter';
font-style: normal;
font-weight: 700;
font-size: 24px;
line-height: 36px;
/* or 150% */

letter-spacing: 0.02em;

/* dark/label */

color: #B7B8CD;
`;

const TurnoverValue = styled.div`
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 24px;

position: absolute;
width: 84px;
height: 17px;
left: 20px;
top: 24px;


color: #0FB63E;

`;

const Asset = styled.div`

/* Heading 2 */
width: 373px;
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

const Initial = styled.div`

/* Label Emp */
font-family: 'Inter';
font-style: normal;
font-weight: 700;
font-size: 12px;
line-height: 15px;
/* identical to box height */
letter-spacing: 0.02em;
margin-left: 30px;
/* dark/label */

color: #B7B8CD;
`;  

const InitialValue = styled.div`

font-family: 'Inter';
font-style: normal;
font-weight: 700;
font-size: 23px;
line-height: 36px;
/* or 157% */

align-items: center;
text-align: right;
letter-spacing: 0.02em;
margin-right: 30px;
/* dark/white */

color: #FFFFFF;
`
const Present = styled.div`


/* Label Emp */
margin-left: 30px;
font-family: 'Inter';
font-style: normal;
font-weight: 700;
font-size: 12px;
line-height: 15px;
/* identical to box height */

letter-spacing: 0.02em;

/* dark/label */

color: #B7B8CD;
`;

const PresentValue = styled.div`

font-family: 'Inter';
font-style: normal;
font-weight: 700;
font-size: 23px;
/* or 157% */
margin-right: 30px;
align-items: center;
text-align: right;

/* dark/white */
color: #FFFFFF;
`;

const PresentPercent = styled.div`


/* Cell Bold */
margin-right: 30px;
font-family: 'Inter';
font-style: normal;
font-weight: 700;
font-size: 14px;
text-align: right;
/* identical to box height */
`;

const PresentDescription = styled.div`

margin-right: 30px;
font-family: 'Inter';
font-style: normal;
font-weight: 700;
font-size: 7px;
text-align: right;

/* dark/label */

color: #B7B8CD;
`;
const Period = styled.div`


/* Label Emp */
margin-left: 30px;
font-family: 'Inter';
font-style: normal;
font-weight: 700;
font-size: 12px;
line-height: 15px;
/* identical to box height */

letter-spacing: 0.02em;

/* dark/label */

color: #B7B8CD;
`;

const PeriodStart = styled.div`

margin-left: 30px;
font-family: 'Inter';
font-style: normal;
font-weight: 700;
font-size: 22px;
/* or 164% */

align-items: center;
letter-spacing: 0.02em;

/* dark/white */

color: #FFFFFF;
`;

const PeriodEnd = styled.div`

margin-right: 30px;
font-family: 'Inter';
font-style: normal;
font-weight: 700;
font-size: 22px;
/* or 164% */

align-items: center;
text-align: right;
letter-spacing: 0.02em;

/* dark/white */

color: #FFFFFF;
`;
const ChartContainer = styled.div`

/* dark/dark */
width: 95%;
background: #2B2B34;
border-radius: 16px;
`;

const ChartContainerPNL = styled.div`
padding: 24px 0px 0px 20px;

/* Cell Bold */

font-family: 'Inter';
font-style: normal;
font-weight: 700;
font-size: 14px;
line-height: 17px;
/* identical to box height */


/* dark/label */

color: #B7B8CD;
`

const ChartContainerPercent = styled.div`
height: 39px;
/* Chart Title */

font-family: 'Inter';
font-style: normal;
font-weight: 700;
font-size: 30px;
line-height: 39px;
/* identical to box height */


/* dark/white */

color: #FFFFFF;
`;

const ChartContainerMDD = styled.div`


/* Cell */

font-family: 'Inter';
font-style: normal;
font-weight: 600;
font-size: 14px;
line-height: 17px;
/* identical to box height */


/* dark/white */

color: #FFFFFF;


/* Inside auto layout */

flex: none;
order: 0;
flex-grow: 0;
`;

const ChartContainerMDDSplit = styled.div`


/* Cell */

font-family: 'Inter';
font-style: normal;
font-weight: 600;
font-size: 14px;
line-height: 17px;
/* identical to box height */


/* dark/white */

color: #FFFFFF;
`;


const ChartContainerMDDValue = styled.div`

/* Cell Bold */

font-family: 'Inter';
font-style: normal;
font-weight: 700;
font-size: 14px;
line-height: 17px;

`;

const TurnoverContainer = styled.div`
position: absolute;
width: 374px;
height: 65px;
left: 20px;
top: 997px;
background: #2B2B34;
border-radius: 16px;
`;

const AssetInitialContainer = styled.div`
height: 117px;
width: 90%;
max-width: 700px;
border-radius: 16px;
background: #2B2B34;
`;

const AssetPresentContainer = styled.div`
height: 136px;
width: 90%;
max-width: 700px;
float: center;
background: #2B2B34;
border-radius: 16px;
`;
const AssetPeriodContainer = styled.div`
height: 117px;
width: 90%;
max-width: 700px;;
justify-content: center;
background: #2B2B34;
border-radius: 16px;
`;

const AssetEContainer = styled.div`
display: flex;
height: 30px;
`;

const ExcButton = styled.button`
    all: unset;
    width: 16px;
    height: 16px;
    cursor: pointer;
    position: relative;
    &:focus {
        img {
            opacity: 1;
        }
    }
`

const ExcImg = styled.img`
width: 16px;
height: 16px;
`;

const ConnectWalletImg = styled.img`
width: 160px;
height: 108.07px;
`;


const LineChartContainer = styled.div`
width: 100%;
height: max-content;
float: 'center'
`;


const ContainerRow = styled.div`
display: flex;
flex-direction: row;
justify-content: space-between;
`;


const ExcMsg = styled.img`
height: 50.58px;
width: auto;
box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.3);
position: absolute;
bottom: 100%;
left: 50%;
transform: translateX(-50%);
transition: 0.3s;
opacity: 0;
`;

const ConnectWalletContainer = styled.div`
height: 235px;
width: 373px;
display: flex;
background: #2B2B34;
box-shadow: 8px 8px 30px rgba(0, 0, 0, 0.2);
border-radius: 16px;
justify-content: center;
align-items: center;

`;

const ConnectYourWalletContainer = styled.div`
width: 160px;
height: 164.07px;
flex-direction: column;
display: flex;
align-items: center;
justify-content: center;
`;

const Button = styled.button`
box-sizing: border-box;
all: unset;
cursor: pointer;
/* Auto layout */

display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 10px 30px;
gap: 10px;

/* dark/primary */

background: #4A3CE8;
border-radius: 16px;

/* Inside auto layout */

flex: none;
order: 0;
flex-grow: 0;

font-family: 'Inter';
font-style: normal;
font-weight: 600;
font-size: 14px;
line-height: 17px;
/* identical to box height */


/* dark/label */

color: #FFFFFF;
`;

const StrategyContainer = styled.div`
width: 95%;
max-width: 700px;
font-family: 'Inter';
font-style: normal;
font-weight: 500;
font-size: 12px;
line-height: 15px;
/* identical to box height */

display: flex;
align-items: center;

/* dark/label */

color: #B7B8CD;

`;

const DepositButton = styled.button`
all: unset;
cursor: pointer;
box-sizing: border-box;

/* Auto layout */

display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 10px 30px;
gap: 10px;
width: 113px;
height: 37px;

/* dark/primary */

background: #4A3CE8;
border-radius: 16px;

/* Inside auto layout */

flex: none;
order: 1;
flex-grow: 0;


font-family: 'Inter';
font-style: normal;
font-weight: 600;
font-size: 14px;
line-height: 17px;
/* identical to box height */


/* dark/label */

color: #FFFFFF;

`;

const PreWalletConnectContainer = styled.div`
position: absolute;
top: 270px;
left: calc(50%-147px);
width: 294px;
height: 170px;
background: #2B2B34;
box-shadow: 8px 8px 30px rgba(0, 0, 0, 0.2);
border-radius: 16px;
`;

const PreWalletImgContainer = styled.img`
width: 223px;
height: 57px;
display: flex;
align-self: center;
justify-content: center;
`;

const WalletConnectContainer = styled.div`
width: 373px;
height: 530px;
position: absolute;
top: 152px;
left: (50% - 186.5px);
background: #2B2B34;
box-shadow: 8px 8px 30px rgba(0, 0, 0, 0.2);
border-radius: 16px;
`;

const ConnectWallet = styled.div`
font-family: 'Inter';
font-style: normal;
font-weight: 700;
font-size: 18px;
line-height: 24px;
padding-left: 30px;
/* identical to box height, or 133% */

letter-spacing: 0.02em;

/* dark/label */

color: #B7B8CD;

`;

const WalletMarketContainer = styled.div`
display: flex;
flex-direction: column;
align-items: center;
`;

const ImageContainer = styled.img`

`;

const WalletContainer = styled.div`
width: 98px;
height: 117px;
background: #3F3F46;
border-radius: 16px;
`;

const DepositContainer = styled.div`
position: absolute;
top: 201px;
left: (50% - 186.5);
width: 373px;
height: 390px;
background: #2B2B34;
box-shadow: 8px 8px 30px rgba(0, 0, 0, 0.2);
border-radius: 16px;


`;


function MainWalletX() {
    
    const [userMe, setUserMe] = useState('');
    const [balanceList, setBalanceList] = useState('');
    const [myBalance, setMyBalance] = useState('');
    const [mdd, setMdd] = useState('');
    const [pnl, setPnl] = useState('');
    const [portfolio, setPortfolio] = useState('');
    const [excMsg, setExcMsg] = useState(0);
    const totalInitialInvestment = 79300;
    const [secondPort, setSecondPort] = useState('');
    const [account, setAccount] = useState();
    const [preWalletCount, setPreWalletCount] = useState(null);
    const web3 = new Web3(window.ethereum);

    async function getAccount() {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setAccount(accounts[0]);
}
    /* const getAccount = async () => { 
        console.log("web3", web3);
        const getAccount = await web3.eth.getAccounts();
      const account = getAccount[0];
      console.log("account: ", account);
    }; */

    
   
const parsedData = JSON.parse(localStorage.getItem("user")).access_token;


const fetchUserMe = async () => {
    axios.get('https://qve.today/user/me/', { headers: {"Authorization" : `Bearer ${parsedData}`}})
    .then(res => {
        setUserMe(res.data);
    }, [])
}
const fetchBalanceList = async () => {
    axios.get('https://qve.today/balance/get/', { headers: {"Authorization" : `Bearer ${parsedData}`}})
    .then(res => {
        setBalanceList(res.data);
    }, [])
}
const fetchMyBalance = async () => {
    axios.get('https://qve.today/user/mybalance/', { headers: {"Authorization" : `Bearer ${parsedData}`}})
    .then(res => {
        setMyBalance(res.data);
    }, [])
}
const fetchMdd = async () => {
    axios.get('https://qve.today/balance/getmdd', { headers: {"Authorization" : `Bearer ${parsedData}`}})
    .then(res => {
        setMdd(res.data);
    })
}
const fetchPnl = async () => {
    axios.get('https://qve.today/balance/getpnl', { headers: {"Authorization" : `Bearer ${parsedData}`}})
    .then(res => {
        setPnl(res.data);
    })
}

const fetchSecond = async () => {
    axios.get('https://qve.today/portfolios/eth-btc-hedge-volatility/', { headers: {"Authorization" : `Bearer ${parsedData}`}})
    .then(res => {
        setSecondPort(res.data);
    })
}

    useEffect(() => {
            fetchUserMe();
            fetchBalanceList();
            fetchMyBalance();
            fetchMdd();
            fetchPnl();
            fetchSecond();
            }, [])

            //getAccount();
    const navigate = useNavigate();

    function getKeyByValue(object, value) {
        return object[value];
      }
    const logout = () => {
        localStorage.removeItem("user");
        navigate("/");
    }
    var balanceArray = [];
    var pnlArray = [];
    for (let i = 0; i < balanceList.length; i++) {
        let valueBalance = getKeyByValue(balanceList[i], "balance");
        balanceArray.push(valueBalance.toFixed(0));
    }
    const initialValue = getKeyByValue(userMe, "initial_investment");
    const start_date = getKeyByValue(userMe, "start_date");
    const end_date = getKeyByValue(userMe, "end_date");
    let my_balance = (getKeyByValue(myBalance, "my_balance"));
    let my_margin = (getKeyByValue(myBalance, "my_margin"));
    let my_margin_rate = (getKeyByValue(myBalance, "my_margin_rate"));
    let mdd_value = getKeyByValue(mdd, "mdd");
    mdd_value = Math.abs(mdd_value);
    let pnl_value = getKeyByValue(pnl, "pnl");
    let pnl_24h_gap = getKeyByValue(pnl, "pnl_24h_gap");
    for (let i = 0; i < balanceArray.length; i++) {
        var pnlValue = (balanceArray[i] - totalInitialInvestment) / totalInitialInvestment;
        pnlArray.push((pnlValue * 100).toFixed(2));
    }
    const currentPnl = pnlArray.at(-1);
    if (my_balance !== undefined) {
        my_balance = my_balance.toFixed(2);
        my_margin = my_margin.toFixed(2);
        my_margin_rate = my_margin_rate.toFixed(2);
    }

    if (pnl_value != undefined) {
        pnl_value = pnl_value.toFixed(2);
        pnl_24h_gap = pnl_24h_gap.toFixed(2);
    }

    if (mdd_value != undefined) {
        mdd_value = mdd_value.toFixed(2);
    }
    console.log("prewalletcount", preWalletCount);
    return(
        
        <>
        <Asset>My Asset</Asset>
        <ConnectWalletContainer>
        <EContainer style={{height: '35px'}}></EContainer>
        <ConnectYourWalletContainer>
        <ConnectWalletImg src={pleaseConnectYourWallet}></ConnectWalletImg>
        <EContainer style={{height: '19px'}}></EContainer>
        <Button onClick={() => {setPreWalletCount(1)}}>Connect Wallet</Button>
        <PreWalletConnectContainer style={{visibility : preWalletCount === 1 ? "visible" : "hidden"}}>

        <EContainer style={{display: 'flex', flexDirection: 'column', width: '100%'}}>
        <EContainer style={{height: '34px'}}></EContainer>
        <PreWalletImgContainer src={PreWalletImg}></PreWalletImgContainer>
        <EContainer style={{height: '22px'}}></EContainer>
        <EContainer style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignSelf: 'center', width: '90%'}}>
        <DepositButton onClick={() => {setPreWalletCount(null)}} style={{background: '#FFFFFF', color: '#777777'}}>Cancel</DepositButton>
        <DepositButton onClick={() => {setPreWalletCount(2)}}>Connect</DepositButton>
        </EContainer>
        </EContainer>
        </PreWalletConnectContainer>
        <WalletConnectContainer style={{visibility : preWalletCount === 2 ? "visible" : "hidden", flexDirection: 'column'}}>
        <EContainer style={{height: '36px'}}></EContainer>
        <WalletMarketContainer>
        <EContainer style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%'}}>
        <ConnectWallet>Connect wallet</ConnectWallet>
        <ImageContainer src={XImg} style={{width: '19px', height: '19px', cursor: 'pointer', paddingRight: '30px'}} onClick={() => {setPreWalletCount(null)}}></ImageContainer>
        </EContainer>
        <EContainer style={{height: '38px'}}></EContainer>
        <EContainer style={{height: '385px', width: '314px'}}>
        <WalletContainer style={{display:'flex', flexDirection: 'column', justifyContent:'center', alignItems:'center'}}>
        <ImageContainer src={MetamaskImg} onClick="setPreWalletCount(null); getAccount()" style={{cursor:'pointer', borderRadius: '50%', width: '44px', height: '44px'}}></ImageContainer>
        MetaMask
        </WalletContainer>
        </EContainer>
        </WalletMarketContainer>
        <EContainer style={{height: '38px'}}></EContainer>
        </WalletConnectContainer>
        <DepositContainer style={{visibility : preWalletCount === 3 ? "visible" : "hidden"}}>
        
        </DepositContainer>
        </ConnectYourWalletContainer>
        </ConnectWalletContainer>
        </>
    );
}

/*<EContainer style={{display:'flex', justifyContent: 'flex-start', width: '95%', maxWidth: '700px', position: 'relative', alignSelf: 'center', position: 'relative'}}>
            <DropDown></DropDown>
        </EContainer>*/
export default MainWalletX;