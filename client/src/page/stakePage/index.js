import Header from "../../common/header";
import Footer from "../../common/footer";
import GoToTop from "../../common/GotoTop";
import Main from "./main";
import styled from "styled-components";
function StakePage() {
  const Container = styled.div`
    min-height: 100vh;
  `;
  return (
    <Container>
      <Header />
      <Main />
      <Footer />
      <GoToTop />
    </Container>
  );
}

export default StakePage;
