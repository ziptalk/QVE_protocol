import React, { useState } from "react";
import styled from "styled-components";

const DropDownContainer = styled("div")`
  width: 10.5em;
  margin: 0 auto;
  flex: auto;
`;

const DropDownHeader = styled("div")`
  box-sizing: border-box;
flex-wrap: wrap;
/* Auto layout */

display: flex;
flex-direction: column;
align-items: flex-start;
padding: 13.5px 20px;
gap: 20px;

width: 224px;
height: 60px;

/* dark/background */

background: #1B1A1E;
/* dark/primary */

border: 1px solid #4A3CE8;
border-radius: 16px;

/* Inside auto layout */

order: 0;
flex-grow: 0;
cursor: pointer;
font-weight: 700;
font-size: 24px;
line-height: 36px;
/* identical to box height, or 150% */

letter-spacing: 0.02em;

/* dark/label */

color: #B7B8CD;


`;

const DropDownListContainer = styled("div")``;

const DropDownList = styled("ul")`
  padding: 0;
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
/* dark/unactive */

border: 1px solid #3F3F46;
box-shadow: 4px 4px 60px rgba(0, 0, 0, 0.4);
border-radius: 16px;

/* dark/label */

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

/* dark/unactive */
&:hover {
    background: #3F3F46;
}
border-radius: 10px;
`;

const EContainer = styled.div`

`;

const options = ["Portfolio 01", "Portfolio 02, Portfolio 03"];

export default function DropDown() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

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
          {selectedOption || "Portfolio 01"}
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
