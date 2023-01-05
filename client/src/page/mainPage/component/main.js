import styled from "styled-components";
import LineChart from "./Chart";
import React, { useState, useEffect } from "react";
import { ReactDOM } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";

const ContainerAll = styled.div`
z-index: 2;
`;
const LogoutButton = styled.div`
z-index: 1;
position: fixed;
right: 20px;
top: 73px;

box-sizing: border-box;

/* Auto layout */

display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 10px 36px;
gap: 10px;

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
position: absolute;
width: 116px;
height: 36px;
left: 20px;
top: 163px;

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
position: absolute;
top: 14%;
left: calc(5.35% + 105px);
width: 47px;
height: 17px;

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

flex: none;
order: 0;
flex-grow: 0;
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

display: flex;
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
display: flex;
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
position: absolute;
width: 114px;
height: 36px;
left: 0px;
top: 0px;

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

const Initial = styled.div`
position: absolute;
height: 15px;
left: 30px;
top: 30px;

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

const InitialValue = styled.div`
position: absolute;
right: 30px;
top: 73px;

font-family: 'Inter';
font-style: normal;
font-weight: 700;
font-size: 23px;
line-height: 36px;
/* or 157% */

display: flex;
align-items: center;
text-align: right;
letter-spacing: 0.02em;

/* dark/white */

color: #FFFFFF;
`
const Present = styled.div`
position: absolute;
width: 314px;
height: 15px;
left: 30px;
top: 30px;

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

const PresentValue = styled.div`
position: absolute;
right: 30px;
top: 72px;

font-family: 'Inter';
font-style: normal;
font-weight: 700;
font-size: 23px;
line-height: 36px;
/* or 157% */

display: flex;
align-items: center;
text-align: right;
letter-spacing: 0.02em;

/* dark/white */

color: #FFFFFF;
`;

const PresentPercent = styled.div`
position: absolute;
top: 55.71px;
right: 30px;

/* Cell Bold */

font-family: 'Inter';
font-style: normal;
font-weight: 700;
font-size: 14px;
line-height: 17px;
/* identical to box height */


/* up */

color: #0FB63E;
`;

const PresentDescription = styled.div`
position: absolute;
right: 30px;
top: 109px;

font-family: 'Inter';
font-style: normal;
font-weight: 700;
font-size: 7px;
line-height: 8px;
text-align: right;
letter-spacing: 0.02em;

/* dark/label */

color: #B7B8CD;
`;
const Period = styled.div`
position: absolute;
left: 30px;
top: 30px;

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

const PeriodStart = styled.div`
position: absolute;
left: 30px;
top: 58.41px;

font-family: 'Inter';
font-style: normal;
font-weight: 700;
font-size: 22px;
line-height: 36px;
/* or 164% */

display: flex;
align-items: center;
letter-spacing: 0.02em;

/* dark/white */

color: #FFFFFF;
`;

const PeriodEnd = styled.div`
position: absolute;
right: 30px;
top: 58.41px;

font-family: 'Inter';
font-style: normal;
font-weight: 700;
font-size: 22px;
line-height: 36px;
/* or 164% */

display: flex;
align-items: center;
text-align: right;
letter-spacing: 0.02em;

/* dark/white */

color: #FFFFFF;
`;
const ChartContainer = styled.div`
position: absolute;
height: 429px;
left: 5%;
right: 5%;
top: 208px;
bottom: 744px;

/* dark/dark */

background: #2B2B34;
border-radius: 16px;
`;

const ChartContainerPNL = styled.div`
position: absolute;
left: 5.35%;
right: 87.17%;
top: 6.52%;
bottom: 89.78%;

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
position: absolute;
left: 5.35%;
top: 10.49%;

/* Chart Title */

font-family: 'Inter';
font-style: normal;
font-weight: 700;
font-size: 32px;
line-height: 39px;
/* identical to box height */


/* dark/white */

color: #FFFFFF;
`;

const ChartContainerMDD = styled.div`
position: absolute;
top: 14.21%;
right: 11.49%;

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
position: absolute;
top: 14.21%;
right: 9.09%;
width: 5px;
height: 17px;

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
order: 1;
flex-grow: 0;
`;


const ChartContainerMDDValue = styled.div`
position: absolute;
top: 14.21%;
right: 6.1%;

width: 10px;
height: 17px;

/* Cell Bold */

font-family: 'Inter';
font-style: normal;
font-weight: 700;
font-size: 14px;
line-height: 17px;

/* up */

color: #FF395D;


/* Inside auto layout */

flex: none;
order: 2;
flex-grow: 0;
`;

const ChangeContainer = styled.div`
position: absolute;
width: 374px;
height: 106px;
left: 20px;
top: 782px;

/* dark/dark */

background: #2B2B34;
border-radius: 16px;
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
position: absolute;
height: 117px;
left: 0px;
right: 0px;
top: 48px;
background: #2B2B34;
border-radius: 16px;
`;

