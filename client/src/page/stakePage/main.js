 import styled from "styled-components";
 import { useState } from "react";
 import Choose from "./choose";
 import Stake from "./stake";

const Background = styled.div`
background-color: #1B1A1E;
height: 100%;
`;

function Main() {
    const [count, setCount] = useState(null);
    return (
        <Background>
            {count === null ? <Choose setCount={setCount} /> : <Stake setCount={setCount}/>}
        </Background>
    );
}

export default Main;