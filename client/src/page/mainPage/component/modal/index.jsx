import styled from "styled-components";
import XImg from "../../../../assets/img/x.png";
import Favicon from "../../../../assets/img/Favicon.png";
import { Label, TOKEN } from "./common";
import Dropdown from "./Dropdown";
import EnterAmount from "./EnterAmount";
import ConfirmDeposit from "./ConfirmDeposit";
import { useState } from "react";

const STAGES = [Dropdown, EnterAmount, ConfirmDeposit];

/**
 * Deposit 모달
 */
const ModalWrapper = ({ setPreWalletCount }) => {
  const [curStage, setCurStage] = useState(0);
  const [token, setToken] = useState(TOKEN[0]);
  const [values, setValues] = useState({
    available: 1.1234,
    dolar: 1234,
    input: "",
  });

  const CurStage = STAGES[curStage];

  return (
    <ModalContainer>
      <Xbtn src={XImg} onClick={() => setPreWalletCount(null)} />
      <LogoWrapper>
        <Logo src={Favicon} />
        <Label style={{ fontWeight: 700, color: "white", marginTop: 5 }}>
          Deposit
        </Label>
        <Label style={{ fontWeight: 400, color: "white" }}>Market making</Label>
      </LogoWrapper>
      <CurStage
        token={token}
        setToken={setToken}
        onEnd={() => setCurStage((prev) => prev + 1)}
        values={values}
        setValues={setValues}
      />
    </ModalContainer>
  );
};

const ModalContainer = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90vw;
  max-width: 374px;
  background: #2b2b34;
  border-radius: 16px;
  padding: 50px 20px 20px 20px;
  z-index: 30;
  gap: 20px;
`;

const Xbtn = styled.img`
  width: 19px;
  height: 19px;
  cursor: pointer;
  position: absolute;
  top: 35px;
  right: 30px;
`;

const LogoWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3px;
`;

const Logo = styled.img`
  width: 45px;
  height: auto;
`;

export default ModalWrapper;
