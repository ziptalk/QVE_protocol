import styled from "styled-components";
import logo from "../assets/logo.png";
import { useState } from "react";
const HeaderContainer = styled.div`
position: fixed;
background-color: #292932;

height: 77px;
top: 0;
left: 0;
right: 0;  
z-index: 1;  
`;

const Logo = styled.img`
position: fixed;
left: 20px;
top: 25px;
bottom: 23.5;
right: 318px;

width: 75px;
height: 30px;


/* Inside auto layout */

flex: none;
order: 0;
flex-grow: 0;
`;

function Header() {
    return(<HeaderContainer>
        <Logo src={logo}></Logo>
    </HeaderContainer>);
}

export default Header;