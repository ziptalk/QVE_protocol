import styled from "styled-components";

const Contact = styled.div`
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 0px;
gap: 8px;

position: absolute;
width: 100%;
height: 13px;
left: calc(50% - 100px/2 + 1px);;
top: 630px;

font-family: 'Inter';
font-style: normal;
font-weight: 400;
font-size: 11px;
line-height: 13px;

/* dark/label */

color: #B7B8CD;
`

function Footer() {
    return(<>
    <Contact>contact@blockwavelabs.io</Contact>
    </>);
}

export default Footer;