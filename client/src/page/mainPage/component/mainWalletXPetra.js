import styled from "styled-components";
import React, { useState, useEffect } from "react";
import pleaseConnectYourWallet from "../../../assets/PleaseConnectYourWallet.png"
import PreWalletImg from "../../../assets/PreWalletImg.png";
import Web3 from "web3";
import XImg from "../../../assets/X_Icon.png";
import PetraImg from "../../../assets/petraLogo.png";

const EContainer = styled.div`
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

const ConnectWalletImg = styled.img`
width: 160px;
height: 108.07px;
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

const PreWalletConnectBackground = styled.div`
    width: 100%;
    height: 100%;
    backdrop-filter: blur(5px);
    position: fixed;
    left: 0; top: 0;
    display: flex;
    align-items: center;
    justify-content: center;
`

const PreWalletConnectContainer = styled.div`
width: 294px;
height: 170px;
background: #2B2B34;
box-shadow: 8px 8px 30px rgba(0, 0, 0, 0.2);
border-radius: 16px;
filter: none !important;
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
height: 117px;
background: #3F3F46;
border-radius: 16px;
`;


const TextInter = styled.div`
font-family: 'Inter';
font-style: normal;
letter-spacing: 0.02em;
color: #FFFFFF;
`;


function MainWalletX({preWalletCount, setAptosBalance, setPreWalletCount, setAccount, setStakeContract, account, stakeContract, usdtContract, setUsdtContract, liquidityContract, setLiquidityContract}) {
    const getAptosWallet = () => {
        if ('aptos' in window) {
            return window.aptos;
        } else {
            window.open('https://petra.app/', `_blank`);
        }
    };
    if (localStorage.getItem('preWalletCount') === '1') {
    setPreWalletCount(null);
    localStorage.removeItem('preWalletCount');
}

    async function getAccount() {
        const wallet = getAptosWallet();
        try {
            await wallet.connect();

            /* console.log(response); // { address: string, address: string } */
            const account = await wallet.account();
            /* console.log(account.address); // { address: string, address: string } */
            localStorage.setItem('user', JSON.stringify(account.address));
            setAccount(account.address);
            const contractBalance = wallet.contract.getBalance('0xf2bc453c0aeb6e26e27bf2f04b5e25ee3c02dd04fa56f2fc4b5e98fac6c86a24');
            setAptosBalance(contractBalance);
        } catch (error) {
  // { code: 4001, message: "User rejected the request."}
}
}
   function petraWallet() {
    getAccount();
    setPreWalletCount(null);
   }
    return(
        
        <>
        <Asset>My Asset</Asset>
        <ConnectWalletContainer>
        <EContainer style={{height: '35px'}}></EContainer>
        <ConnectYourWalletContainer>
        <ConnectWalletImg src={pleaseConnectYourWallet}></ConnectWalletImg>
        <EContainer style={{height: '19px'}}></EContainer>
        <Button onClick={() => {setPreWalletCount(1)}} style={{width: '156px', height: '37px'}}>Connect Wallet</Button>
        <PreWalletConnectBackground style={{visibility : preWalletCount === 1 ? "visible" : "hidden"}}>
            <PreWalletConnectContainer>
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
        </PreWalletConnectBackground>
        <PreWalletConnectBackground style={{visibility : preWalletCount === 2 ? "visible" : "hidden", flexDirection: 'column'}}>
        <WalletConnectContainer>
        <EContainer style={{height: '36px'}}></EContainer>
        <WalletMarketContainer>
        <EContainer style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%'}}>
        <ConnectWallet>Connect wallet</ConnectWallet>
        <ImageContainer src={XImg} style={{width: '19px', height: '19px', cursor: 'pointer', paddingRight: '30px'}} onClick={() => {setPreWalletCount(null)}}></ImageContainer>
        </EContainer>
        <EContainer style={{height: '38px'}}></EContainer>
        <EContainer style={{width: '314px'}}>
        <WalletContainer style={{display:'flex', flexDirection: 'column', justifyContent:'center', alignItems:'center'}}>
        <ImageContainer src={PetraImg} onClick={petraWallet} style={{cursor:'pointer', borderRadius: '50%', width: '44px', height: '44px'}}></ImageContainer>
        <TextInter>Petra Wallet</TextInter>
        </WalletContainer>
        </EContainer>
        </WalletMarketContainer>
        <EContainer style={{height: '27px'}}></EContainer>
        </WalletConnectContainer>
        </PreWalletConnectBackground>
        
        </ConnectYourWalletContainer>
        </ConnectWalletContainer>
        </>
    );
}

/*<EContainer style={{display:'flex', justifyContent: 'flex-start', width: '95%', maxWidth: '700px', position: 'relative', alignSelf: 'center', position: 'relative'}}>
            <DropDown></DropDown>
        </EContainer>*/
export default MainWalletX;