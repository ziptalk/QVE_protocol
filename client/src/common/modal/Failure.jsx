import styled from "styled-components";
import Deposit2 from "../../assets/img/Deposit2.svg";
import { Heading3, Input } from "./common";
import xMark from "../../assets/img/xmark.svg";

const Failure = () => {
  return (
    <Container>
      <Logo src={xMark} />
      <Heading3 style={{ color: "white" }}>Transaction Failed</Heading3>
      <LinkLine>
        <Input>Try again please</Input>
        <img src={Deposit2} style={{ height: 24, width: "auto" }} />
      </LinkLine>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding-bottom: 9px;
  position: relative;
`;

const Logo = styled.img`
  width: 25px;
  height: 25px;
`;

const LinkLine = styled.span`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  color: #5c5e81;
  cursor: pointer;
`;

export default Failure;
