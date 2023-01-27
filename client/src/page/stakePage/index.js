import Header from "../../common/header";
import Main from "./main";
import Footer from "../../common/footer";
import styled from "styled-components";

const Container = styled.div`
overflow: hidden;
`;

function StakePage() {

    return (
        <Container>
        <Header></Header>
        <Main></Main>
        <Footer></Footer>
        </Container>

    );
}

export default StakePage;