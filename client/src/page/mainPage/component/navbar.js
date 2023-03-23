import styled from "styled-components";
import Menu from "../../../assets/img/Menu.png";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DepositImg from "../../../assets/img/Deposit.svg";
import PortfolioImg from "../../../assets/img/PortfolioImg.svg";
import StakeImg from "../../../assets/img/Staking.svg";
import PoolImg from "../../../assets/img/Liquidity.svg";
import SwapImg from "../../../assets/img/SwapImg.svg";
import Web3 from "web3";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const options = ["Deposit", "Swap", "Pool", "Stake", "Disconnect"];
  let option = [];
  const toggling = () => setIsOpen(!isOpen);
  const web3 = new Web3(window.ethereum);
  console.log("is open iiiiii", isOpen);
  for (let i = 0; i < options.length; i++) {
    if (i === options.length - 1) {
      if (localStorage.getItem("user") == null) {
        option.push("Connect Wallet");
      } else {
        option.push("Disconnect");
      }
    } else {
      option.push(options[i]);
      // console.log('push is happening');
    }
  }
  // console.log('option is', option);

  const onOptionClicked = (value) => () => {
    setSelectedOption(value);
    setIsOpen(false);
  };

  async function Connect() {
    console.log("connnect");
    try {
      await window.aptos.connect();
      const account = await window.aptos.account();
      localStorage.setItem("user", JSON.stringify(account.address));
      window.location.reload();
    } catch (error) {
      console.log("errrrrrrrorrrrrr");
    }
  }

  const navigate = useNavigate();

  //   const getAptosWallet = () => {
  //     if ('aptos' in window) {
  //         return window.aptos;
  //     } else {
  //         window.open('https://petra.app/', `_blank`);
  //     }
  // };

  //   const wallet = getAptosWallet();

  async function PageSelected() {
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
    if (selectedOption == "Connect Wallet") {
      // localStorage.setItem('preWalletCount', JSON.stringify(9));
      Connect();
    }
    console.log("localinnavbar is ", localStorage.getItem("user"));
    if (selectedOption == "Disconnect") {
      localStorage.removeItem("user");
      window.aptos.disconnect();
      window.location.reload();
    }
    // if (selectedOption =="Connect Wallet") {

    //     // const accounts = window.ethereum.request({ method: 'eth_requestAccounts' });
    //     // localStorage.setItem("user", JSON.stringify(accounts[0]));
    // }
  }
  // console.log("Account iSSSSSSS", localStorage.getItem("user"));
  // console.log("SELECTED OPTION", selectedOption);
  useEffect(() => {
    PageSelected();
  }, [selectedOption]);

  return (
    <>
      <MenuBar src={Menu} onClick={toggling}></MenuBar>
      <EContainer style={{ height: "10px" }}></EContainer>
      {isOpen && (
        <DropDownListContainer>
          <DropDownList>
            {option.map((option, index) => (
              <ListItem onClick={onOptionClicked(option)} key={index}>
                {option === "Deposit" && (
                  <img
                    src={DepositImg}
                    style={{ width: "24px", height: "24px" }}
                  />
                )}
                {option === "Portfolios" && (
                  <img
                    src={PortfolioImg}
                    style={{ width: "24px", height: "24px" }}
                  />
                )}
                {option === "Swap" && (
                  <img
                    src={SwapImg}
                    style={{ width: "24px", height: "24px" }}
                  />
                )}
                {option === "Pool" && (
                  <img
                    src={PoolImg}
                    style={{ width: "24px", height: "24px" }}
                  />
                )}
                {option === "Stake" && (
                  <img
                    src={StakeImg}
                    style={{ width: "24px", height: "24px" }}
                  />
                )}
                {option === "Disconnect" && <Button>Disconnect</Button>}
                {option === "Connect Wallet" && (
                  <Button
                    style={{ background: "#4A3CE8", pointerEvents: "none" }}
                  >
                    Connect Wallet
                  </Button>
                )}
                <EContainer style={{ width: "5px" }} />
                <EContainer
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {option === "Disconnect"
                    ? null
                    : option === "Connect Wallet"
                    ? null
                    : option}
                </EContainer>
              </ListItem>
            ))}
          </DropDownList>
        </DropDownListContainer>
      )}
    </>
  );
}

export default Navbar;

const MenuBar = styled.img`
  width: 24px;
  height: 24px;
  cursor: pointer;
`;

const EContainer = styled.div``;

const DropDownListContainer = styled("div")`
  position: absolute;
  right: 0;
`;

const DropDownList = styled("ul")`
  box-sizing: border-box;
  color: #3faffa;
  padding: 12px;
  cursor: pointer;
  width: 210px;
  background: #2b2b34;
  box-shadow: 4px 4px 60px rgba(0, 0, 0, 0.4);
  border-radius: 16px;
  color: #b7b8cd;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
`;

const ListItem = styled("li")`
  display: flex;
  padding-left: 10px;
  width: 100%;
  height: 40px;
  left: 10px;
  font-weight: 700;
  font-size: 16px;
  line-height: 19px;
  align-items: center;
  &:hover:not(&:nth-child(5)) {
    background: #3f3f46;
    width: 100%;
  }
  border-radius: 10px;
`;

const Button = styled.button`
  all: unset;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 36px;
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
  color: #ffffff;
  background: #5c5e81;
  border-radius: 21px;
  margin-top: 3px;
`;
