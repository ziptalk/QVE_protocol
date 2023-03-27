import styled from "styled-components";
import logo from "../assets/img/logo.png";
import menu from "../assets/img/Menu.png";
import Navbar from "../page/mainPage/component/navbar";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useOutsideClick } from "../hooks/useOutsideClick";
const HeaderContainer = styled.div`
  position: fixed;
  background-color: #292932;
  height: 77px;
  top: 0;
  left: 0;
  right: 0;
  z-index: 99;
`;

const Logo = styled.img`
  position: fixed;
  left: 20px;
  top: 25px;
  bottom: 23.5;
  cursor: pointer;
  width: 75px;
  height: 30px;
  flex: none;
  order: 0;
  flex-grow: 0;
`;

const Menu = styled.div`
  position: fixed;
  top: 31px;
  bottom: 23.5;
  right: 20px;
  width: 24px;
  height: 24px;
  flex: none;
  order: 1;
  flex-grow: 0;
`;

const EContainer = styled.div``;

function Header() {
  const navigate = useNavigate();
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useOutsideClick(ref, false);

  return (
    <HeaderContainer>
      <Logo src={logo} onClick={() => navigate("/")}></Logo>
      <Menu ref={ref}>
        <Navbar isOpen={isOpen} setIsOpen={setIsOpen} />
      </Menu>
    </HeaderContainer>
  );
}

export default Header;
