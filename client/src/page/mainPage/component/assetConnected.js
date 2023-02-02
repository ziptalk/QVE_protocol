
import { useState } from "react";
import styled from "styled-components";
import DepositImg from "../../../assets/Deposit.png";
import StakingImg from "../../../assets/Staking.png";
import LiquidityImg from "../../../assets/Liquidity.png";
import TotalLineImg from "../../../assets/TotalLine.png";
import XImg from "../../../assets/X_Icon.png";
import Favicon from "../../../assets/Favicon.png";
import { useNavigate } from "react-router-dom";
const Asset = styled.div`

/* Heading 2 */
width: 90%;
max-width: 414px;
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

const PreWalletConnectBackground = styled.div`
    width: 100%;
    height: 100%;
    backdrop-filter: blur(5px);
    position: fixed;
    left: 0; top: 0;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const TextContainer = styled.div`
font-family: 'Inter';
font-style: normal;
color: #B7B8CD;
`;

// const AssetInitialContainer = styled.div`
// height: 117px;
// width: 95vw;
// max-width: 700px;
// border-radius: 16px;
// background: #2B2B34;
// `;

// const AssetPresentContainer = styled.div`
// height: 136px;
// width: 95vw;
// max-width: 700px;
// float: center;
// background: #2B2B34;
// border-radius: 16px;
// `;
// const AssetPeriodContainer = styled.div`
// height: 117px;
// width: 95vw;
// max-width: 700px;;
// justify-content: center;
// background: #2B2B34;
// border-radius: 16px;
// `;

// const AssetEContainer = styled.div`
// display: flex;
// height: 30px;
// `;

// const Initial = styled.div`

// /* Label Emp */
// font-family: 'Inter';
// font-style: normal;
// font-weight: 700;
// font-size: 12px;
// line-height: 15px;
// /* identical to box height */
// letter-spacing: 0.02em;
// margin-left: 30px;
// /* dark/label */

// color: #B7B8CD;
// `;  

// const InitialValue = styled.div`

// font-family: 'Inter';
// font-style: normal;
// font-weight: 700;
// font-size: 23px;
// line-height: 36px;
// /* or 157% */

// align-items: center;
// text-align: right;
// letter-spacing: 0.02em;
// margin-right: 30px;
// /* dark/white */

// color: #FFFFFF;
// `

// const Present = styled.div`


// /* Label Emp */
// margin-left: 30px;
// font-family: 'Inter';
// font-style: normal;
// font-weight: 700;
// font-size: 12px;
// line-height: 15px;
// /* identical to box height */

// letter-spacing: 0.02em;

// /* dark/label */

// color: #B7B8CD;
// `;

// const PresentValue = styled.div`

// font-family: 'Inter';
// font-style: normal;
// font-weight: 700;
// font-size: 23px;
// /* or 157% */
// margin-right: 30px;
// align-items: center;
// text-align: right;

// /* dark/white */
// color: #FFFFFF;
// `;

// const PresentPercent = styled.div`


// /* Cell Bold */
// margin-right: 30px;
// font-family: 'Inter';
// font-style: normal;
// font-weight: 700;
// font-size: 14px;
// text-align: right;
// /* identical to box height */
// `;

// const PresentDescription = styled.div`

// margin-right: 30px;
// font-family: 'Inter';
// font-style: normal;
// font-weight: 700;
// font-size: 7px;
// text-align: right;

// /* dark/label */

// color: #B7B8CD;
// `;
// const Period = styled.div`


// /* Label Emp */
// margin-left: 30px;
// font-family: 'Inter';
// font-style: normal;
// font-weight: 700;
// font-size: 12px;
// line-height: 15px;
// /* identical to box height */

// letter-spacing: 0.02em;

// /* dark/label */

// color: #B7B8CD;
// `;

// const PeriodStart = styled.div`

// margin-left: 30px;
// font-family: 'Inter';
// font-style: normal;
// font-weight: 700;
// font-size: 22px;
// /* or 164% */

// align-items: center;
// letter-spacing: 0.02em;

// /* dark/white */

// color: #FFFFFF;
// `;

// const PeriodEnd = styled.div`

// margin-right: 30px;
// font-family: 'Inter';
// font-style: normal;
// font-weight: 700;
// font-size: 22px;
// /* or 164% */

