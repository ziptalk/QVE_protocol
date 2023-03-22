import styled from "styled-components";
import { Cell, Caption } from "./common";

/**
 * 콜랩세
 */
const DropdownSelector = ({ tokens, setToken }) => {
  return (
    <SelectorContainer>
      {tokens.map((token) => (
        <Selector key={token.name} onClick={() => setToken(token)}>
          <Logo src={token.logo} alt={token.name} />
          <NameWrapper>
            <Cell>{token.name}</Cell>
            <Caption style={{ color: "#5C5E81" }}>{token.description}</Caption>
          </NameWrapper>
        </Selector>
      ))}
    </SelectorContainer>
  );
};

const SelectorContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 10px;
  border-radius: 15px;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
    rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
  position: absolute;
  top: 70px;
  left: 0px;
  background-color: #2b2b34;
  gap: 5px;
  border: 1px solid #3f3f46;
`;

const Logo = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 100%;
`;

const Selector = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 10px;
  padding: 0px 10px;
  border-radius: 12px;
  transition: all 0.2s;
  cursor: pointer;

  &:hover {
    background-color: #3f3f46;
  }
`;

const NameWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
`;

export default DropdownSelector;
