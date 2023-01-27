import Header from "../../common/header";
import Footer from "../mainPage/component/footer";
import Main from "./main";
import styled from "styled-components";
function SwapPage() {

const Container = styled.div`
overflow: hidden;
`;
    return (
        <Container>
        <Header />
        <Main />
        </Container>
    );
}

export default SwapPage;