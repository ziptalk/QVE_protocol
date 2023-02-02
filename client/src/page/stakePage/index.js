import Header from "../../common/header";
import Footer from "../../common/footer";
import Main from "./main";
import styled from "styled-components";
function StakePage() {
const Container = styled.div`
overflow: hidden;
`;
    return (
    <Container>
    <Header />
    <Main />
    <Footer />
    </Container>);
}

export default StakePage;