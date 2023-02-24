import Header from "../../common/header";
import Footer from "../../common/footer";
import GoToTop from "../../common/GotoTop";
import Main from "./component/main";
import styled from "styled-components";
function LandingPage({setSelectedOption}) {
const Container = styled.div`
overflow: hidden;
`;
    return (
        <Container>
        <Header></Header>
        <Main setSelectedOption={setSelectedOption}></Main>
        <Footer></Footer>
        <GoToTop />
        </Container>
    );
}

export default LandingPage;