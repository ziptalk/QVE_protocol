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
      <LoadingSpinner />
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

export default Staking;