// align-items: center;
// text-align: right;
// letter-spacing: 0.02em;

// /* dark/white */

// color: #FFFFFF;
// `;

// const ContainerRow = styled.div`
// display: flex;
// flex-direction: row;
// justify-content: space-between;
// `;

const DepositContainer = styled.div`
display: flex;
flex-direction: column;
width: 90vw;
max-width: 414px;
background: #2B2B34;
border-radius: 16px;
`;

const StakingRewardsContainer = styled.div`
display: flex;
flex-direction: column;
width: 90vw;
max-width: 414px;
background: #2B2B34;
border-radius: 16px;
`;

const LiquidityRewardsContainer = styled.div`
display: flex;
flex-direction: column;
width: 90vw;
max-width: 414px;
background: #2B2B34;
border-radius: 16px;
`;

const Text = styled.div`
font-family: 'Inter';
font-style: normal;
letter-spacing: 0.02em;
color: #FFFFFF;
`;

const Button = styled.button`
all: unset;
cursor: pointer;
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
gap: 10px;
background: #5C5E81;
border-radius: 16px;
font-family: 'Inter';
font-style: normal;
font-weight: 700;
font-size: 12px;
line-height: 15px;
letter-spacing: 0.02em;
color: #FFFFFF;


`;

const Image = styled.img`

`;

const Input = styled.input`
all: unset;
position: relative;
height: 57px;
width: 90%;
background: #2B2B34;
border: 1px solid #5C5E81;
border-radius: 16px;
font-family: 'Inter';
font-style: normal;
font-weight: 600;
font-size: 14px;
line-height: 17px;
color: #FFFFFF;
`;
// console.log("lc in connected",localStorage.getItem('user'))

