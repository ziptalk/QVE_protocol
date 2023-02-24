import Header from "../../common/header";
import MainTest from "./component/mainTest";
import Main from "../mainPage/component/main";
import Footer from "../../common/footer";
import GoToTop from "../../common/GotoTop";
import React, { useState, useEffect } from "react";
import MainWalletX from "./component/mainWalletX";
import styled from "styled-components";

const Container = styled.div`
overflow: hidden;
`;
function MainPage({selectedOption, setSelectedOption}) {
    return (
    <Container>
    <Header></Header>
    <MainTest selectedOption={selectedOption} setSelectedOption={setSelectedOption}></MainTest>
    <Footer></Footer>
    <GoToTop />
    </Container>);
}

export default MainPage;