import Header from "../../common/header";
import MainTest from "./component/mainTest";
import Main from "../mainPage/component/main";
import Footer from "./component/footer";
import React, { useState, useEffect } from "react";


function mainPage() {
    return (
        <>
    <Header></Header>
    <MainTest></MainTest>
    <Footer></Footer>
    </>);
}

export default mainPage;