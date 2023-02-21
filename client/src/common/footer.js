import styled from "styled-components";
const Backgroud = styled.div`
display: flex;
flex-direction: column;
background: #292932;
align-items: center;
`;

const FooterContainer = styled.div`
justify-content: flex-start;
padding: 40px 88px;
gap: 10px;
width: 100%;
max-width: 414px;
`;

const FooterDescriptionTop =styled.div`
font-weight: 700;
font-size: 11px;
line-height: 13px;
color: #B7B8CD;
`;

const FooterDescriptionMiddle = styled.div`
font-weight: 400;
font-size: 11px;
line-height: 13px;
color: #B7B8CD;
`;


const FooterDescriptionBottom = styled.div`
font-weight: 400;
font-size: 11px;
line-height: 13px;
color: #B7B8CD;
`;

const EContainer = styled.div`

`;

function Footer() {
    return(<Backgroud>
    <FooterContainer>
        <EContainer style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
            <FooterDescriptionTop>Blockwave Labs</FooterDescriptionTop>
            <FooterDescriptionTop>|</FooterDescriptionTop>
            <FooterDescriptionMiddle>contact@blockwavelabs.io</FooterDescriptionMiddle>
            </EContainer>
            <EContainer style={{height: '8px'}}/>
            <FooterDescriptionBottom>Blockwave Labs Inc. All rights reserved</FooterDescriptionBottom>
            <EContainer style={{height: '21px'}}/>
    </FooterContainer>
    </Backgroud>);
}

export default Footer;