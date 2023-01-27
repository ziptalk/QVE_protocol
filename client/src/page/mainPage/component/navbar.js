import styled from "styled-components";
import Menu from "../../../assets/Menu.png";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const MenuBar = styled.img`
width: 24px;
height: 24px;
`;

const EContainer = styled.div`

`;

const DropDownListContainer = styled("div")`
position: absolute;
right: 0;
`;

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
font-family: 'Inter';
font-style: normal;
font-weight: 700;
font-size: 16px;
line-height: 19px;
align-items: center;
&:hover {
    background: #3F3F46;
}
border-radius: 10px;
`;

function Navbar () {

    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const options = ["Deposit", "Portfolios", "Swap", "Pool", "Stake"];
    const toggling = () => setIsOpen(!isOpen);
    
    const onOptionClicked = value => () => {
    setSelectedOption(value);
    setIsOpen(false);
    
  };

  const navigate = useNavigate();

  function PageSelected() {
    if (selectedOption == "Deposit") {
        navigate("/swapPage");
    }
    if (selectedOption == "Portfolios") {
        navigate("/swapPage");
    }
    if (selectedOption == "Swap") {
        navigate("/swapPage");
    }
    if (selectedOption == "Pool") {
        navigate("/stakePage");
    }
    if (selectedOption == "Stake") {
        navigate("/stakePage");
    }
  }

  useEffect(() => {
    PageSelected();
  }, [selectedOption])
    return (
        <>
            <MenuBar src={Menu} onClick={toggling}></MenuBar>
            <EContainer style={{height: '10px'}}></EContainer>
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
        </>
    );
}

export default Navbar;