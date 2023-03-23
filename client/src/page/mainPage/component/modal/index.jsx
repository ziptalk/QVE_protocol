import styled from "styled-components";
import XImg from "../../../../assets/img/x.png";
import Favicon from "../../../../assets/img/Favicon.png";
import { Label, TOKEN } from "./common";
import Dropdown from "./Dropdown";
import EnterAmount from "./EnterAmount";
import ConfirmDeposit from "./ConfirmDeposit";
import Result from "./Result";
import { useState, useEffect } from "react";
import { useAvailable } from "../../../../hooks/useAvailable";

const STAGES = [Dropdown, EnterAmount, ConfirmDeposit, Result];

const DEFAULT_VALUES = {
  available: 0,
  dolar: 0,
  input: "",
  rate: 0,
};

/**
 * Deposit 모달
 */
const ModalWrapper = ({ setPreWalletCount, preWalletCount }) => {
  const [curStage, setCurStage] = useState(0);
  const [token, setToken] = useState(TOKEN[0]);
  const [values, setValues] = useState(DEFAULT_VALUES);
  const [tokenInfo] = useAvailable(preWalletCount);

  const CurStage = STAGES[curStage];

  const onEnd = () => {
    if (curStage !== STAGES.length - 1) setCurStage((prev) => prev + 1);
  };

  //모달을 닫을 때 초기화
  useEffect(() => {
    setCurStage(0);
    setToken(TOKEN[0]);
    setValues({
      ...values,
      available: tokenInfo[token.name].available,
      rate: tokenInfo[token.name].rate,
    });
  }, [preWalletCount]);

  //토큰 선택시 해당 토큰 정보를 상태에 담음
  useEffect(() => {
    setValues({
      ...values,
      available: tokenInfo[token.name].available,
      rate: tokenInfo[token.name].rate,
    });
  }, [token]);

  return (
    <ModalContainer>
      <Xbtn src={XImg} onClick={() => setPreWalletCount(null)} />
      {curStage !== STAGES.length - 1 ? (
        <>
          <LogoWrapper>
            <Logo src={Favicon} />
            <Label style={{ fontWeight: 700, color: "white", marginTop: 5 }}>
              Deposit
            </Label>
            <Label style={{ fontWeight: 400, color: "white" }}>
              Market making
            </Label>
          </LogoWrapper>
        </>
      ) : (
        <></>
      )}
      <CurStage
        token={token}
        setToken={setToken}
        onEnd={onEnd}
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
