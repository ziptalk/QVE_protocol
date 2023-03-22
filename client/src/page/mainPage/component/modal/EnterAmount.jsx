import styled from "styled-components";
import {
  Body,
  Logo,
  CustomButton,
  MaxButton,
  CustomInputWrapper,
  InputUpperBox,
  StartBox,
  DescriptionBox,
  Description,
  Label,
} from "./common";
import { useState, useEffect } from "react";

const EnterAmount = ({ token, onEnd, values, setValues }) => {
  const [max, setMax] = useState(false);

  const onChangeInputNumber = (e) => {
    const newInput = e.target.value;
    const newValues = {
      ...values,
      input: newInput,
    };
    setValues(newValues);
  };

  const onMax = () => {
    if (!max) {
      const newValues = {
        ...values,
        input: values.available,
      };
      setMax(true);
      setValues(newValues);
    }
  };

  useEffect(() => {
    if (values.input >= values.available) {
      const newValues = {
        ...values,
        input: values.available,
      };
      setMax(true);
      setValues(newValues);
    } else {
      setMax(false);
    }
  }, [values.input]);

  return (
    <Container>
      <CustomInputWrapper>
        <InputUpperBox>
          <StartBox>
            <Logo src={token.logo} />
            <CustomInput
              placeholder="Amout"
              value={values.input}
              onChange={onChangeInputNumber}
              type="number"
            />
          </StartBox>
          <MaxButton
            style={{ backgroundColor: max ? "#5C5E81" : "#4A3CE8" }}
            onClick={() => onMax()}
          >
            MAX
          </MaxButton>
        </InputUpperBox>
        <InputUpperBox style={{ paddingLeft: 41, marginTop: 3 }}>
          <Body style={{ color: "#B7B8CD" }}>
            {values.input ? `$${values.dolar}` : ""}
          </Body>
          <Body style={{ color: "#B7B8CD" }}>
            Available : {values.available}
          </Body>
        </InputUpperBox>
      </CustomInputWrapper>
      <CustomButton
        onClick={() => onEnd()}
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
          <Label style={{ color: "#B7B8CD", fontWeight: 700 }}>0 mQVE</Label>
        </Description>
        <Description>
          <Body style={{ color: "#B7B8CD" }}>Exchange rate</Body>
          <Label style={{ color: "#B7B8CD", fontWeight: 700 }}>
            1 APT = 1 mQVE
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

const CustomInput = styled.input`
  width: 100%;
  text-align: start;
  border: none;
  background: none;
  outline: none;
  font-size: 16px;
  font-weight: 700;
  color: white;
  padding: 0px;
  margin: 0px;

  &::placeholder {
    font-size: 14px;
    font-weight: 700;
    color: #5c5e81;
  }

  /* Chrome, Safari, Edge, Opera */
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  &[type="number"] {
    -moz-appearance: textfield;
  }
`;

export default EnterAmount;
