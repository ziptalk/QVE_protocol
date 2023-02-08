import styled from "styled-components";
import React, { useState, useEffect } from "react";
import pleaseConnectYourWallet from "../../../assets/PleaseConnectYourWallet.png"
import PreWalletImg from "../../../assets/PreWalletImg.png";
import Web3 from "web3";
import XImg from "../../../assets/X_Icon.png";
import MetamaskImg from "../../../assets/Metamask.png";
import DepositArtifact from "../../../artifact/Deposit.json";
import UsdtArtifact from "../../../artifact/Usdt.json";

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

function MainWalletX({preWalletCount, setPreWalletCount, setAccount, setStakeContract, account, stakeContract, usdtContract, setUsdtContract, liquidityContract, setLiquidityContract}) {
    const web3 = new Web3(window.ethereum);
    const depositContractAddress = "0xF1EbEC1689b771464DB6258E48E200A2367C49eB";
    const usdtAddress= "0x0220a9C442218B281Cd866D84C9194Db9fbDf673";
    const AddLiquidityAddress = "0xf8e81D47203A594245E36C48e151709F0C19fBe8";
    let Usdtcontract = null;

    async function getAccount() {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const balance = await web3.eth.getBalance(accounts[0]);
        setAccount(accounts[0]);
        localStorage.setItem("user", JSON.stringify(accounts[0]));
        const Stakecontract = new web3.eth.Contract(DepositArtifact.output.abi, depositContractAddress);
        // console.log("STAKECONTRACT", Stakecontract);
        Usdtcontract = new web3.eth.Contract(UsdtArtifact.output.abi, usdtAddress);
        //const LiquidityContract = new web3.eth.Contract(LiquidityArtifact , AddLiquidityAddress);
        setUsdtContract(Usdtcontract);
        setStakeContract(Stakecontract);
       // setLiquidityContract(LiquidityContract);
}

    /* const getAccount = async () => { 
        console.log("web3", web3);
        const getAccount = await web3.eth.getAccounts();
      const account = getAccount[0];
      console.log("account: ", account);
    }; */

   function metamask() {
    getAccount();
    setPreWalletCount(null);
   }
    
// console.log("lc in wallet",localStorage.getItem('user'))
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
        <ImageContainer src={MetamaskImg} onClick={metamask} style={{cursor:'pointer', borderRadius: '50%', width: '44px', height: '44px'}}></ImageContainer>
        MetaMask
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