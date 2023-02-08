import Header from "../../common/header";
import MainTest from "./component/mainTest";
import Main from "../mainPage/component/main";
import Footer from "../../common/footer";
import React, { useState, useEffect } from "react";
import MainWalletX from "./component/mainWalletX";
import styled from "styled-components";

const Container = styled.div`
overflow: hidden;
`;
function MainPage() {
    return (
    <Container>
    <Header></Header>
    <MainTest></MainTest>
    <Footer></Footer>
    </Container>);
}

export default MainPage;