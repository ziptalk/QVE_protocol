import { Route, BrowserRouter, Routes } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Mainpage from "./page/mainPage";
import styled from "styled-components";
import Loginpage from "./page/loginPage";
import authService from "./services/auth.service";
import axios from "axios";

const Background = styled.div`
  position: absolute;
  background-color: #202025;
  width: 100%;
  min-height: 190vh;
`;

function App() {
  //const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = authService.getCurrentUser();

    /*if (user) {
      setCurrentUser(user);
    }
  */}, []);

  /*
  const logOut = () => {
    authService.logout();
  }
  */

  return (
    <Background className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Loginpage />}></Route>
          <Route path="/mainPage" element={<Mainpage />}></Route>
        </Routes>
      </BrowserRouter>
    </Background>
  );
}



export default App;
