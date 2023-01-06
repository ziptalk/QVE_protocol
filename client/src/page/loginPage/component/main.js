import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../../../services/auth.service";
import styled from "styled-components";

const Title = styled.div`

position: absolute;
width: 251px;
height: 48px;
left: calc(50% - 100px/2 - 81px);
top: 227px;

font-family: 'Inter';
font-style: normal;
font-weight: 700;
font-size: 19px;
line-height: 48px;
/* identical to box height, or 253% */

text-align: center;
letter-spacing: 0.02em;

/* white */

color: #FFFFFF;
`;

const Container = styled.div`
display: flex;
flex-direction: column;
align-items: flex-end;
padding: 0px;
gap: 24px;
position: absolute;
width: 374px;
left: calc(50% - 187px);
height: 215px;
top: 323px;
`;

const NameContainer = styled.div`
width: 374px;
height: 70px;
/* Inside auto layout */

flex: none;
order: 0;
flex-grow: 0;
`;

const PasswordContainer = styled.div`
width: 374px;
height: 67px;

/* Inside auto layout */

flex: none;
order: 0;
flex-grow: 0;
`;
const SubTitle = styled.div`
position: absolute;
width: 100px;
height: 19px;
left: calc(50% - 100px/2 + 1px);
top: 265px;

/* Heading 4 */

font-family: 'Inter';
font-style: normal;
font-weight: 700;
font-size: 16px;
line-height: 19px;
text-align: center;

color: #B7B8CD;
`;
const InputName = styled.div`
position: absolute;
left: 20px;
font-size: 3px;
color: #5C5E81;
`;

const Input = styled.input`
box-sizing: border-box;
padding: 20px;
position: absolute;
height: 48px;
left: 20px;
top: 19px;
right: 20px;

/* dark/dark */

background: #2B2B34;
/* dark/outline */

border: 1px solid #5C5E81;
border-radius: 8px;

font-family: 'Inter';
font-style: normal;
font-weight: 400;
font-size: 16px;
line-height: 19px;

/* white */

color: #FFFFFF;
input[type=text]:focus {
    border: 1px solid #B7B8CD;
    border-radius: 8px;
  }

input:invalid {
    border: 1px solid #FF395D;
    border-radius: 8px;
  }
`;

const InputPassword = styled.input`
box-sizing: border-box;
padding: 20px;
position: absolute;
height: 48px;
left: 20px;
top: 86px;
right: 20px;

/* dark/dark */

background: #2B2B34;
/* dark/outline */

border: 1px solid #5C5E81;
border-radius: 8px;

font-family: 'Inter';
font-style: normal;
font-weight: 400;
font-size: 16px;
line-height: 19px;

/* white */

color: #FFFFFF;
input[type=text]:focus {
    border: 1px solid #B7B8CD;
    border-radius: 8px;
  }

input:invalid {
    border: 1px solid #FF395D;
    border-radius: 8px;
  }
`;
const Button = styled.button`
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 10px 36px;
gap: 10px;

position: absolute;
top: 155px;
right: 20px;

/* dark/primary */

background: #4A3CE8;
border-radius: 21px;

color: #FFFFFF;
`
const ErrorMsg = styled.div`
width: 83px;
height: 15px;

/* Label */

font-family: 'Inter';
font-style: normal;
font-weight: 500;
font-size: 12px;
line-height: 15px;
/* identical to box height */

background: white;

/* down */

color: #FF395D;


/* Inside auto layout */

flex: none;
order: 0;
flex-grow: 0;
`;

function Main(props) {
    // react hook에서 state 사용
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  let err = false;
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
        await authService.login(username, password).then (
            () => {
                const UserA = authService.getCurrentUser();
                console.log("User data is : ",UserA);
                navigate("/mainPage");
            },
            (error) => {
              console.log(error);
              err = true;
            }
        );
    } catch (err) {
        console.log(err);
    }
  }

    return (
        <>
        <Title>BWL Arbitrage Dashboard</Title>
        <SubTitle>for investors</SubTitle>
        <Container>
        <form onSubmit={handleLogin}>
        <NameContainer>
        <InputName></InputName>
        <Input type="text" id="id" placeholder="ID" value={username} onChange={(e) => setUsername(e.target.value)} />
        </NameContainer>
        <PasswordContainer>
        <InputName></InputName>
        <InputPassword type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </PasswordContainer>
        <Button type="submit">Log In</Button>
        
        </form>
        
        </Container>
        </>
    );
}
export default Main;