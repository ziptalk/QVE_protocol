import styled from "styled-components";
import LineChart from "./Chart";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ExcIcon from "../../../assets/Subtract.png";
import axios from "axios";
import HiddenMessage from "../../../assets/hiddenMessage.png";
import MainWalletXPetra from "./mainWalletXPetra";
import MainWalletX from "./mainWalletX";
import AssetConnected from "./assetConnected";
import logoImg from '../../../assets/logo.png';

const ContainerAll = styled.div`
height: 100%;
z-index: -1;
background-color: #1B1A1E;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;;
`;

const EContainer = styled.div`
`;

const FirstContainer = styled.div`
width: 90%;
max-width: 414px;
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

const Image = styled.img`

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
width: 90%;
max-width: 414px;
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

const Text = styled.div`
font-family: 'Montserrat';
font-style: normal;
font-weight: 700;
font-size: 24px;
line-height: 30px;
/* or 125% */

text-align: center;
letter-spacing: 0.02em;

/* dark/white */

color: #FFFFFF;
`;

function MainTest() {
    
    /* const [userMe, setUserMe] = useState(''); */
    const [balanceList, setBalanceList] = useState('');
    /* const [myBalance, setMyBalance] = useState(''); */
    const [mdd, setMdd] = useState('');
    const [pnl, setPnl] = useState('');
    const [portfolio, setPortfolio] = useState('');
    const [excMsg, setExcMsg] = useState(0);
    const [secondPort, setSecondPort] = useState('');
    const [thirdPort, setThirdPort] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState('Arbitrage');
    const totalInitialInvestment = 79300;
    const options = ["Arbitrage", "BTC Hedge", "Funding Rate"];
    const [account, setAccount] = useState();
    const[stakeContract, setStakeContract] = useState(null);
    const[usdtContract, setUsdtContract] = useState(null);
    const[liquidityContract, setLiquidityContract] = useState(null);
    const [preWalletCount, setPreWalletCount] = useState(null);
    const [aptosBalance, setAptosBalance] = useState(null);

const toggling = () => setIsOpen(!isOpen);
const onOptionClicked = value => () => {
  setSelectedOption(value);
  setIsOpen(false);
  pnlArray = [];
};




/* const fetchUserMe = async () => {
    axios.get('https://qve.today/user/me/')
    .then(res => {
        setUserMe(res.data);
        
    })
} */
const fetchBalanceList = async () => {
    axios.get('https://qve.today/balance/get/')
    .then(res => {
        setBalanceList(res.data);
    })
}
/* const fetchMyBalance = async () => {
    axios.get('https://qve.today/user/mybalance/')
    .then(res => {
        setMyBalance(res.data);
    })
} */
const fetchMdd = async () => {
    axios.get('https://qve.today/balance/getmdd')
    .then(res => {
        setMdd(res.data);
    })
}
const fetchPnl = async () => {
    axios.get('https://qve.today/balance/getpnl')
    .then(res => {
        setPnl(res.data);
    })
}
const fetchSecond = async () => {
    axios.get('https://qve.today/portfolios/eth-btc-hedge-volatility/')
    .then(res => {
        setSecondPort(res.data);
    })
}

const fetchThird = async () => {
    axios.get('https://qve.today/portfolios/fundingfee-trading/')
    .then(res => {
        setThirdPort(res.data);
    })
}

    useEffect(() => {
         Promise.all([
            /* fetchUserMe(), */
            fetchBalanceList(),
            /* fetchMyBalance(), */
            fetchMdd(),
            fetchPnl(),
            fetchSecond(),
            fetchThird()]
            ) 
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
    let second_max_mdd = 0;
    let third_max_mdd = 0;
    for (let i = 0; i < balanceList.length; i++) {
        let valueBalance = getKeyByValue(balanceList[i], "balance");
        balanceArray.push(valueBalance.toFixed(0));
    }
    /* const initialValue = getKeyByValue(userMe, "initial_investment");
    const start_date = getKeyByValue(userMe, "start_date");
    const end_date = getKeyByValue(userMe, "end_date"); */
    /* let my_balance = (getKeyByValue(myBalance, "my_balance"));
    let my_margin = (getKeyByValue(myBalance, "my_margin"));
    let my_margin_rate = (getKeyByValue(myBalance, "my_margin_rate")); */
    let mdd_value;
    let pnl_value = getKeyByValue(pnl, "pnl");
    let pnl_24h_gap = getKeyByValue(pnl, "pnl_24h_gap");
    for (let i = 0; i < secondPort.length; i++) {
        let secondPort_cr = getKeyByValue(secondPort[i], "cr");
        secondPort_cr = (secondPort_cr - 1) * 100;
        let secondPort_mdd = getKeyByValue(secondPort[i], "mdd");
        secondPort_cr_Array.push(secondPort_cr);
        secondPort_mdd_Array.push(secondPort_mdd);
        if (secondPort_mdd > second_max_mdd) {
            second_max_mdd = secondPort_mdd;
        }
    }
    for (let i = 0; i < thirdPort.length; i++) {
        let thirdPort_cr = getKeyByValue(thirdPort[i], "cr");
        thirdPort_cr = (thirdPort_cr - 1) * 100;
        let thirdPort_mdd = getKeyByValue(thirdPort[i], "mdd");
        thirdPort_cr_Array.push(thirdPort_cr);
        thirdPort_mdd_Array.push(thirdPort_mdd);
        if (thirdPort_mdd > third_max_mdd) {
            third_max_mdd = thirdPort_mdd;
        }
    }

    if (selectedOption === 'Arbitrage') {
    for (let i = 0; i < balanceArray.length; i++) {
        var pnlValue = (balanceArray[i] - totalInitialInvestment) / totalInitialInvestment;
        pnlArray.push((pnlValue * 100).toFixed(2));
    }
} else if (selectedOption === 'BTC Hedge') {
    for (let i = 0; i < secondPort.length; i++) {
        pnlArray.push((secondPort_cr_Array[i]));
    } 
} else if (selectedOption === 'Funding Rate') {
    for (let i = 0; i < thirdPort.length; i++) {
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

    if (selectedOption === 'Arbitrage') {
        mdd_value = getKeyByValue(mdd, "mdd");
    }
    else if (selectedOption === 'BTC Hedge') {
        mdd_value = second_max_mdd;
    }
    else if (selectedOption === 'Funding Rate') {
        mdd_value = third_max_mdd;
    }
    mdd_value = Math.abs(mdd_value);
    
    const currentPnl = pnlArray.at(-1);
    /* if (my_balance !== undefined) {
        my_balance = my_balance.toFixed(2);
        my_margin = my_margin.toFixed(2);
        my_margin_rate = my_margin_rate.toFixed(2);
    } */

    if (pnl_value != undefined) {
        pnl_value = pnl_value.toFixed(2);
        pnl_24h_gap = pnl_24h_gap.toFixed(2);
    }

    if (mdd_value != undefined) {
        mdd_value = mdd_value.toFixed(2);
    }
    /* console.log("localStorage is ",localStorage.getItem('user')); */
    /* console.log('pnlArray Length', pnlArray.length);
    console.log('secondPort', secondPort.length);
    console.log('selectedOption', selectedOption); */
    /* console.log(secondPort);
    */

    if (balanceList == '') { 
        /* function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}
sleep(3000); */
        return (
            <EContainer style={{height: '100vh', background: '#1B1A1E', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
            <Image src={logoImg} style={{height: '15%', width: '15%'}}></Image>
            <Text style={{justifyContent: 'center', alignItems: 'center'}}>Loading...</Text>
            </EContainer>
        )
    } else {
    return(
        /* <ContainerAll style={{filter: preWalletCount != null ? "blur(1px)" : "blur(0px)"}}> */
        <ContainerAll style={{filter: preWalletCount != null ? "blur(0px)" : "blur(0px)"}}>
        <EContainer style={{height: "105px"}}></EContainer>
        <StrategyContainer>Strategy Selector</StrategyContainer>
        <EContainer style={{height: '20px'}}></EContainer>
        <EContainer style={{display: 'flex', flexDirection: 'row', width: '90%', maxWidth: '414px', justifyContent: 'flex-end'}}>
        {localStorage.getItem('user') === null ? <DepositButton onClick={() => setPreWalletCount(1)}>Deposit</DepositButton> : <DepositButton onClick={() => setPreWalletCount(3)}>Deposit</DepositButton>}
        </EContainer>
        <EContainer style={{height: '10px'}}/>
        <EContainer style={{width: '100%', display: 'flex', justifyContent: 'center'}}>
        <FirstContainer>
        <EContainer style={{height: '12px'}}></EContainer>
        <ChartContainer> 
        <EContainer style={{position: 'absolute', top: '107px'}}>
        <EContainer style={{height: '20px'}}></EContainer>
      <DropDownContainer>
        <DropDownHeader onClick={toggling}>
          {selectedOption || "Arbitrage"}
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
            <ChartContainerMDDValue style={{color: '#FFFFFF'}}>{mdd_value}</ChartContainerMDDValue>
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
        {localStorage.getItem('user') === null || localStorage.getItem('user') === 'undefined' ? <MainWalletX setAptosBalance={setAptosBalance} liquidityContract={liquidityContract} setLiquidityContract={setLiquidityContract} account={account} usdtContract={usdtContract} setUsdtContract={setUsdtContract} stakeContract={stakeContract} setStakeContract={setStakeContract} preWalletCount={preWalletCount} setPreWalletCount={setPreWalletCount} setAccount={setAccount}></MainWalletX> : <AssetConnected account={account} setStakeContract={setStakeContract} preWalletCount={preWalletCount} setPreWalletCount={setPreWalletCount} stakeContract={stakeContract} usdtContract={usdtContract} setUsdtContract={setUsdtContract} setAccount={setAccount} aptosBalance={aptosBalance}></AssetConnected>}
        </AssetContainer>
        <EContainer style={{height: '72px'}}></EContainer>
        </ContainerAll>
    );
              }
}

/*<EContainer style={{display:'flex', justifyContent: 'flex-start', width: '95%', maxWidth: '700px', position: 'relative', alignSelf: 'center', position: 'relative'}}>
            <DropDown></DropDown>
        </EContainer>*/
export default MainTest;