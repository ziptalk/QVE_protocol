import { useState } from "react";
import styled from "styled-components";
import {
  Body,
  Heading1,
  DescriptionBox,
  Description,
  Label,
  CustomButton,
} from "./common";
import CustomInputBox from "./CustomInputBox";

const ConfirmDeposit = ({ token, values, setValues, onEnd }) => {
  const [focused, setFocused] = useState(false);
  return (
    <Container>
      <Heading1 style={{ color: "white" }}>
        <Heading1 style={{ color: focused ? "#5C5E81" : "white" }}>
          {values.input * values.rate}
        </Heading1>{" "}
        mQVE
      </Heading1>
      <CustomInputBox
        token={token}
        values={values}
        setValues={setValues}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
      <DescriptionBox>
        <Description>
          <Body style={{ color: "#B7B8CD" }}>Exchange rate</Body>
          <Label style={{ color: "#B7B8CD", fontWeight: 700 }}>
            1 APT = {values.rate} mQVE
          </Label>
        </Description>
        <Description>
          <Body style={{ color: "#B7B8CD" }}>Protocol fee</Body>
          <Label style={{ color: "#B7B8CD", fontWeight: 700 }}>0.2%</Label>
        </Description>
        <Description>
          <Body style={{ color: "#B7B8CD" }}>Network fee</Body>
          <Label style={{ color: "#B7B8CD", fontWeight: 700 }}>~$0.00</Label>
        </Description>
      </DescriptionBox>
      <CustomButton
        onClick={() => (Number(values.input) > 0 ? onEnd() : null)}
        style={{
          backgroundColor: Number(values.input) > 0 ? "#4a3ce8" : "#5C5E81",
          color: Number(values.input) > 0 ? "white" : "#B7B8CD",
        }}
      >
        {Number(values.input) > 0 ? "Confirm Deposit" : "Enter an Amount"}
      </CustomButton>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 5px;
`;

export default ConfirmDeposit;