const AssetPresentContainer = styled.div`
position: absolute;
height: 140px;
left: 0px;
right: 0px;
top: 183px;
background: #2B2B34;
border-radius: 16px;
`;
const AssetPeriodContainer = styled.div`
position: absolute;
height: 117px;
left: 0px;
right: 0px;
top: 341px;
background: #2B2B34;
border-radius: 16px;
`;

const ExcImg = styled.img`
position: absolute;
width: 12px;
height: 12px;
left: 259px;
top: 68px;

`;

const LineChartContainer = styled.div`
position: absolute;
top: 125px;
left: 20px;
right: 20px;
`;

const AssetContainer = styled.div`
position: absolute;
height: 458px;
top: 697px;
bottom: 226px;
left: 5%;
right: 5%;
`;

function Main() {
    const [userMe, setUserMe] = useState('');
    const [balanceList, setBalanceList] = useState('');
    const [myBalance, setMyBalance] = useState('');
    const [mdd, setMdd] = useState('');
    const [pnl, setPnl] = useState('');
    const totalInitialInvestment = 79300;

const parsedData = JSON.parse(localStorage.getItem("user")).access_token;


const fetchUserMe = async () => {
    axios.get('https://43.206.230.159:8080/user/me/', { headers: {"Authorization" : `Bearer ${parsedData}`}})
    .then(res => {
        setUserMe(res.data);
    }, [])
}
const fetchBalanceList = async () => {
    axios.get('https://43.206.230.159:8080/balance/get/', { headers: {"Authorization" : `Bearer ${parsedData}`}})
    .then(res => {
        setBalanceList(res.data);
    }, [])
}
const fetchMyBalance = async () => {
    axios.get('https://43.206.230.159:8080/user/mybalance/', { headers: {"Authorization" : `Bearer ${parsedData}`}})
    .then(res => {
        setMyBalance(res.data);
    }, [])
}
const fetchMdd = async () => {
    axios.get('https://43.206.230.159:8080/balance/getmdd', { headers: {"Authorization" : `Bearer ${parsedData}`}})
    .then(res => {
        setMdd(res.data);
    })
}
const fetchPnl = async () => {
    axios.get('https://43.206.230.159:8080/balance/getpnl', { headers: {"Authorization" : `Bearer ${parsedData}`}})
    .then(res => {
        setPnl(res.data);
    })
}

    useEffect(() => {
            fetchUserMe();
            fetchBalanceList();
            fetchMyBalance();
            fetchMdd();
            fetchPnl();
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
    for (let i = 0; i < balanceList.length; i++) {
        let valueBalance = getKeyByValue(balanceList[i], "balance");
        balanceArray.push(valueBalance.toFixed(0));
    }
    console.log(pnl);
    let balance = getKeyByValue(balanceList, "balance");
    const initialValue = getKeyByValue(userMe, "initial_investment");
    const start_date = getKeyByValue(userMe, "start_date");
    const end_date = getKeyByValue(userMe, "end_date");
    let my_balance = (getKeyByValue(myBalance, "my_balance"));
    let my_margin = (getKeyByValue(myBalance, "my_margin"));
    let my_margin_rate = (getKeyByValue(myBalance, "my_margin_rate"));
    let mdd_value = getKeyByValue(mdd, "mdd");
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
    return(
        <ContainerAll>
        <LogoutButton onClickCapture={logout}>Logout</LogoutButton>
        <Overview>Overview</Overview>
        <ChartContainer>    
            <ChartContainerPNL>PNL</ChartContainerPNL>
            <ChartContainerPercent>{currentPnl}%</ChartContainerPercent>
            <PnlChangePercent>{pnl_24h_gap}%p</PnlChangePercent>
            <ChartContainerMDD>MDD</ChartContainerMDD>
            <ChartContainerMDDSplit>:</ChartContainerMDDSplit>
            <ChartContainerMDDValue>{mdd_value}</ChartContainerMDDValue>
            <LineChartContainer><LineChart balanceList={balanceList} pnlArray={pnlArray}></LineChart></LineChartContainer>
        </ChartContainer>
        <AssetContainer>
        <Asset>My Asset</Asset>
        <AssetInitialContainer>
            <Initial>Initial</Initial>
            <InitialValue>{initialValue} USDT</InitialValue>
        </AssetInitialContainer>
        <AssetPresentContainer>
            <Present>Present</Present>
            <PresentPercent>{my_margin}({my_margin_rate})</PresentPercent>
            <PresentValue>{my_balance} USDT</PresentValue>
            <PresentDescription>수익은 성과보수를 포함한 값이며 환매 시 계약한 성과보수를 제하게 됩니다.</PresentDescription>
        </AssetPresentContainer>
        <AssetPeriodContainer>
            <Period>Period</Period>
            <PeriodStart>{start_date}</PeriodStart>
            <PeriodEnd>{end_date}</PeriodEnd>
        </AssetPeriodContainer>
        </AssetContainer>
        </ContainerAll>
    );
}

export default Main;