import styled from "styled-components";
import SwapImage from "../../assets/img/SwapImage.png";
import { useState } from "react";
import Pool from "./Pool";
import AddLiquidity from "./AddLiquidity";
const Background = styled.div`
  background-color: #1b1a1e;
  height: 180%;
`;

const EContainer = styled.div``;

const BackgroundImage = styled.img``;
function Main() {
  const [liquidityCount, setLiquidityCount] = useState(0);
  const [account, setAccount] = useState(null);
  // console.log(liquidityCount)
  return (
    <Background>
      <EContainer style={{ height: "45px" }}></EContainer>
      <EContainer
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {liquidityCount === 0 ? (
          <Pool setLiquidityCount={setLiquidityCount} />
        ) : (
          <AddLiquidity setLiquidityCount={setLiquidityCount} />
        )}
      </EContainer>
    </Background>
  );
}

export default Main;
