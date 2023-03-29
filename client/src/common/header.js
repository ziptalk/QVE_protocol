import styled from "styled-components";
import logo from "../assets/img/logo.png";
import Navbar from "../page/mainPage/component/navbar";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useOutsideClick } from "../hooks/useOutsideClick";
import { WalletSelector } from "@aptos-labs/wallet-adapter-ant-design";
import { useWallet } from "@aptos-labs/wallet-adapter-react";

const HeaderContainer = styled.div`
  position: relative;
  padding: 20px;
  display: flex;
  flex-direction: row;
  background-color: #292932;
`;
const Logo = styled.img`
  display: flex;
  height: 42px;
  margin-top: 2px;
`;
const Menu = styled.div`
  margin-left: auto;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

function Header() {
  const { connected, disconnect, account } = useWallet();

  const navigate = useNavigate();
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useOutsideClick(ref, false);
  let walletAddressRef = useRef("");

  if (account && walletAddressRef.current !== account.address) {
    localStorage.setItem("user", account.address);
    localStorage.setItem("publicKey", account.publicKey);
  }

  return (
    <HeaderContainer>
      <Logo src={logo} onClick={() => navigate("/")}></Logo>
      <Menu ref={ref}>
        {/* <WalletSelector />
        <button
          className={`bg-blue-500  text-white font-bold py-2 px-4 rounded mr-4 ${
            !connected ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
          }`}
          onClick={disconnect}
          disabled={!connected}
          style={{
            marginLeft: "10px",
            display: connected ? "inline" : "none",
            background: "coral",
          }}
        >
          Disconnect
        </button> */}
        <Navbar isOpen={isOpen} setIsOpen={setIsOpen} />
      </Menu>
    </HeaderContainer>
  );
}

export default Header;
