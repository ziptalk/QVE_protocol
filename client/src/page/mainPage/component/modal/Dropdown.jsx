import styled from "styled-components";
import ArrowDown from "../../../../assets/img/ArrowDown.png";
import { useState } from "react";
import { Cell, Caption, Body, TOKEN, Aum, CustomButton, Logo } from "./common";
import DropdownSelector from "./DropdownSelector";

/**
 * 1단계
 * 드롭다운
 */
const Dropdown = ({ token, setToken, onEnd }) => {
  const [visible, setVisible] = useState(false);
  return (
    <Container>
      <DropdownHeader onClick={() => setVisible((prev) => !prev)}>
        <LeftBox>
          <Logo src={token.logo} />
          <NameBox>
            <Cell>{token.name}</Cell>
            <Caption style={{ color: "#5C5E81" }}>{token.description}</Caption>
          </NameBox>
        </LeftBox>
        <RightBox>
          <Body style={{ color: "#5C5E81" }}>Select Token</Body>
          <img
            src={ArrowDown}
            style={{
              width: 7,
              height: "auto",
              opacity: 0.9,
              rotate: visible ? "180deg" : "0deg",
              transition: "all 0.3s",
            }}
            alt={"caret-down"}
          />
        </RightBox>
        {visible ? (
          <DropdownSelector tokens={TOKEN} setToken={setToken} />
        ) : (
          <></>
        )}
      </DropdownHeader>
      <BottomBox>
        <Caption style={{ color: "#B7B8CD" }}>Network</Caption>
        <RightBox>
          <Logo
            src={token.logo}
            alt={token.name}
            style={{ width: 17, height: 17 }}
          />
          <Aum style={{ color: "#B7B8CD" }}>{token.subname}</Aum>
        </RightBox>
      </BottomBox>
      <CustomButton onClick={() => onEnd()} style={{ marginTop: 5 }}>
        Next
      </CustomButton>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px;
  gap: 10px;
`;

const DropdownHeader = styled.div`
  width: 100%;
  height: 62px;
  border-radius: 15px;
  border: 1px solid #5c5e81;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0px 20px;
  cursor: pointer;
  transition: all 0.2s;
  position: relative;

  &:hover {
    background-color: #5c5e8114;
  }
`;

const LeftBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 10px;
`;

const NameBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
`;

const RightBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  gap: 10px;
`;

const BottomBox = styled.div`
  width: 100%;
  height: 45px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0px 20px;
  border-radius: 15px;
  border: 1px solid #5c5e81;
`;

export default Dropdown;
