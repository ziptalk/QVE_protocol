import Header from "../../common/header";
import MainTest from "./component/mainTest";
import Main from "../mainPage/component/main";
import Footer from "./component/footer";
import React, { useState, useEffect } from "react";
import MainWalletX from "./component/mainWalletX";


function mainPage() {
    return (
        <>
    <Header></Header>
    <MainWalletX></MainWalletX>
    <Footer></Footer>
    </>);
}

export default mainPage;