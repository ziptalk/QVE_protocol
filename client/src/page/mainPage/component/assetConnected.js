
import styled from "styled-components";

const Asset = styled.div`

/* Heading 2 */
width: 90%;
max-width: 700px;
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
const EContainer = styled.div`

`;

const AssetInitialContainer = styled.div`
height: 117px;
width: 100vw;
max-width: 700px;
border-radius: 16px;
background: #2B2B34;
`;

const AssetPresentContainer = styled.div`
height: 136px;
width: 100%;
max-width: 700px;
float: center;
background: #2B2B34;
border-radius: 16px;
`;
const AssetPeriodContainer = styled.div`
height: 117px;
width: 100%;
max-width: 700px;;
justify-content: center;
background: #2B2B34;
border-radius: 16px;
`;

const AssetEContainer = styled.div`
display: flex;
height: 30px;
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

const ContainerRow = styled.div`
display: flex;
flex-direction: row;
justify-content: space-between;
`;


function AssetConnected({initialValue, mdd_value, my_margin, my_margin_rate, my_balance, start_date, end_date}) {

    return (
        <EContainer>
<Asset>My Asset</Asset>
        <AssetInitialContainer>
            <EContainer style={{height: '30px'}}></EContainer>
            <Initial>Initial</Initial>
            <EContainer style={{height: '28px'}}></EContainer>
            <InitialValue>{initialValue} USDT</InitialValue>
        </AssetInitialContainer>
        <EContainer style={{height: '30px'}}></EContainer>
        <AssetPresentContainer>
            <EContainer style={{height: '30px'}}></EContainer>
            <Present>Present</Present>
            <PresentPercent style={{color: mdd_value > 0 ? "#0FB63E" : "#FF395D"}}>{my_margin} ({my_margin_rate}%)</PresentPercent>
            <PresentValue>{my_balance} USDT</PresentValue>
            <PresentDescription>수익은 성과보수를 포함한 값이며 환매 시 계약한 성과보수를 제하게 됩니다.</PresentDescription>
        </AssetPresentContainer>
        <EContainer style={{height: '30px'}}></EContainer>
        <AssetPeriodContainer>  
            <EContainer style={{height: '30px'}}></EContainer>
            <Period>Period</Period>
            <EContainer style={{height: '20px'}}></EContainer>
            <ContainerRow>
            <PeriodStart>{start_date}</PeriodStart>
            <PeriodEnd>{end_date}</PeriodEnd>
            </ContainerRow>
        </AssetPeriodContainer>
        </EContainer>
    );

}

export default AssetConnected;