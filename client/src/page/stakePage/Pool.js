import styled from "styled-components";
import BothCoins from "../../assets/BothCoins.png";

const EContainer = styled.div`

`;

const Text = styled.div`
font-family: 'Inter';
font-style: normal;
`;

const PoolContainer = styled.div`
height: 141px;
margin-left: 20px;
margin-right: 20px;
padding: 40px 34px 60px 35px;
background: #2B2B34;
border-radius: 16px;
`;

const Image = styled.img`
width: 97.21px;
height: 78.41px;
`;

const Button = styled.button`
all: unset;
width: 180.77px;
height: 55px;
background: #5C5E81;
border-radius: 16px;
font-family: 'Inter';
font-style: normal;
font-weight: 600;
font-size: 14px;
line-height: 17px;
text-align: center;
`;


function Pool ({setLiquidityCount}) {

    return (
        <>
    <Text style={{fontWeight: '700', fontSize: '24px', lineHeight: '36px', paddingLeft: '20px', color: '#B7B8CD'}}>Pool</Text>
      <PoolContainer>
        <EContainer style={{display: 'flex', flexDirection: 'row', padding: '0px 9.5px 0px 9.5px'}}>
        <Image src={BothCoins}></Image>
        <EContainer style={{width: '15px'}}></EContainer>
        <EContainer style={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
            <Text style={{fontWeight: '700', fontSize: '24px', lineHeight: '36px', color: '#FFFFFF'}}>arbQVE / QVE</Text>
            <Text style={{fontWeight: '600', fontSize: '14px', lineHeight: '17px', color: '#5C5E81'}}>Pool</Text>
        </EContainer>
        </EContainer>
        <EContainer style={{height: '35px'}}></EContainer>
        <EContainer style={{display: 'flex', padding: '0px 34px 0px 35px', justifyContent:'space-between'}}>
            <EContainer style={{display: 'flex', flexDirection:'column', justifyContent:'space-between'}}>
                <Text style={{fontWeight: '700', fontSize: '12px', lineHeight: '15px', color: '#B7B8CD'}}>APR</Text>
                <Text style={{fontWeight: '700', fontSize: '23px', lineHeight: '36px', color: '#FFFFFF'}}>12.3%</Text>
            </EContainer>
            <EContainer>
                <Text style={{fontWeight: '700', fontSize: '12px', lineHeight: '15px', color: '#B7B8CD'}}>Liquidity</Text>
                <Text style={{fontWeight: '700', fontSize: '23px', lineHeight: '36px', color: '#FFFFFF'}}>$12.3M</Text>
            </EContainer>
            <EContainer>
                <Text style={{fontWeight: '700', fontSize: '12px', lineHeight: '15px', color: '#B7B8CD'}}>Fees</Text>
                <Text style={{fontWeight: '700', fontSize: '23px', lineHeight: '36px', color: '#FFFFFF'}}>12.3%</Text>
            </EContainer>

        </EContainer>
      </PoolContainer>
      <EContainer style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', padding: '25px 20px 0px 20px'}}>
        <Button style={{background: '#5C5E81', color: '#B7B8CD'}}>Remove Liquidity</Button>
        <Button style={{background: '#4A3CE8', color: '#FFFFFF'}} onClick={() => {setLiquidityCount(1)}}>Add Liquidity</Button>
      </EContainer>
      </>
      );
    }

    export default Pool;

