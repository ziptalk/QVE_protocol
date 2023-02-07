import styled from "styled-components";
import Menu from "../../../assets/Menu.png";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DepositImg from "../../../assets/Deposit.png";
import PortfolioImg from "../../../assets/PortfolioImg.png";
import StakeImg from "../../../assets/Staking.png";
import PoolImg from "../../../assets/Liquidity.png";
import SwapImg from "../../../assets/SwapImg.png";
import Web3 from "web3";
const MenuBar = styled.img`
width: 24px;
height: 24px;
cursor: pointer;
`;

const EContainer = styled.div`

`;

const DropDownListContainer = styled("div")`
position: absolute;
right: 0;
`;

const DropDownList = styled("ul")`
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
border: 1px solid #3F3F46;
box-shadow: 4px 4px 60px rgba(0, 0, 0, 0.4);
border-radius: 16px;
color: #B7B8CD;
`;

const ListItem = styled("li")`
display: flex;
padding-left: 10px;
width: 100%;
height: 40px;
left: 10px;
font-family: 'Inter';
font-style: normal;
font-weight: 700;
font-size: 16px;
line-height: 19px;
align-items: center;
&:hover {
    background: #3F3F46;
    width: 95%;
}
border-radius: 10px;
`;

const Button = styled.button`
all:unset;
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
width: 90%;
height: 36px;
font-family: 'Inter';
font-style: normal;
font-weight: 600;
font-size: 14px;
line-height: 17px;
color: #FFFFFF;
background: #5C5E81;
border-radius: 21px;

`;

function Navbar () {

    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const options = ["Deposit", "Portfolios", "Swap", "Pool", "Stake", "Disconnect"];
    let option = [];
    const toggling = () => setIsOpen(!isOpen);
    const web3 = new Web3(window.ethereum);

    for (let i = 0; i < options.length; i++) {
        if (i === options.length - 1) {
            if (localStorage.getItem('user') == null) {
                option.push("Connect Wallet");
            } else {
                option.push("Disconnect");
            }
        } else {
        option.push(options[i]);
        console.log('push is happening');
        }
    }
    console.log('option is', option);


    const onOptionClicked = value => () => {
    setSelectedOption(value);
    setIsOpen(false);

  };

  const navigate = useNavigate();

  const getAptosWallet = () => {
    if ('aptos' in window) {
        return window.aptos;
    } else {
        window.open('https://petra.app/', `_blank`);
    }
};

  const wallet = getAptosWallet();


  function PageSelected() {
    if (selectedOption == "Deposit") {
        navigate("/mainPage");
    }
    if (selectedOption == "Portfolios") {
        navigate("/mainPage");
    }
    if (selectedOption == "Swap") {
        navigate("/swapPage");
    }
    if (selectedOption == "Pool") {
        navigate("/poolPage");
    }
    if (selectedOption == "Stake") {
        navigate("/stakePage");
    }
    if (selectedOption == 'Connect Wallet') {
      localStorage.setItem('preWalletCount', JSON.stringify(1))
    }

    if (selectedOption == "Disconnect") {
        localStorage.removeItem("user");
        window.location.reload();
        
    }
    if (selectedOption =="Connect Wallet") {
        const accounts = window.ethereum.request({ method: 'eth_requestAccounts' });
        localStorage.setItem("user", JSON.stringify(accounts[0]));
    }
  }
  console.log("Account iSSSSSSS", localStorage.getItem("user"));
  console.log("SELECTED OPTION", selectedOption);
  useEffect(() => {
    PageSelected();
  }, [selectedOption])

  
    return (
        <>
            <MenuBar src={Menu} onClick={toggling}></MenuBar>
            <EContainer style={{height: '10px'}}></EContainer>
            {isOpen && (
          <DropDownListContainer>
            <DropDownList>
            {option.map((option, index) => (
  <ListItem onClick={onOptionClicked(option)} key={index}>
    {option === 'Deposit' && <img src={DepositImg} style={{width: '15px', height: '15px'}}/>}
    {option === 'Portfolios' && <img src={PortfolioImg} style={{width: '15px', height: '15px'}}/>}
    {option === 'Swap' && <img src={SwapImg} style={{width: '15px', height: '15px'}}/>}
    {option === 'Pool' && <img src={PoolImg} style={{width: '15px', height: '15px'}}/>}
    {option === 'Stake' && <img src={StakeImg} style={{width: '15px', height: '15px'}}/>}
    {option === 'Disconnect' && <Button>Disconnect</Button>}
    {option === 'Connect Wallet' && <Button>Connect Wallet</Button>}
    <EContainer style={{width: '3px'}}/>
    <EContainer style={{height: '15px'}}>
      {option === 'Disconnect' ? null : (option === 'Connect Wallet' ? null : option)}
    </EContainer>
  </ListItem>
))}

              <EContainer style={{height: '7px'}}/>
            </DropDownList>
          </DropDownListContainer>
        )}
        </>
    );
}

export default Navbar;