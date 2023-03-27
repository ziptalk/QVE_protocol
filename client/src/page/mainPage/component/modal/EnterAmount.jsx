import styled from "styled-components";
import {
  Body,
  CustomButton,
  DescriptionBox,
  Description,
  Label,
} from "./common";
import CustomInputBox from "./CustomInputBox";

const EnterAmount = ({ token, onEnd, values, setValues }) => {
  return (
    <Container>
      <CustomInputBox token={token} values={values} setValues={setValues} />
      <CustomButton
        onClick={() => (values.input && values.input > 0 ? onEnd() : null)}
        style={{
          backgroundColor: values.input ? "#4A3CE8" : "#5C5E81",
          transition: "all 0.2s",
        }}
      >
        Enter an Amount
      </CustomButton>
      <DescriptionBox>
        <Description>
          <Body style={{ color: "#B7B8CD" }}>You will receive</Body>
          <Label style={{ color: "#B7B8CD", fontWeight: 700 }}>
            {values.rate * values.input} mQVE
          </Label>
        </Description>
        <Description>
          <Body style={{ color: "#B7B8CD" }}>Exchange rate</Body>
          <Label style={{ color: "#B7B8CD", fontWeight: 700 }}>
            1 APT = {values.rate} mQVE
          </Label>
        </Description>
      </DescriptionBox>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

export default EnterAmount;
