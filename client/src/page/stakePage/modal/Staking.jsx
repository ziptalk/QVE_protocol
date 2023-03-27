import styled from "styled-components";
import { Heading3, Input } from "./common";
import LoadingSpinner from "../../../common/LoadingSpinner";
import { useInterval } from "../../../hooks/useInterval";

const Staking = ({ setStage }) => {
  useInterval(() => {
    setStage((prev) => prev + 1);
  }, 5000);
  return (
    <Container>
      <LoadingWrapper>
        <LoadingSpinner />
      </LoadingWrapper>
      <EmptyBox />
      <Heading3 style={{ color: "white" }}>Staking Pool</Heading3>
      <Input
        style={{ color: "#B7B8CD" }}
      >{`Waiting for staking pool to be\nincluded in the block`}</Input>
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

const LoadingWrapper = styled.div`
  position: absolute;
  top: 12px;
  left: 50%;
  transform: translate(-50%, 0%);
`;

const EmptyBox = styled.div`
  width: 33px;
  height: 33px;
`;

export default Staking;
