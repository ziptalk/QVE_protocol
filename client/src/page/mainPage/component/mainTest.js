import styled from "styled-components";
import LineChart from "./Chart";
import React, { useState, useEffect } from "react";
import { ReactDOM } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";

const ContainerAll = styled.div`
height: 100%;
background-color: #202025;
display: flex;
flex-direction: column;
`;

const EContainer = styled.div`
`;

const FirstContainer = styled.div`
width: 95%;
max-width: 700px;

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
width: 374px;
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
font-size: 32px;
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
width: 374px;
border-radius: 16px;
background: #2B2B34;
`;

const AssetPresentContainer = styled.div`
height: 136px;
width: 374px;
float: center;
background: #2B2B34;
border-radius: 16px;
`;
const AssetPeriodContainer = styled.div`
height: 117px;
width: 374px;
justify-content: center;
background: #2B2B34;
border-radius: 16px;
`;

const AssetEContainer = styled.div`
display: flex;
height: 30px;
`;

const ExcImg = styled.img`
position: absolute;
width: 12px;
height: 12px;
left: 259px;
top: 68px;

`;

const LineChartContainer = styled.div`
width: 100%;
height: max-content;
float: 'center'
`;

const AssetContainer = styled.div`
display: flex;
flex-direction: column;
align-items: center;
`;

const ContainerRow = styled.div`
display: flex;
flex-direction: row;
justify-content: space-between;
`;
function MainTest() {
    
    const [userMe, setUserMe] = useState('');
    const [balanceList, setBalanceList] = useState('');
    const [myBalance, setMyBalance] = useState('');
    const [mdd, setMdd] = useState('');
    const [pnl, setPnl] = useState('');
    const totalInitialInvestment = 79300;

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
    return(
        <>
        <ContainerAll>
        <LogoutButton onClickCapture={logout}>Logout</LogoutButton>
        <EContainer style={{height: "92px"}}></EContainer>
        <EContainer style={{width: '100%', display: 'flex', justifyContent: 'center'}}>
        <FirstContainer>
        <Overview>Overview</Overview> 
        <ChartContainer>   
            <ChartContainerPNL>PNL</ChartContainerPNL>
            <FirstContainerValue>
            <FirstContainerValueStart>
            <ChartContainerPercent>{currentPnl}%</ChartContainerPercent>
            <EContainer style={{width: '5px'}}></EContainer>
            <PnlChangePercent style={{color: pnl_24h_gap > 0 ? "#0FB63E" : "#FF395D"}}>{pnl_24h_gap}%p</PnlChangePercent>
            </FirstContainerValueStart>
            <FirstContainerValueEnd>
            <ChartContainerMDD>MDD</ChartContainerMDD>
            <EContainer style={{width: "4px"}}></EContainer>
            <ChartContainerMDDSplit>:</ChartContainerMDDSplit>
            <EContainer style={{width: "4px"}}></EContainer>
            <ChartContainerMDDValue style={{color: mdd_value < 5 ? "#0FB63E" : "#FF395D"}}>{mdd_value}</ChartContainerMDDValue>
            </FirstContainerValueEnd>
            </FirstContainerValue>
            <EContainer style={{height: '15px'}}></EContainer>
            <LineChartContainer><LineChart balanceList={balanceList} pnlArray={pnlArray}></LineChart></LineChartContainer>
        </ChartContainer>
        </FirstContainer>
        </EContainer>
        <EContainer style={{height: '52px'}}></EContainer>
        <AssetContainer>
        <Asset>My Asset</Asset>
        <AssetInitialContainer>
            <EContainer style={{height: '30px'}}></EContainer>
            <Initial>Initial</Initial>
            <EContainer style={{height: '28px'}}></EContainer>
            <InitialValue>{initialValue} USDT</InitialValue>
        </AssetInitialContainer>
        <AssetEContainer></AssetEContainer>
        <AssetPresentContainer>
            <EContainer style={{height: '30px'}}></EContainer>
            <Present>Present</Present>
            <PresentPercent style={{color: mdd_value > 0 ? "#0FB63E" : "#FF395D"}}>{my_margin} ({my_margin_rate}%)</PresentPercent>
            <PresentValue>{my_balance} USDT</PresentValue>
            <PresentDescription>수익은 성과보수를 포함한 값이며 환매 시 계약한 성과보수를 제하게 됩니다.</PresentDescription>
        </AssetPresentContainer>
        <AssetEContainer></AssetEContainer>
        <AssetPeriodContainer>  
            <EContainer style={{height: '30px'}}></EContainer>
            <Period>Period</Period>
            <EContainer style={{height: '20px'}}></EContainer>
            <ContainerRow>
            <PeriodStart>{start_date}</PeriodStart>
            <PeriodEnd>{end_date}</PeriodEnd>
            </ContainerRow>
        </AssetPeriodContainer>
        </AssetContainer>
        <EContainer style={{height: '72px'}}></EContainer>
        </ContainerAll>
        </>
    );
}

export default MainTest;