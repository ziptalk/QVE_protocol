import styled from "styled-components";
import SwapImage from "../../assets/img/SwapImage.png";
import { useState } from "react";
import Pool from "./Pool";
import AddLiquidity from "./AddLiquidity";
const Background = styled.div`
background-color: #1B1A1E;
height: 100vh;
`;

const EContainer = styled.div`

`;

const BackgroundImage = styled.img`

`
function Main() {
    const [liquidityCount, setLiquidityCount] = useState(0);
    const [account, setAccount] = useState(null);
    // console.log(liquidityCount)
    return (
    <Background>
      <EContainer style={{height: '132px'}}></EContainer>
      <EContainer style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
      {liquidityCount === 0 ? <Pool setLiquidityCount={setLiquidityCount}/> : <AddLiquidity setLiquidityCount={setLiquidityCount} />}
      <BackgroundImage src={SwapImage} style={{width: '90%', maxWidth: '414px'}}></BackgroundImage>
      </EContainer>
      <EContainer style={{height: '50px'}}/>
    </Background>);

}

export default Main;