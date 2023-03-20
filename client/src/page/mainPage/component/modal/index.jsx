import styled from "styled-components";

/**
 * Deposit 모달
 */
const ModalWrapper = () => {
  return <ModalContainer></ModalContainer>;
};

const ModalContainer = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  width: 90vw;
  max-width: 374px;
  background: #2b2b34;
  border-radius: 16px;
  z-index: 30;
`;

export default ModalWrapper;
