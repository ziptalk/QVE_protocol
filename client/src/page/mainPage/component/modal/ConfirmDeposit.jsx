import { useState } from "react";
import styled from "styled-components";
import {
  Body,
  Heading1,
  DescriptionBox,
  Description,
  Label,
  CustomButton,
  LoadingBackground,
  LoadingSpinner,
  LoadingCenter,
} from "./common";
import CustomInputBox from "./CustomInputBox";
import { useInterval } from "../../../../hooks/useInterval";

const ConfirmDeposit = ({ token, values, setValues, onEnd }) => {
  const [focused, setFocused] = useState(false);
  const [loading, setLoading] = useState(false);

  const confirmDeposit = () => {
    setLoading(true);

    //Deposit 통신 구문 추가
    //아래는 임의로 시간 지연 + 로딩스피너 확인 용도
    setTimeout(() => {
      onEnd();
    }, 1500);
  };

  return (
    <Container>
      <Heading1 style={{ color: "white" }}>
        <Heading1 style={{ color: focused ? "#5C5E81" : "white" }}>
          {values.mQve}
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
            1 APT = 1 mQVE
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
      <CustomButton onClick={() => confirmDeposit()}>
        Confirm Deposit
      </CustomButton>
      {loading ? (
        <LoadingBackground>
          <LoadingSpinner />
          <LoadingCenter />
        </LoadingBackground>
      ) : (
        <></>
      )}
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
