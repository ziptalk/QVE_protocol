import React, { useState, useRef } from "react";
import styled from "styled-components";
import InvertedArrow from "../../../assets/img/Invertedarrow.png";
import { useOutsideClick } from "../../../hooks/useOutsideClick";

const DropDownContainer = styled("div")`
  width: 10.5em;
  margin: 0 auto;
  flex: auto;
  position: relative;
  margin-top: 20px;
  z-index: 1;
`;

const DropDownHeader = styled("div")`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0px 13px 5px 13px;
  width: 230px;
  height: 60px;
  background: #1b1a1e;
  border: 1px solid #3f3f46;
  border-radius: 16px;
  order: 0;
  flex-grow: 0;
  cursor: pointer;
  font-weight: 700;
  font-size: 24px;
  line-height: 36px;
  letter-spacing: 0.02em;
  color: #b7b8cd;
`;

const DropDownListContainer = styled("div")``;

const DropDownList = styled("ul")`
  margin: 0px;
  padding: 10px;
  background: #ffffff;
  border: 2px solid #e5e5e5;
  box-sizing: border-box;
  color: #3faffa;
  font-size: 1.3rem;
  font-weight: 500;
  cursor: pointer;
  width: 230px;
  background: #2b2b34;
  border: 1px solid #3f3f46;
  box-shadow: 4px 4px 60px rgba(0, 0, 0, 0.4);
  border-radius: 16px;
  color: #b7b8cd;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
`;

const ListItem = styled("li")`
  display: flex;
  width: 100%;
  height: 40px;
  left: 10px;
  font-weight: 700;
  font-size: 16px;
  line-height: 19px;
  align-items: center;
  justify-content: flex-start;
  padding-left: 10px;
  &:hover {
    background: #3f3f46;
  }
  border-radius: 10px;
`;

const BaseImage = styled.img``;

const Text = styled.div`
  font-weight: 700;
  font-size: 24px;
  line-height: 30px;
  text-align: center;
  letter-spacing: 0.02em;
  color: #ffffff;
`;

const EContainer = styled.div``;

const options = ["Market Making", "Arbitrage", "BTC Hedge", "Funding Rate"];

export default function DropDown({ selectedOption, setSelectedOption }) {
  // const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useOutsideClick(ref, false);

  const toggling = () => setIsOpen(!isOpen);

  const onOptionClicked = (value) => () => {
    setSelectedOption(value);
    setIsOpen(false);
  };

  return (
    <>
      <DropDownContainer ref={ref}>
        <DropDownHeader onClick={toggling}>
          <Text>{selectedOption}</Text>
          <BaseImage src={InvertedArrow}></BaseImage>
        </DropDownHeader>
        <EContainer style={{ height: "4px" }}></EContainer>
        {isOpen && (
          <DropDownListContainer>
            <DropDownList>
              {options.map((option) => (
                <ListItem onClick={onOptionClicked(option)} key={Math.random()}>
                  {option}
                </ListItem>
              ))}
            </DropDownList>
          </DropDownListContainer>
        )}
      </DropDownContainer>
    </>
  );
}
