import styled from "styled-components";
import { Heading3, Input } from "../../page/mainPage/component/modal/common";
import LogoImg from "../../assets/img/logo.png";
import Deposit2 from "../../assets/img/Deposit2.svg";

/**
 * Petra 연동 / Metamask 설치가 되어있지 않을 때
 * 링크 이동 유도
 */
const Content = ({ content, link }) => {
  return (
    <Container>
      <Logo src={LogoImg} />
      <Heading3 style={{ color: "white" }}>{content}</Heading3>
      <LinkLine onClick={() => window.open(link)}>
        <Input>Go To Connected</Input>
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
  width: auto;
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

export default Content;
