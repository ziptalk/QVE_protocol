import styled from "styled-components";
import SwapImage from "../../assets/SwapImage.png";
import { useState } from "react";
import Pool from "./Pool";
import AddLiquidity from "./AddLiquidity";
const Background = styled.div`
background-color: #1B1A1E;
height: 100%;
`;

const EContainer = styled.div`

`;





const BackgroundImage = styled.img`
width: 100%;
`
function Main() {
    const [liquidityCount, setLiquidityCount] = useState(0);
    console.log(liquidityCount)
    return (
    <Background>
      <EContainer style={{height: '120px'}}></EContainer>
      {liquidityCount === 0 ? <Pool setLiquidityCount={setLiquidityCount}/> : <AddLiquidity setLiquidityCount={setLiquidityCount} />}
      <BackgroundImage src={SwapImage}></BackgroundImage>
    </Background>);

}

export default Main;