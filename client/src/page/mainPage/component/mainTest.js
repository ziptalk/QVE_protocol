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
import MainWalletX from "./mainWalletX";
import AssetConnected from "./assetConnected";
import Web3 from "web3";
import {useSwipeable} from 'react-swipeable';

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



const ChartContainer = styled.div`

/* dark/dark */
width: 100%;
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

const LineChartContainer = styled.div`
width: 100%;
height: max-content;
float: 'center'
`;

const AssetContainer = styled.div`
display: flex;
width: 90%;
flex-direction: column;
margin: auto;
align-items: center;
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


const DropDownContainer = styled("div")`
  width: 10.5em;
  margin: 0 auto;
  flex: auto;
`;

const DropDownHeader = styled("div")`
  box-sizing: border-box;
flex-wrap: wrap;
/* Auto layout */

display: flex;
flex-direction: column;
align-items: flex-start;
padding: 13.5px 20px;
gap: 20px;

width: 224px;
height: 60px;

/* dark/background */

background: #1B1A1E;
/* dark/primary */

border: 1px solid #4A3CE8;
border-radius: 16px;

/* Inside auto layout */

order: 0;
flex-grow: 0;
cursor: pointer;

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

const DropDownListContainer = styled("div")``;

const DropDownList = styled("ul")`
  padding: 0;
  margin: 0;
  padding-left: 7px;
  padding-right: 7px;
  background: #ffffff;
  border: 2px solid #e5e5e5;
  box-sizing: border-box;
  color: #3faffa;
  font-size: 1.3rem;
  font-weight: 500;
  &:first-child {
    padding-top: 0.3em;
  }
  cursor: pointer;
  width: 224px;
  background: #2B2B34;
/* dark/unactive */

border: 1px solid #3F3F46;
box-shadow: 4px 4px 60px rgba(0, 0, 0, 0.4);
border-radius: 16px;

/* dark/label */

color: #B7B8CD;
`;

const ListItem = styled("li")`
display: flex;
width: 100%;
height: 40px;
left: 10px;
font-family: 'Inter';
font-style: normal;
font-weight: 700;
font-size: 16px;
line-height: 19px;
align-items: center;

/* dark/unactive */
&:hover {
    background: #3F3F46;
}
border-radius: 10px;
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

