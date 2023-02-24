import styled from "styled-components";
import XIcon from "../../assets/img/x.png";
import { useState, useEffect } from "react";
import Contract from "../../assets/contract/contract";
import ContractAddress from "../../assets/contract/contractAddress";
import GoToTop from "../../common/GotoTop";
import PoolIcon from "../../assets/img/SwapIcon.png";
import Qve from "../../assets/img/Qve.svg";
import arbQve from "../../assets/img/arbQve.svg"
import Web3 from "web3";
const Outer = styled.div`
display: flex;
flex-direction: column;
width: 90%;
max-width: 374px;
height: 100vh;
`;

const Container = styled.div`
width: 100%;
display: flex;
flex-direction: column;
padding: 16px 25px 16px 25px; 
background: rgba(43, 43, 52, 0.9);
border-radius: 16px;
`;

const EContainer = styled.div`

`;

const Text = styled.div`
font-weight: 700;
font-size: 24px;
line-height: 36px;
letter-spacing: 0.02em;color: #B7B8CD;
`;

const QveArbContainer = styled.div`
box-sizing: border-box;
border: 1px solid #3F3F46;
border-radius: 16px;
width: 90%;
`;

const Input = styled.input`
font-weight: 700;
font-size: 18px;
line-height: 24px;
text-align: left;
letter-spacing: 0.02em;
color: #B7B8CD;
background: transparent;
border: none;
`;

const InputContainer = styled.div`
background: linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), #202025;
border-radius: 12px;
font-weight: 400;
font-size: 16px;
line-height: 19px;
text-align: right;
color: #B7B8CD;
width: 200px;
display: flex;
justify-Content: flex-end;
align-items: center;
padding: 10px;
`;

const Button = styled.button`
all: unset;
padding: 19px 0px 19px 0px;
font-weight: 600;
font-size: 14px;
line-height: 17px;
text-align: center;
color: #FFFFFF;
background: #4A3CE8;
border-radius: 16px;
cursor: pointer;
`;

const Image = styled.img`

`;

const MaxButton = styled.button`
all: unset;
padding: '6px 13px';
cursor: pointer;
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
width: 47.78px;
height: 27px;
background: #4A3CE8;
border-radius: 16px;
font-weight: 600;
font-size: 12px;
line-height: 15px;
color: #FFFFFF;
`;

