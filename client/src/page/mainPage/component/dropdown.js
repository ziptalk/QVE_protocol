import React, { useState } from "react";
import styled from "styled-components";
import InvertedArrow from "../../../assets/img/Invertedarrow.png";

const DropDownContainer = styled("div")`
  width: 10.5em;
  margin: 0 auto;
  flex: auto;
`;

const DropDownHeader = styled("div")`
  box-sizing: border-box;
  flex-wrap: wrap;
display: flex;
flex-direction: column;
justify-content: center;
align-items: flex-start;
align-content: space-between;
padding: 18px 20px;
width: 224px;
height: 60px;
background: #1B1A1E;
border: 1px solid #3F3F46;
border-radius: 16px;
order: 0;
flex-grow: 0;
cursor: pointer;
font-weight: 700;
font-size: 24px;
line-height: 36px;
letter-spacing: 0.02em;
color: #B7B8CD;
`;

const DropDownListContainer = styled("div")``;

const DropDownList = styled("ul")`
  padding: 9px 10px;
  margin: 0;
  padding-left: 7px;
  padding-right: 7px;
  background: #ffffff;
  border: 2px solid #e5e5e5;
  box-sizing: border-box;
  color: #3faffa;
  font-size: 1.3rem;
  font-weight: 500;
  &:first-child {
    padding-top: 0.3em;
  }
  cursor: pointer;
  width: 224px;
  background: #2B2B34;
border: 1px solid #3F3F46;
box-shadow: 4px 4px 60px rgba(0, 0, 0, 0.4);
border-radius: 16px;
color: #B7B8CD;
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
padding-left: 7px;
&:hover {
    background: #3F3F46;
}
border-radius: 10px;
`;

const BaseImage = styled.img`

`;

const Text = styled.div`
font-weight: 700;
font-size: 24px;
line-height: 30px;
text-align: center;
letter-spacing: 0.02em;
color: #FFFFFF;
`;

const EContainer = styled.div`

`;

const options = ["Arbitrage", "BTC Hedge", "Funding Rate"];

export default function DropDown({selectedOption, setSelectedOption}) {
  const [isOpen, setIsOpen] = useState(false);

  const toggling = () => setIsOpen(!isOpen);

  const onOptionClicked = value => () => {
    setSelectedOption(value);
    setIsOpen(false);
  };

  return (
    <>
    <EContainer style={{height: '20px'}}></EContainer>
    <DropDownContainer>
    <DropDownHeader onClick={toggling}>
        <Text>{selectedOption}</Text>
        <BaseImage src={InvertedArrow}></BaseImage>
        </DropDownHeader>
        <EContainer style={{height: '4px'}}></EContainer>
        {isOpen && (
          <DropDownListContainer>
            <DropDownList>
              {options.map(option => (
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
