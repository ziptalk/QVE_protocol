import styled from "styled-components";
import BothCoins from "../../assets/BothCoins.png";
import { ProgressBar } from 'react-bootstrap';
import LiquidityArtifact from "../../artifact/LiquidityPool.json";
import 'bootstrap/dist/css/bootstrap.min.css';
import Web3 from "web3";
import { useState } from "react";
const EContainer = styled.div`

`;

const Text = styled.div`
letter-spacing: 0.02em;
`;

const PoolContainer = styled.div`
padding: 40px 34px 25px 35px;
background: #2B2B34;
border-radius: 16px;
display: flex;
flex-direction: column;
`;

const Image = styled.img`
width: 97.21px;
height: 78.41px;
`;

const Button = styled.button`
all: unset;
cursor: pointer;
width: 180.77px;
height: 55px;
background: #5C5E81;
border-radius: 16px;
font-weight: 600;
font-size: 14px;
line-height: 17px;
text-align: center;
`;

const DetailContainer = styled.div`
display: flex;
flex-direction: column;
background: rgba(43, 43, 52, 0.9);
border: 1px solid #3F3F46;
border-radius: 16px;
width: 100%;
`;

const CompositionContainer = styled.div`
display: flex;
flex-direction: column;
padding: '0px 13px 0px 13px';
`;

function Pool ({setLiquidityCount}) {
    const [qveTotal, setQveTotal] = useState('');
    const [arbQveTotal, setArbQveTotal] = useState('');
    const web3 = new Web3(window.ethereum);
    const LiquidityAddress = '0x57Fc576deAf9558229B6c06468D29C16a42034c6';
    const LiquidityContract = new web3.eth.Contract(LiquidityArtifact.output.abi , LiquidityAddress);
    const arbQVETotal = LiquidityContract.methods.getTotalA().call();
    const QVETotal = LiquidityContract.methods.getTotalB().call();
    arbQVETotal.then((result) => {
        console.log(result)
        setArbQveTotal(result);
      });

    QVETotal.then((result) => {
        setQveTotal(result);
      });
    const poolTotal = ((qveTotal/ 10**18) + (arbQveTotal / 10**18)).toFixed(2);
    return (
        <EContainer style={{width: '90%', maxWidth: '414px'}}>
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
        <EContainer style={{height: '15px'}}/>
        <DetailContainer>
            <EContainer style={{height: '25px'}}/>
            <Text style={{fontWeight: '700', fontSize: '12px', lineHeight: '15px', color: '#B7B8CD', paddingLeft: '26px'}}>APR</Text>
            <EContainer style={{height: '25px'}}/>
            <EContainer style={{display: 'flex', justifyContent: 'flex-end'}}> 
            <Text style={{fontWeight: '700', fontSize: '23px', color: '#B7B8CD', paddingRight: '26px', color: '#FFFFFF'}}>12.3%</Text>
            </EContainer>
            <EContainer style={{height: '23px'}}/> 
        </DetailContainer>
        <EContainer style={{height: '20px'}}/>
        <DetailContainer>
            <EContainer style={{height: '25px'}}/>
            <Text style={{fontWeight: '700', fontSize: '12px', lineHeight: '15px', color: '#B7B8CD', paddingLeft: '26px'}}>24h Trading Volume</Text>
            <EContainer style={{height: '25px'}}/>
            <EContainer style={{display: 'flex', justifyContent: 'flex-end'}}> 
            <Text style={{fontWeight: '700', fontSize: '23px', color: '#B7B8CD', paddingRight: '26px', color: '#FFFFFF'}}>$1,234,567</Text>
            </EContainer>
            <EContainer style={{height: '23px'}}/> 
        </DetailContainer>
        <EContainer style={{height: '20px'}}/>
        <DetailContainer>
            <EContainer style={{height: '25px'}}/>
            <Text style={{fontWeight: '700', fontSize: '12px', lineHeight: '15px', color: '#B7B8CD', paddingLeft: '26px'}}>Pool Liquidity</Text>
            <EContainer style={{height: '25px'}}/>
            <EContainer style={{display: 'flex', justifyContent: 'flex-end'}}> 
            <Text style={{fontWeight: '700', fontSize: '23px', color: '#B7B8CD', paddingRight: '26px', color: '#FFFFFF'}}>$1,234,567</Text>
            </EContainer>
            <EContainer style={{height: '23px'}}/> 
        </DetailContainer>
        <EContainer style={{height: '20px'}}/>
        <DetailContainer>
            <EContainer style={{height: '25px'}}/>
            <Text style={{fontWeight: '700', fontSize: '12px', lineHeight: '15px', color: '#B7B8CD', paddingLeft: '26px'}}>Swap Fee</Text>
            <EContainer style={{height: '25px'}}/>
            <EContainer style={{display: 'flex', justifyContent: 'flex-end'}}> 
            <Text style={{fontWeight: '700', fontSize: '23px', color: '#B7B8CD', paddingRight: '26px', color: '#FFFFFF'}}>0.5%</Text>
            </EContainer>
            <EContainer style={{height: '23px'}}/> 
        </DetailContainer>
        <EContainer style={{height: '22px'}}/>
        <Text style={{fontWeight: '700', fontSize: '12px', color: '#B7B8CD', paddingRight: '26px', color: '#B7B8CD'}}>Pool Composition</Text>
        <EContainer style={{height: '25px'}}/>
        <CompositionContainer>
            <EContainer style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={{fontWeight: '700', fontSize: '12px', color: '#B7B8CD', color: '#B7B8CD'}}>arbQVE: {((arbQveTotal/10**18).toFixed(2) / poolTotal).toFixed(2) * 100}%</Text>
                <Text style={{fontWeight: '700', fontSize: '12px', color: '#B7B8CD', color: '#B7B8CD'}}>QVE: {((qveTotal/10**18).toFixed(2) / poolTotal).toFixed(2) * 100}%</Text>
            </EContainer>
            <EContainer style={{height: '15px'}}/>
            <EContainer style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={{fontWeight: '700', fontSize: '23px', color: '#B7B8CD', color: '#FFFFFF'}}>{(arbQveTotal/10**18).toFixed(2)}</Text>
                <Text style={{fontWeight: '700', fontSize: '23px', color: '#B7B8CD', color: '#FFFFFF'}}>{(qveTotal/10**18).toFixed(2)}</Text>
            </EContainer>
            <EContainer style={{height: '20px'}}/>
            <ProgressBar now={((arbQveTotal/10**18).toFixed(2) / poolTotal).toFixed(2) * 100} />
        </CompositionContainer>
      </PoolContainer>
      <EContainer style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', padding: '25px 0px 0px 0px'}}>
        <Button style={{background: '#5C5E81', color: '#B7B8CD'}}>Remove Liquidity</Button>
        <Button style={{background: '#4A3CE8', color: '#FFFFFF'}} onClick={() => {setLiquidityCount(1)}}>Add Liquidity</Button>
      </EContainer>
      </EContainer>
      );
    }

    export default Pool;
{/* <EContainer style={{height: '35px'}}></EContainer>
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
        </EContainer> */}
