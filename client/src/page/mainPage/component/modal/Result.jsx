import styled from "styled-components";
import Check from "../../../../assets/img/check.svg";
import xMark from "../../../../assets/img/xmark.svg";
import Deposit2 from "../../../../assets/img/Deposit2.svg";
import { Heading3, Input } from "./common";
import LoadingSpinner from "../../../../common/LoadingSpinner";

const Result = ({ loading, err }) => {
  return (
    <Container>
      {loading ? (
        <>
          <LoadingWrapper>
            <LoadingSpinner />
          </LoadingWrapper>
          <div style={{ width: 33, height: 33 }} />
        </>
      ) : // <Logo src={err ? xMark : Check} />
      err ? (
        <FailureIcon src={xMark} />
      ) : (
        <Logo src={Check} />
      )}
      <Heading3 style={{ color: "white" }}>
        {loading
          ? "Transaction Loading..."
          : err
          ? "Transaction Failed"
          : "Transaction Successfull"}
      </Heading3>
      <LinkLine>
        <Input>
          {loading
            ? "Wait Please"
            : err
            ? "Try Again Please!"
            : "View Explorerr"}
        </Input>
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
  padding-bottom: 15px;
  position: relative;
`;

const LoadingWrapper = styled.div`
  position: absolute;
  top: -18px;
  left: 50%;
  transform: translate(-50%, 0%);
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

const FailureIcon = styled.img`
  width: 25px;
  height: 25px;
`;

export default Result;
