import styled from "styled-components";
import Content from "./Content";

const NotConnectedModal = ({ content, link }) => {
  return (
    <ContainerBackground>
      <Container>
        <Content content={content} link={link} />
      </Container>
    </ContainerBackground>
  );
};

const ContainerBackground = styled.div`
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
  z-index: 5;
`;

const Container = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90vw;
  max-width: 374px;
  background: #2b2b34;
  border-radius: 16px;
  padding: 20px;
  z-index: 30;
  gap: 20px;
`;

export default NotConnectedModal;
