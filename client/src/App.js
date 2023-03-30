import { Route, BrowserRouter, Routes } from "react-router-dom";
import { useState } from "react";
import MainPage from "./page/mainPage/index";
import styled from "styled-components";
import LandingPage from "./page/landingPage";
import SwapPage from "./page/swapPage";
import PoolPage from "./page/poolPage";
import StakePage from "./page/stakePage";
import "@aptos-labs/wallet-adapter-ant-design/dist/index.css";

import { AppContext } from "./contexts/AppContext";

const Background = styled.div``;

function App() {
  const [currentUser, setCurrentUser] = useState(undefined);
  const [selectedOption, setSelectedOption] = useState("Market Making");

  return (
    <AppContext>
      <Background className="App">
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={<LandingPage setSelectedOption={setSelectedOption} />}
            ></Route>
            <Route
              path="/landingPage"
              element={<LandingPage setSelectedOption={setSelectedOption} />}
            ></Route>
            <Route
              path="/swapPage"
              element={
                <SwapPage
                  currentUser={currentUser}
                  setCurrentUser={setCurrentUser}
                />
              }
            ></Route>
            <Route
              path="/poolPage"
              element={
                <PoolPage
                  currentUser={currentUser}
                  setCurrentUser={setCurrentUser}
                />
              }
            ></Route>
            <Route
              path="/mainPage"
              element={
                <MainPage
                  currentUser={currentUser}
                  setCurrentUser={setCurrentUser}
                  selectedOption={selectedOption}
                  setSelectedOption={setSelectedOption}
                />
              }
            ></Route>
            <Route
              path="stakePage"
              element={
                <StakePage
                  currentUser={currentUser}
                  setCurrentUser={setCurrentUser}
                />
              }
            ></Route>
          </Routes>
        </BrowserRouter>
      </Background>
    </AppContext>
  );
}

export default App;