function MainTest() {
    
    const [userMe, setUserMe] = useState('');
    const [balanceList, setBalanceList] = useState('');
    const [myBalance, setMyBalance] = useState('');
    const [mdd, setMdd] = useState('');
    const [pnl, setPnl] = useState('');
    const [portfolio, setPortfolio] = useState('');
    const [excMsg, setExcMsg] = useState(0);
    const [secondPort, setSecondPort] = useState('');
    const [thirdPort, setThirdPort] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const totalInitialInvestment = 79300;
    const options = ["Portfolio 01", "Portfolio 02", "Portfolio 03"];
    const [account, setAccount] = useState();
    const [preWalletCount, setPreWalletCount] = useState(null);
    const web3 = new Web3(window.ethereum);
const parsedData = JSON.parse(localStorage.getItem("user")).access_token;

const toggling = () => setIsOpen(!isOpen);
const onOptionClicked = value => () => {
  setSelectedOption(value);
  setIsOpen(false);
  pnlArray = [];
};

async function getAccount() {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setAccount(accounts[0]);
}

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
        console.log(res.data);
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

const fetchThird = async () => {
    axios.get('https://qve.today/portfolios/fundingfee-trading/', { headers: {"Authorization" : `Bearer ${parsedData}`}})
    .then(res => {
        setThirdPort(res.data);
    })
}
    useEffect(() => {
            fetchUserMe();
            fetchBalanceList();
            fetchMyBalance();
            fetchMdd();
            fetchPnl();
            fetchSecond();
            fetchThird();
            }, [])

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
    var secondPort_cr_Array = [];
    var secondPort_mdd_Array = [];
    var thirdPort_cr_Array = [];
    var thirdPort_mdd_Array = [];
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
    let mdd_value;
    let pnl_value = getKeyByValue(pnl, "pnl");
    let pnl_24h_gap = getKeyByValue(pnl, "pnl_24h_gap");

    for (let i = 0; i < secondPort.length; i++) {
        let secondPort_cr = getKeyByValue(secondPort[i], "cr");
        let secondPort_mdd = getKeyByValue(secondPort[i], "mdd");
        secondPort_cr_Array.push(secondPort_cr);
        secondPort_mdd_Array.push(secondPort_mdd);
    }
    for (let i = 0; i < thirdPort.length; i++) {
        let thirdPort_cr = getKeyByValue(thirdPort[i], "cr");
        let thirdPort_mdd = getKeyByValue(thirdPort[i], "mdd");
        thirdPort_cr_Array.push(thirdPort_cr);
        thirdPort_mdd_Array.push(thirdPort_mdd);
    }

    if (selectedOption === 'Portfolio 01') {
    for (let i = 0; i < balanceArray.length; i++) {
        var pnlValue = (balanceArray[i] - totalInitialInvestment) / totalInitialInvestment;
        pnlArray.push((pnlValue * 100).toFixed(2));
    }
} else if (selectedOption === 'Portfolio 02') {
    for (let i = 0; i < secondPort.length; i++) {
        pnlArray.push((secondPort_cr_Array[i]));
    } 
} else if (selectedOption === 'Portfolio 03') {
    for (let i =0; i < thirdPort.length; i++) {
        pnlArray.push(thirdPort_cr_Array[i]);
    }
}
else {
       pnlArray = [];
    }

    if (pnlArray != []) {
        for (let i = 0; i < pnlArray.length; i++) {
            pnlArray[i] = (Number(pnlArray[i]).toFixed(2));
        }
    }

    if (selectedOption === 'Portfolio 01') {
        mdd_value = getKeyByValue(mdd, "mdd");
    }
    else if (selectedOption === 'Portfolio 02') {
        mdd_value = secondPort_mdd_Array.at(-1);
    }
    else if (selectedOption === 'Portfolio 03') {
        mdd_value = thirdPort_mdd_Array.at(-1);
    }
    mdd_value = Math.abs(mdd_value);
    
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
    /* console.log('pnlArray Length', pnlArray.length);
    console.log('secondPort', secondPort.length);
    console.log('selectedOption', selectedOption); */
    /* console.log(secondPort);
    console.log(pnlArray); */

    const swipeableHandlers = useSwipeable({
        onSwipeLeft: () => console.log('swiped left'),
        onSwipeRight: () => console.log('swiped right')
    });

    return(
        <ContainerAll>
        <LogoutButton onClickCapture={logout}>Disconnect</LogoutButton>
        <EContainer style={{height: "105px"}}></EContainer>
        <StrategyContainer>Strategy Selector</StrategyContainer>
        <EContainer style={{height: '30px'}}></EContainer>
        <EContainer style={{display: 'flex', flexDirection: 'row', width: '90%', maxWidth: '700px', justifyContent: 'flex-end'}}>
        <DepositButton onClick={() => setPreWalletCount(3)}>Deposit</DepositButton>
        </EContainer>
        <EContainer style={{width: '100%', display: 'flex', justifyContent: 'center'}}>
        <FirstContainer>
        <EContainer style={{height: '12px'}}></EContainer>
        <ChartContainer> 
        <EContainer style={{position: 'absolute', top: '-80px'}}>
        <EContainer style={{height: '20px'}}></EContainer>
      <DropDownContainer>
        <DropDownHeader onClick={toggling}>
          {selectedOption || "Portfolio 01"}
        </DropDownHeader>
        <EContainer style={{height: '4px'}}></EContainer>
        {isOpen && (
          <DropDownListContainer>
            <DropDownList>
              {options.map(option => (
                <ListItem onClick={onOptionClicked(option)} key={Math.random()}>
                  {option}
                </ListItem>
              ))}
            </DropDownList>
          </DropDownListContainer>
        )}
      </DropDownContainer>
        </EContainer>
        <EContainer style={{display: 'flex', justifyContent: 'space-between', flexDirection: 'row', alignSelf: 'flex-end'}}>
            <ChartContainerPNL>PNL</ChartContainerPNL>
            </EContainer>
            <FirstContainerValue>
            <FirstContainerValueStart>
            <ChartContainerPercent>{currentPnl}%</ChartContainerPercent>
            <EContainer style={{width: '5px'}}></EContainer>
            <PnlChangePercent style={{color: pnl_24h_gap > 0 ? "#0FB63E" : "#FF395D"}}>{pnl_24h_gap}%p</PnlChangePercent>
            </FirstContainerValueStart>
            <FirstContainerValueEnd>
            <ExcButton>
                <ExcImg src={ExcIcon}>
                </ExcImg>
                <ExcMsg src={HiddenMessage} />
            </ExcButton>

            <EContainer style={{width: "4px"}}></EContainer>
            <ChartContainerMDD>MDD</ChartContainerMDD>
            <EContainer style={{width: "4px"}}></EContainer>
            <ChartContainerMDDSplit>:</ChartContainerMDDSplit>
            <EContainer style={{width: "4px"}}></EContainer>
            <ChartContainerMDDValue style={{color: mdd_value < 5 ? "#0FB63E" : "#FF395D"}}>{mdd_value}</ChartContainerMDDValue>
            <EContainer style={{width: '4px'}}></EContainer>
            </FirstContainerValueEnd>
            </FirstContainerValue>
            <EContainer style={{height: '15px'}}></EContainer>
            <LineChartContainer><LineChart balanceList={balanceList} pnlArray={pnlArray} secondPort={secondPort} thirdPort={thirdPort} selectedOption={selectedOption}></LineChart></LineChartContainer>
        </ChartContainer>
        </FirstContainer>
        </EContainer>
        <EContainer style={{height: '52px'}}></EContainer>
        <AssetContainer>
        {account != null ? <MainWalletX></MainWalletX> : <AssetConnected initialValue={initialValue} mdd_value={mdd_value} my_margin={my_margin} my_margin_rate={my_margin_rate} my_balance={my_balance} start_date={start_date} end_date={end_date}></AssetConnected>}
        </AssetContainer>
        <EContainer style={{height: '72px'}}></EContainer>
        </ContainerAll>
    );
}

/*<EContainer style={{display:'flex', justifyContent: 'flex-start', width: '95%', maxWidth: '700px', position: 'relative', alignSelf: 'center', position: 'relative'}}>
            <DropDown></DropDown>
        </EContainer>*/
export default MainTest;