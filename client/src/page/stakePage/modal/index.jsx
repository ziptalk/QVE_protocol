import styled from "styled-components";
import Staking from "./Staking";
import Result from "./Result";
import XImg from "../../../assets/img/x.png";
import { useState } from "react";

const STAGES = [Staking, Result];

const StakingModal = ({ setModal }) => {
  const [curStage, setCurStage] = useState(0);
  const CurStage = STAGES[curStage];

  return (
    <ModalBackground>
      <ModalContainer>
        <Xbtn src={XImg} onClick={() => setModal(false)} />
        <CurStage setStage={setCurStage} />
      </ModalContainer>
    </ModalBackground>
  );
};

const ModalBackground = styled.div`
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  position: fixed;
  top: 0px;
  left: 0px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90vw;
  max-width: 374px;
  background: #2b2b34;
  border-radius: 16px;
  padding: 30px 20px 20px 20px;
  z-index: 30;
  gap: 20px;
  position: relative;
`;

const Xbtn = styled.img`
  width: 16px;
  height: 16px;
  cursor: pointer;
  position: absolute;
  top: 25px;
  right: 30px;
`;

export default StakingModal;