function AssetConnected({preWalletCount, setPreWalletCount, setAccount, setStakeContract, account, stakeContract, usdtContract, setUsdtContract, liquidityContract, setLiquidityContract}) {

    const stakeContractAddress = "0xe2899bddFD890e320e643044c6b95B9B0b84157A";
    const [depositAmount, setDepositAmount] = useState(0);

    const navigate = useNavigate();

    function deposit() {
        // Approve the transfer of the specified amount of USDT from the current account to the contract
        usdtContract.methods.approve(stakeContractAddress, depositAmount).send({ from: account });
        
        // Deposit the approved amount of USDT to the contract
        stakeContract.methods.deposit(depositAmount).send({ from: account });
    
        console.log("Deposit success!");
    }
    return (
        <EContainer>
            <Asset>My Asset</Asset>
            <DepositContainer>
                <EContainer style={{height: '25px'}}></EContainer>
                <EContainer style={{display: 'flex', flexDirection: 'row', padding: '0px 25px 0px 25px', justifyContent: "space-between"}}>
                    <EContainer style={{display: 'flex', flexDirection: 'column'}}>
                        <EContainer style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                            <Image src={DepositImg} style={{width: '15px', height: '15px'}}></Image>
                            <EContainer style={{width: '3px'}}/>
                            <Text style={{fontWeight: '700', fontSize: '12px', lineHeight: '15px', color: '#B7B8CD'}}>Deposit</Text>
                        </EContainer>
                        <EContainer style={{height: '3px'}}/>
                        <Text style={{fontWeight: '700', fontSize: '18px', lineHeight: '24px', color: '#FFFFFF'}}>2,000 USDT</Text>
                    </EContainer>
                    <Button style={{width: '83px', height: '27px'}} onClick={() => setPreWalletCount(3)}>Deposit</Button>
                </EContainer>
                <EContainer style={{height: '45px'}}></EContainer>
                <EContainer style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', padding: '0px 25px 0px 25px'}}>
                    <Text style={{fontWeight: '700', fontSize: '14px', lineHeight: '17px', color: '#B7B8CD'}}>10 arbQve</Text>
                    <EContainer style={{display: 'flex', flexDirection: 'column'}}>
                        <Text style={{fontWeight: '700', fontSize: '14px', lineHeight: '17px', color: '#0FB63E'}}>+ $ 100 (↑10%)</Text>
                        <Text style={{fontWeight: '500', fontSize: '12px', lineHeight: '15px', color: '#FFFFFF', display: 'flex', justifyContent:'flex-end'}}>= $ 1,100</Text>
                    </EContainer>
                </EContainer>
                <EContainer style={{height: '25px'}}></EContainer>
                <EContainer style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', padding: '0px 25px 0px 25px'}}>
                    <Text style={{fontWeight: '700', fontSize: '14px', lineHeight: '17px', color: '#B7B8CD'}}>10 xxQve</Text>
                    <EContainer style={{display: 'flex', flexDirection: 'column'}}>
                        <Text style={{fontWeight: '700', fontSize: '14px', lineHeight: '17px', color: '#0FB63E'}}>+ $ 100 (↑10%)</Text>
                        <Text style={{fontWeight: '500', fontSize: '12px', lineHeight: '15px', color: '#FFFFFF', display: 'flex', justifyContent:'flex-end'}}>= $ 1,100</Text>
                    </EContainer>
                </EContainer>
                <EContainer style={{height: '20px'}}></EContainer>
                <EContainer style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <Image src={TotalLineImg} style={{width: '90%'}}></Image>
                </EContainer>
                <EContainer style={{height: '20px'}}></EContainer>
                <EContainer style={{display: 'flex', flexDirection: 'column', padding: '0px 30px 0px 20px', justifyContent: 'flex-end', alignItems: 'flex-end'}}>
                    <Text style={{fontWeight: '700', fontSize: '14px', lineHeight: '17px', color: '#0FB63E'}}>+ $ 200 (↑10%)</Text>
                    <Text style={{fontWeight: '500', fontSize: '12px', lineHeight: '15px', color: '#FFFFFF'}}>= $ 2,200</Text>
                </EContainer>
                <EContainer style={{height: '25px'}}/>
            </DepositContainer>

            <EContainer style={{height: '20px'}}/>
            <StakingRewardsContainer>
                <EContainer style={{height: '25px'}}></EContainer>
                <EContainer style={{display: 'flex', flexDirection: 'row', padding: '0px 25px 0px 25px', justifyContent: 'space-between'}}>
                <EContainer style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                    <Image src={StakingImg} style={{width: '15px', height: '15px'}}></Image>
                    <EContainer style={{width: '3px'}}/>
                    <Text style={{fontWeight: '700', fontSize: '12px', lineHeight: '15px', color: '#B7B8CD', padding: '5px 0px 5px 0px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>Staking Rewards</Text>
                    </EContainer>
                    <Button style={{width: '83px', height: '27px'}} onClick={() => navigate('/stakePage')}>Stake</Button>
                </EContainer>
                <EContainer style={{height: '20px'}}/>
                <EContainer style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', padding: '0px 25px 0px 25px'}}>
                    <Text style={{fontWeight: '700', fontSize: '14px', lineHeight: '17px', color: '#B7B8CD'}}>10 xxQve</Text>
                    <EContainer style={{display: 'flex', flexDirection: 'column'}}>
                        <Text style={{fontWeight: '700', fontSize: '14px', lineHeight: '17px', color: '#0FB63E'}}>+ $ 100 (↑10%)</Text>
                        <Text style={{fontWeight: '500', fontSize: '12px', lineHeight: '15px', color: '#FFFFFF', display: 'flex', justifyContent:'flex-end'}}>= $ 1,100</Text>
                    </EContainer>
                </EContainer>
                <EContainer style={{height: '25px'}}/>
            </StakingRewardsContainer>
            <EContainer style={{height: '20px'}}/>
            <LiquidityRewardsContainer>
            <EContainer style={{height: '25px'}}></EContainer>
                <EContainer style={{display: 'flex', flexDirection: 'row', padding: '0px 25px 0px 25px', justifyContent: 'space-between'}}>
                    <EContainer style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                    <Image src={LiquidityImg} style={{width: '15px', height: '15px'}}></Image>
                    <EContainer style={{width: '3px'}}/>
                    <Text style={{fontWeight: '700', fontSize: '12px', lineHeight: '15px', color: '#B7B8CD', padding: '5px 0px 5px 0px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>Liquidity Rewards</Text>
                    </EContainer>
                    <Button style={{width: '115px', height: '27px'}} onClick={() => navigate('/poolPage')}>Add Liquidity</Button>
                </EContainer>
                <EContainer style={{height: '20px'}}/>
                <EContainer style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', padding: '0px 25px 0px 25px'}}>
                    <Text style={{fontWeight: '700', fontSize: '14px', lineHeight: '17px', color: '#B7B8CD'}}>xxQVE/QVE</Text>
                    <EContainer style={{display: 'flex', flexDirection: 'column'}}>
                        <Text style={{fontWeight: '700', fontSize: '14px', lineHeight: '17px', color: '#0FB63E'}}>+ $ 100 (↑10%)</Text>
                        <Text style={{fontWeight: '500', fontSize: '12px', lineHeight: '15px', color: '#FFFFFF', display: 'flex', justifyContent:'flex-end'}}>= $ 1,100</Text>
                    </EContainer>
                </EContainer>
                <EContainer style={{height: '25px'}}/>
                <PreWalletConnectBackground style={{visibility : preWalletCount === 3 ? "visible" : "hidden"}}>
        <DepositContainer>
        <EContainer style={{height: '39px'}}></EContainer>
        <EContainer style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'flex-end'}}>
        <Image src={XImg} style={{width: '19px', height: '19px', cursor: 'pointer', paddingRight: '30px'}} onClick={() => {setPreWalletCount(null)}}></Image>
        </EContainer>
        <EContainer style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignContent: 'center'}}>
        <Image src={Favicon} style={{width: '45px', height: '40px'}}></Image>
        </EContainer>
        <EContainer style={{height: '8px'}}></EContainer>
        <EContainer style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{fontWeight: '700', fontSize: '12px', lineHeight: '15px'}}>Deposit.QVE</Text>
        </EContainer>
        <EContainer style={{height: '5px'}}></EContainer>
        <EContainer style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{fontWeight: '500', fontSize: '12px', lineHeight: '15px'}}>Ethereum</Text>
        </EContainer>
        <EContainer style={{height: '38px'}}></EContainer>
        <EContainer style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{fontWeight: '700', fontSize: '36px', lineHeight: '48px'}}>0.01 ETH</Text>
        </EContainer>
        <EContainer style={{height: '18px'}}></EContainer>
        <EContainer style={{display:'flex', justifyContent:'center'}}>
        <Input onChange={(e) => setDepositAmount(e.target.value)}>
        </Input>
        </EContainer>
        <EContainer style={{height: '30px'}}></EContainer>
        <EContainer style={{display: 'flex', justifyContent:'center', alignItems:'center'}}>
        <EContainer style={{display: 'flex', flexDirection: 'row', width: '90%', justifyContent: 'space-between'}}>
        <TextContainer style={{fontWeight: '400', fontSize: '11px', lineHeight:'13px'}}>You will receive</TextContainer>
        <TextContainer style={{fontWeight: '700', fontSize: '12px', lineHeight:'15px'}}>{depositAmount} MATIC</TextContainer>
        </EContainer>
        </EContainer>
        <EContainer style={{height: '10px'}}></EContainer>
        <EContainer style={{display: 'flex', justifyContent:'center', alignItems:'center'}}>
        <EContainer style={{display: 'flex', flexDirection: 'row', width: '90%', justifyContent: 'space-between'}}>
        <TextContainer style={{fontWeight: '400', fontSize: '11px', lineHeight:'13px'}}>Exchange rate</TextContainer>
        <TextContainer style={{fontWeight: '700', fontSize: '12px', lineHeight:'15px'}}>1st MATIC = 1.2345 MATIC</TextContainer>
        </EContainer>
        </EContainer>
        <EContainer style={{height: '53px'}}></EContainer>
        <EContainer style={{display: 'flex', justifyContent:'center', alignItems:'center'}}>
        <EContainer style={{display: 'flex', flexDirection: 'row', width: '90%', justifyContent: 'space-between'}}>
        <Button onClick={() => {setPreWalletCount(null)}} style={{width: '152px', height: '55px', background: '#5C5E81'}}>Cancel</Button>
        <Button onClick={() => deposit()} style={{width: '152px', height: '55px', background: '#4A3CE8'}}>Deposit</Button>
        </EContainer>
        </EContainer>
        </DepositContainer>
        </PreWalletConnectBackground>
            </LiquidityRewardsContainer>
        
        </EContainer>
    );

}

export default AssetConnected;

/*
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
*/