import styled from "styled-components";
import Check from "../../assets/img/check.svg";
import Deposit2 from "../../assets/img/Deposit2.svg";
import { Heading3, Input } from "./common";

const Result = ({ success }) => {
  return (
    <Container>
      <Logo src={Check} />
      <Heading3 style={{ color: "white" }}>{success}</Heading3>
      <LinkLine>
        <Input>View Explorerr</Input>
        <img src={Deposit2} style={{ height: 24, width: "auto" }} />
      </LinkLine>
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

const LinkLine = styled.span`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  color: #5c5e81;
  cursor: pointer;
`;

export default Result;
