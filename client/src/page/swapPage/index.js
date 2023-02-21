import Header from "../../common/header";
import Footer from "../../common/footer";
import Main from "./main";
import styled from "styled-components";
function SwapPage() {

const Container = styled.div`
overflow: hidden;
`;
    return (
        <Container>
        <Header />
        <Main/>
        <Footer />
        </Container>
    );
}

export default SwapPage;