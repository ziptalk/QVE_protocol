import Header from "../../common/header";
import Footer from "../../common/footer";
import Main from "./component/main";
import styled from "styled-components";
function LandingPage() {
const Container = styled.div`
overflow: hidden;
`;
    return (
        <Container>
        <Header></Header>
        <Main></Main>
        <Footer></Footer>
        </Container>
    );
}

export default LandingPage;