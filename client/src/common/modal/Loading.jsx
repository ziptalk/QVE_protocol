import styled from "styled-components";
import { Heading3, Input } from "./common";
import LoadingSpinner from "../LoadingSpinner";

const Loading = ({ title, subtitle }) => {
  return (
    <Container>
      <LoadingWrapper>
        <LoadingSpinner />
      </LoadingWrapper>
      <EmptyBox />
      <Heading3 style={{ color: "white" }}>{title}</Heading3>
      <Input style={{ color: "#B7B8CD" }}>{subtitle}</Input>
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

export default Loading;
