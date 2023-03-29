import styled from "styled-components";
import Menu from "../../../assets/img/Menu.png";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import DepositImg from "../../../assets/img/Deposit.svg";
import PortfolioImg from "../../../assets/img/PortfolioImg.svg";
import StakeImg from "../../../assets/img/Staking.svg";
import PoolImg from "../../../assets/img/Liquidity.svg";
import SwapImg from "../../../assets/img/SwapImg.svg";

import { WalletSelector } from "@aptos-labs/wallet-adapter-ant-design";
import { useWallet } from "@aptos-labs/wallet-adapter-react";

function Navbar({ isOpen, setIsOpen }) {
  // const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const options = ["Deposit", "Swap", "Pool", "Stake"];
  const toggling = () => setIsOpen(!isOpen);
  const { disconnect, account, connected } = useWallet();
  // console.log('option is', option);

  const onOptionClicked = (value) => () => {
    setSelectedOption(value);
    setIsOpen(false);
  };

  //auto conenct 관련 함수
  let walletAddressRef = useRef("");
  if (account && walletAddressRef.current !== account.address) {
    localStorage.setItem("user", account.address);
    localStorage.setItem("publicKey", account.publicKey);
  }

  const navigate = useNavigate();

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
    if (selectedOption == "Disconnect") {
      localStorage.removeItem("user");
      // window.aptos.disconnect();
      // window.location.reload();
      disconnect();
    }
  }

  const disconnectWallet = () => {
    disconnect();
    localStorage.removeItem("user");
    localStorage.removeItem("publicKey");
  };

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
            {options.map((option, index) => (
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
                {option === "Connect Wallet" && <></>}
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
            {connected ? (
              <Button onClick={() => disconnectWallet()}>Disconnect</Button>
            ) : (
              <WalletSelector style={{ marginTop: 10 }} />
            )}
          </DropDownList>
        </DropDownListContainer>
      )}
    </>
  );
}

export default Navbar;

const MenuBar = styled.img`
  margin-left: 10px;
  width: 24px;
  height: 24px;
  cursor: pointer;
`;

const EContainer = styled.div``;

const DropDownListContainer = styled("div")`
  position: absolute;
  right: 20px;
  top: 70px;
`;

const DropDownList = styled("ul")`
  box-sizing: border-box;
  color: #3faffa;
  padding: 21px 19px 25px 19px;
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
  position: relative;
  z-index: 5;
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
  gap: 7px;
`;

const Icon = styled.img`
  width: 15px;
  height: 14px;
`;

const ButtonWrapper = styled.div`
  position: relative;
`;
