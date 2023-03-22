import styled from "styled-components";
import Check from "../../../../assets/img/check.svg";
import Deposit from "../../../../assets/img/Deposit.svg";
import { Heading3, Input } from "./common";

const Result = () => {
  return (
    <Container>
      <Logo src={Check} />
      <Heading3 style={{ color: "white" }}>Transaction Successfull</Heading3>
      <span style={{ color: "#5C5E81", cursor: "pointer" }}>
        <Input>View Explorerr</Input>
        <img src={Deposit} />
      </span>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;

const Logo = styled.img`
  width: 33px;
  height: 33px;
`;

export default Result;
