import Header from "../../common/header";
import Main from "./main";
import Footer from "../../common/footer";
import GoToTop from "../../common/GotoTop";
import styled from "styled-components";

const Container = styled.div`
overflow: hidden;
`;

function PoolPage() {

    return (
        <Container>
        <Header></Header>
        <Main></Main>
        <Footer></Footer>
        <GoToTop />
        </Container>

    );
}

export default PoolPage;