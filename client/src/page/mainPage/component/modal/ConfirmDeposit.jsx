import styled from "styled-components";
import {
  Body,
  Logo,
  MaxButton,
  StartBox,
  Heading1,
  CustomInputWrapper,
  InputUpperBox,
  Heading4,
  DescriptionBox,
  Description,
  Label,
  CustomButton,
} from "./common";

const ConfirmDeposit = ({ token, values, onEnd }) => {
  return (
    <Container>
      <Heading1 style={{ color: "white" }}>{values.mQve} mQVE</Heading1>
      <CustomInputWrapper>
        <InputUpperBox>
          <StartBox>
            <Logo src={token.logo} />
            <Heading4 style={{ color: "white" }}>{values.input}</Heading4>
          </StartBox>
          <MaxButton
            style={{
              backgroundColor:
                values.input >= values.available ? "#5C5E81" : "#4A3CE8",
            }}
          >
            MAX
          </MaxButton>
        </InputUpperBox>
        <InputUpperBox style={{ paddingLeft: 41, marginTop: 3 }}>
          <Body style={{ color: "#B7B8CD" }}>{`$${values.dolar}`}</Body>
          <Body style={{ color: "#B7B8CD" }}>
            Available : {values.available}
          </Body>
        </InputUpperBox>
      </CustomInputWrapper>
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
      <CustomButton onClick={() => onEnd()}>Confirm Deposit</CustomButton>
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
