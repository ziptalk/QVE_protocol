import styled from "styled-components";
import logo from "../assets/img/logo.png";
import menu from "../assets/img/Menu.png";
import Navbar from "../page/mainPage/component/navbar";
import { useState } from "react";
const HeaderContainer = styled.div`
position: fixed;
background-color: #292932;

height: 77px;
top: 0;
left: 0;
right: 0;  
z-index: 2;
`;

const Logo = styled.img`
position: fixed;
left: 20px;
top: 25px;
bottom: 23.5;

width: 75px;
height: 30px;


/* Inside auto layout */

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


/* Inside auto layout */

flex: none;
order: 1;
flex-grow: 0;
`;

const EContainer = styled.div`

`;

function Header() {
    return(<HeaderContainer>
        <Logo src={logo}></Logo>
        <Menu>
        <Navbar/>
        </Menu>
    </HeaderContainer>);
}

export default Header;