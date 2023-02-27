import Header from "../../common/header";
import Main from "./component/main";
import Footer from "../../common/footer";
import GoToTop from "../../common/GotoTop";
import React, { useState, useEffect } from "react";
import MainWalletX from "./component/mainWalletX";
import styled from "styled-components";

const Container = styled.div`
  overflow: hidden;
`;
function MainPage({ selectedOption, setSelectedOption }) {
  return (
    <Container>
      <Header></Header>
      <Main
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
      ></Main>
      <Footer></Footer>
      <GoToTop />
    </Container>
  );
}

export default MainPage;