function AddLiquidity({setLiquidityCount}) {
    const [token, setToken] = useState(0);
    const [connected, setConnected] = useState('');
    const web3 = new Web3(window.ethereum);
    const [amount, setAmount] = useState('');
    const [qvePrice, setQvePrice] = useState('');
    let account = JSON.parse(localStorage.getItem('user'));
    const qveContract = Contract();
    const Address = ContractAddress();
    account  = JSON.parse(localStorage.getItem('user'));

    function AddingLiquidityPetra() {
        const transaction = {
            type: "entry_function_aptos_transfer",
            function: '0x393368cfe77fda732c00f6a2b865bf89cf5bcf723c93a20547ebcd6f7a02ea07::liqpool::addLiquidity_ARB',
            arguments: [amount * 10**8],
            type_arguments: [],
        };
        
        window.aptos.signAndSubmitTransaction(transaction).then(() => {
            console.log("전송 성공");
        })
    }
    const getAptosWallet = () => {
        if ('aptos' in window) {
            return window.aptos;
        } else {
            window.open('https://petra.app/', `_blank`);
        }
    };
    const wallet = getAptosWallet();

    async function Connect() {
        console.log('connnect');
        setAmount('');
        try {
            await wallet.connect();
            const account = await wallet.account();
            localStorage.setItem('user', JSON.stringify(account.address));
        } catch (error) {

        }
    }
    try {
        let connectionStatus = wallet.isConnected();
        connectionStatus.then((result) => {
            setConnected(result);
        })
    }
    catch (error) {

    }

    // function AddingLiquidity(amount) {

    //     qveContract.QVEContract.methods.approve(Address.LiquidityAddress, web3.utils.toBN(amount * 10**18)).send({ from: account });;

    //     qveContract.ArbQVEContract.methods.approve(Address.LiquidityAddress, web3.utils.toBN(amount * 10**18)).send({ from: account });
        
    //     qveContract.LiquidityContract.methods.addLiquidity_1(web3.utils.toBN(amount * 10**18)).send({ from: account });
    // }
    // useEffect(()=>{
    //     const updateQvePrice = async () => {
    //         let getQVEPoolData =  qveContract.LiquidityContract.methods.getLiquidityValue_1(amount).call();
           
    //         await getQVEPoolData.then((result) => {
    //             setQvePrice(result);
    //         });
    //     }
        
    //     updateQvePrice();
    // }, [amount])
console.log('amount is ', amount)
    return(
        <Outer>
            <GoToTop />
            <Text>Pool</Text>
            <EContainer style={{height: '10px'}}/>
            <Text style={{fontSize: '18px', lineHeight: '24px'}}>Add Liquidity</Text>
            <EContainer style={{height: '25px'}}/>
            <Container>
            <EContainer style={{display: 'flex',flexDirection: 'row', justifyContent: 'space-between',  alignItems:'center'}}>
                <EContainer style={{fontWeight: '500', fontSize: '14px', lineHeight: '17px', display: 'flex', flexDirection: 'row', justifyContent:'center', alignItems:'center'}}>
                <Image src={Qve} style={{width: '32px', height: '32px'}} />
                <EContainer style={{width: '3px'}}/>
                <Input type="number" placeholder="Amount" value = {amount} onChange={(e) => setAmount((e.target.value))}></Input>
                </EContainer>
                <MaxButton>MAX</MaxButton>
            </EContainer>
            <EContainer style={{height: '9.5px'}} />
            <EContainer style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                <EContainer style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                    <EContainer style={{width: '5px'}}/>
                    <Text style={{fontSize: '12px', lineHeight: '15px'}}>QVE</Text>
                    <EContainer style={{width: '3px'}}/>
                    <Text style={{fontWeight: '700', fontSize: '12px', lineHeight: '15px', color: '#5C5E81'}}>50%</Text>
                    </EContainer>
                <EContainer style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{fontWeight: '400', fontSize: '11px', lineHeight: '13px', color: '#5C5E81'}}>Available</Text>
                <EContainer style={{width: '4px'}}></EContainer>
                <Text style={{fontWeight: '400', fontSize: '11px', lineHeight: '13px', color: '#4A3CE8'}}>0 QVE</Text>
                </EContainer>
            </EContainer>
        </Container>
        <EContainer style={{height: '10px'}}/>
        <EContainer style={{display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'absolute'}}>
        </EContainer>
        <Container>
        <EContainer style={{display: 'flex',flexDirection: 'row', justifyContent: 'space-between',  alignItems:'center'}}>
                <EContainer style={{fontWeight: '500', fontSize: '14px', lineHeight: '17px', display: 'flex', flexDirection: 'row', justifyContent:'center', alignItems:'center'}}>
                <Image src={arbQve} style={{width: '32px', height: '32px'}} />
                <EContainer style={{width: '3px'}}/>
                <Input type="number" placeholder="Amount" value = {amount} onChange={(e) => setAmount((e.target.value))}></Input>
                </EContainer>
                <MaxButton >MAX</MaxButton>
            </EContainer>
            <EContainer style={{height: '9.5px'}} />
            <EContainer style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                <EContainer style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                    <EContainer style={{width: '5px'}}/>
                    <Text style={{fontSize: '12px', lineHeight: '15px'}}>mQVE</Text>
                    <EContainer style={{width: '3px'}}/>
                    <Text style={{fontWeight: '700', fontSize: '12px', lineHeight: '15px', color: '#5C5E81'}}>50%</Text>
                    </EContainer>
                    <EContainer style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{fontWeight: '400', fontSize: '11px', lineHeight: '13px', color: '#5C5E81'}}>Available</Text>
                <EContainer style={{width: '4px'}}></EContainer>
                <Text style={{fontWeight: '400', fontSize: '11px', lineHeight: '13px', color: '#4A3CE8'}}>0 mQVE</Text>
                </EContainer>
            </EContainer>
        </Container>
        <EContainer style={{height: '15px'}}/>
        {amount === '' ? 
        <Button style={{background: '#5C5E81'}}>Amount is Empty</Button> 
        :
        <Button onClick={() => AddingLiquidityPetra()}>Swap</Button>
        }
            <EContainer style={{height: '100px'}}/>
        </Outer>
        
    );
}

export default AddLiquidity;

