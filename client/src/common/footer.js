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

const FooterDescriptionLeft =styled.div`
left: calc(50% - 119px);
height: 13px;
width: 87px;
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

const FooterDescriptionRight = styled.div`
width: 139px;
height: 13px;
right: calc(50% + 119px);
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
width: 203px;
height: 13px;
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
        <FooterDescriptionLeft>Blockwave Labs</FooterDescriptionLeft>
        <FooterDescriptionRight>contact@blockwavelabs.io</FooterDescriptionRight>
        <FooterDescriptionBottom>Blockwave Labs Inc. All rights reserved</FooterDescriptionBottom>
    </FooterContainer>
    </>);
}

export default Footer;