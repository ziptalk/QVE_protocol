import styled from "styled-components";

const FooterContainer = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
gap: 10px;
width: 100% ;
height: 135px;
background: #292932;
`;

const FooterDescriptionTop =styled.div`
font-weight: 700;
font-size: 11px;
line-height: 13px;

/* dark/label */

color: #B7B8CD;

/* Inside auto layout */

flex: none;
order: 0;
flex-grow: 0;
`;

const FooterDescriptionMiddle = styled.div`
font-weight: 400;
font-size: 11px;
line-height: 13px;

/* dark/label */

color: #B7B8CD;


/* Inside auto layout */

flex: none;
order: 0;
flex-grow: 0;
`;


const FooterDescriptionBottom = styled.div`
font-weight: 400;
font-size: 11px;
line-height: 13px;

/* dark/label */

color: #B7B8CD;


/* Inside auto layout */

flex: none;
order: 0;
flex-grow: 0;
`;

function Footer() {
    return(<>
    <FooterContainer>
        <FooterDescriptionTop>Blockwave Labs</FooterDescriptionTop>
        <FooterDescriptionMiddle>contact@blockwavelabs.io</FooterDescriptionMiddle>
        <FooterDescriptionBottom>Blockwave Labs Inc. All rights reserved</FooterDescriptionBottom>
    </FooterContainer>
    </>);
}

export default Footer;