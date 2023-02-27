import styled from "styled-components";
import { useState } from "react";
import Choose from "./choose";
import Stake from "./stakeQve";
import StakeArbQve from "./stakeArbQve";
import StakeQve from "./stakeQve";

const Background = styled.div`
  background-color: #1b1a1e;
  height: 100%;
`;

function Main() {
  const [count, setCount] = useState(0);
  return (
    <Background>
      {count === 0 ? (
        <Choose setCount={setCount} />
      ) : count === 1 ? (
        <StakeQve setCount={setCount} />
      ) : (
        <StakeArbQve setCount={setCount} />
      )}
    </Background>
  );
}

export default Main;
