import { Route, BrowserRouter, Routes } from "react-router-dom";

import React, { useState, useEffect } from "react";
import Mainpage from "./page/mainPage";
import styled from "styled-components";
import Loginpage from "./page/loginPage";
import authService from "./services/auth.service";
import axios from "axios";
import MainTest from "./page/mainPage/component/mainTest";
import Main from "./page/mainPage/component/main";

const Background = styled.div`
  
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