/*<>
        <GoToTop />
        
        <EContainer style={{height: '40px'}}/>
        <Container style={{position: 'relative'}}>
            <EContainer style={{height: '30px'}}></EContainer>
            <EContainer style={{display: 'flex', flexDirection: 'row'}}>
            <Text style={{fontWeight:'700', fontSize: '18px', lineHeight: '24px'}}>Add Liquidity</Text>
            <Image src={XIcon} style={{width: '19px', height: '19px', cursor: 'pointer', position: 'absolute', right: '30px'}} onClick={() => (setLiquidityCount(0))}></Image>
            </EContainer>
            <EContainer style={{height: '40px'}}></EContainer>
            <QveArbContainer>
                <EContainer style={{display: 'flex', flexDirection: 'row', padding:'22px 12px 18px 23px', justifyContent:'space-between'}}>
                    <EContainer style={{display: 'flex', flexDirection: 'column'}}>
                        <Text style={{fontWeight: '700', fontSize: '18px', lineHeight: '24px', color: '#FFFFFF'}}>arbQVE</Text>
                        <EContainer style={{height: '8px'}}></EContainer>
                        <Text style={{fontWeight: '700', fontSize: '12px', lineHeight: '15px', color: '#B7B8CD'}}>50%</Text>
                    </EContainer>
                <EContainer style={{display: 'flex', flexDirection: 'column'}}>
                    <EContainer style={{display: 'flex', flexDirection: 'row', justifyContent:'flex-end'}}>
                        <Text style={{fontWeight: '700', fontSize: '9px', lineHeight: '11px', color: '#FFFFFF'}}>Available</Text>
                        <EContainer style={{width: '5px'}}></EContainer>
                        <Text style={{fontWeight: '700', fontSize: '9px', lineHeight: '11px', color: '#5C5E81'}}>0.000000 ATOM</Text>
                    </EContainer>
                    <EContainer style={{height: '4px'}}></EContainer>
                    <InputContainer>
                    <EContainer style={{display: 'flex', gap: '5px'}}>
                    <Input placeholder="Amount" style={{flexGrow: '1', paddingRight: '5px'}} value={amount} onChange={(e) => setAmount(e.target.value)}></Input>
                    <MaxButton>Max</MaxButton>
                    </EContainer>
                    <EContainer style={{width: '10px'}}/>
                    </InputContainer>
                </EContainer>
                </EContainer>
            </QveArbContainer>
            <EContainer style={{height: '14px'}}></EContainer>
            <QveArbContainer>
            <EContainer style={{display: 'flex', flexDirection: 'row', padding:'22px 12px 18px 23px', justifyContent:'space-between'}}>
                    <EContainer style={{display: 'flex', flexDirection: 'column'}}>
                        <Text style={{fontWeight: '700', fontSize: '18px', lineHeight: '24px', color: '#FFFFFF'}}>QVE</Text>
                        <EContainer style={{height: '8px'}}></EContainer>
                        <Text style={{fontWeight: '700', fontSize: '12px', lineHeight: '15px', color: '#B7B8CD'}}>50%</Text>
                    </EContainer>
                <EContainer style={{display: 'flex', flexDirection: 'column'}}>
                    <EContainer style={{display: 'flex', flexDirection: 'row', justifyContent:'flex-end'}}>
                        <Text style={{fontWeight: '700', fontSize: '9px', lineHeight: '11px', color: '#FFFFFF'}}>Available</Text>
                        <EContainer style={{width: '5px'}}></EContainer>
                        <Text style={{fontWeight: '700', fontSize: '9px', lineHeight: '11px', color: '#5C5E81'}}>0.000000 ATOM</Text>
                    </EContainer>
                    <EContainer style={{height: '4px'}}></EContainer>
                    <InputContainer>
                    <EContainer style={{display: 'flex', gap: '5px'}}>
                    <Input placeholder="Amount" style={{flexGrow: '1', paddingRight: '5px'}} value={amount} onChange={(e) => setAmount(e.target.value)}></Input>
                    <MaxButton>Max</MaxButton>
                    </EContainer>
                    <EContainer style={{width: '10px'}}/>
                    </InputContainer>
                </EContainer>
                </EContainer>
            </QveArbContainer>
            <EContainer style={{height: '20px'}}></EContainer>
            { connected === false ? 
            <Button onClick={() => Connect()}>Connect Wallet</Button>
            : 
            amount === '' ?
            <Button style={{background: '#5C5E81'}}>Amount is Empty</Button> 
            :
            <Button onClick={() => AddingLiquidityPetra()}>Swap</Button>
        }
            <EContainer style={{height: '30px'}}/>
        </Container>
        </> */