import Header from "../../common/header";
import Main from "./component/main";
import Footer from "../../common/footer";
import GoToTop from "../../common/GotoTop";
import React, { useState, useEffect } from "react";
import MainWalletX from "./component/mainWalletX";
import styled from "styled-components";
import ModalWrapper from "./component/modal";

const Container = styled.div`
  overflow: hidden;
`;

const PreWalletConnectBackground = styled.div`
  width: 100%;
  height: 100%;
  padding-top: 77px;
  backdrop-filter: blur(5px);
  position: fixed;
  left: 0;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 50px;
  z-index: 11;
`;

function MainPage({ selectedOption, setSelectedOption }) {
  const [preWalletCount, setPreWalletCount] = useState(null);

  return (
    <Container>
      <Header></Header>
      <Main
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
        preWalletCount={preWalletCount}
        setPreWalletCount={setPreWalletCount}
      ></Main>
      <PreWalletConnectBackground
        style={{ visibility: preWalletCount === 3 ? "visible" : "hidden" }}
      >
        <ModalWrapper setPreWalletCount={setPreWalletCount} />
      </PreWalletConnectBackground>
      <Footer></Footer>
      <GoToTop />
    </Container>
  );
}

export default MainPage;
