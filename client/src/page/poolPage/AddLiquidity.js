import styled from "styled-components";
import XIcon from "../../assets/img/x.png";
import { useState, useEffect } from "react";
import Contract from "../../assets/contract/contract";
import ContractAddress from "../../assets/contract/contractAddress";
import GoToTop from "../../common/GotoTop";
import PoolIcon from "../../assets/img/SwapIcon.png";
import Qve from "../../assets/img/Qve.svg";
import arbQve from "../../assets/img/arbQve.svg";
import Web3 from "web3";
import { useAvailable } from "../../hooks/useAvailable";
import Modal from "../../common/modal";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { AptosClient } from "aptos";
import { inputNumberReg } from "../../hooks/reg";

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

const EContainer = styled.div``;

const Text = styled.div`
  font-weight: 700;
  font-size: 24px;
  line-height: 36px;
  letter-spacing: 0.02em;
  color: #b7b8cd;
`;

const QveArbContainer = styled.div`
  box-sizing: border-box;
  border: 1px solid #3f3f46;
  border-radius: 16px;
  width: 90%;
`;

const Input = styled.input`
  font-weight: 700;
  font-size: 18px;
  line-height: 24px;
  text-align: left;
  letter-spacing: 0.02em;
  color: #ffffff;
  background: transparent;
  border: none;
  outline: none;
  margin-left: 3px;

  /* Chrome, Safari, Edge, Opera */
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  &[type="number"] {
    -moz-appearance: textfield;
  }
`;

const InputContainer = styled.div`
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)),
    #202025;
  border-radius: 12px;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  text-align: right;
  color: #b7b8cd;
  width: 200px;
  display: flex;
  justify-content: flex-end;
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
  color: #ffffff;
  background: #4a3ce8;
  border-radius: 16px;
  cursor: pointer;
`;

const Image = styled.img``;

const MaxButton = styled.button`
  all: unset;
  padding: "6px 13px";
  cursor: pointer;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 47.78px;
  height: 27px;
  border-radius: 16px;
  font-weight: 600;
  font-size: 12px;
  line-height: 15px;
  color: #ffffff;
`;

const DEFAULT_LP = {
  QVE: 0,
  mQVE: 0,
};

const DEFAULT_MAX = {
  QVE: false,
  mQVE: false,
};

export const DEVNET_NODE_URL = "https://fullnode.testnet.aptoslabs.com/v1";

const aptosClient = new AptosClient(DEVNET_NODE_URL, {
  WITH_CREDENTIALS: false,
});

function AddLiquidity({ setLiquidityCount, rate, rates }) {
  const { signAndSubmitTransaction } = useWallet();
  const [available] = useAvailable();
  const POOL_RATE = Math.ceil(rate);
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(false);

  const [values, setValues] = useState({
    QVE: 0,
    mQVE: 0,
  });
  const [maxValue, setMaxValue] = useState({ QVE: 0, mQVE: 0 });
  const [max, setMax] = useState(false);

  const AddingLiquidityPetra = async () => {
    // const moduleAddress = process.env.REACT_APP_MODULE_ADDRESS;
    const moduleAddress = `0xf9ecb89020d67e318321ea2848029d40c1f96d5aecca78f5e75872e7122a786a`;

    const payload = {
      type: "entry_function_payload",
      function: `${moduleAddress}::pool::add_liquidity_stable`,
      arguments: [
        parseInt(100000000 * values.QVE),
        parseInt(100000000 * values.mQVE),
      ],
      type_arguments: [
        `${moduleAddress}::coins::QVE`,
        `${moduleAddress}::coins::MQVE`,
      ],
    };

    try {
      const response = await signAndSubmitTransaction(payload);
      await aptosClient.waitForTransaction(response?.hash || "");
      return "success";
    } catch (error) {
      return "err";
    }
  };

  const onOpenModal = () => {
    setModal(true);
    AddingLiquidityPetra().then((res) => {
      console.log(res);
      setLoading(false);
      if (res === "success") setErr(false);
      else if (res === "err") setErr(true);
    });
  };

  const regNumber = (value) => {
    const regex = /^-?\d+(?:\.\d{1,6})?/;
    return Number(value.toString().match(regex)[0]);
  };

  const onChangeInput = (e) => {
    const name = e.target.name;
    const value = inputNumberReg(e);
    switch (name) {
      case "QVE":
        if (maxValue.QVE <= value) {
          setValues({ QVE: maxValue.QVE, mQVE: maxValue.mQVE });
          setMax(true);
          break;
        }
        setValues({ QVE: value, mQVE: regNumber(value * POOL_RATE) });
        setMax(false);
        break;
      case "mQVE":
        if (available.mQVE.available <= value) {
          setValues({ QVE: maxValue.QVE, mQVE: maxValue.mQVE });
          setMax(true);
          break;
        }
        setValues({ QVE: regNumber(value / POOL_RATE), mQVE: value });
        setMax(false);
        break;
    }
  };

  useEffect(() => {
    //QVE에게 맞춰야하는 상황
    if (available.QVE.available * POOL_RATE <= available.mQVE.available)
      setMaxValue({
        QVE: regNumber(available.QVE.available),
        mQVE: regNumber(available.QVE.available * POOL_RATE),
      });
    //mQVE한테 맞춰야하는 상황
    else
      setMaxValue({
        QVE: regNumber(available.mQVE.available / POOL_RATE),
        mQVE: regNumber(available.mQVE.available),
      });
  }, [available.QVE.available, available.mQVE.available]);

  useEffect(() => {
    setLoading(true);
    setErr(false);
  }, [modal]);

  return (
    <Outer>
      <GoToTop />
      <Text>Pool</Text>
      <EContainer style={{ height: "10px" }} />
      <Text style={{ fontSize: "18px", lineHeight: "24px" }}>
        Add Liquidity
      </Text>
      <EContainer style={{ height: "25px" }} />
      <Container>
        <EContainer
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <EContainer
            style={{
              fontWeight: "500",
              fontSize: "14px",
              lineHeight: "17px",
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image src={Qve} style={{ width: "32px", height: "32px" }} />
            <EContainer style={{ width: "3px" }} />
            <Input
              placeholder="Amount"
              value={values.QVE}
              name="QVE"
              onChange={onChangeInput}
            ></Input>
          </EContainer>
          <MaxButton
            onClick={() => {
              setValues(maxValue);
              setMax(true);
            }}
            style={{ backgroundColor: max ? "#5C5E81" : "#4a3ce8" }}
          >
            MAX
          </MaxButton>
        </EContainer>
        <EContainer style={{ height: "9.5px" }} />
        <EContainer
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <EContainer
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <EContainer style={{ width: "5px" }} />
            <Text style={{ fontSize: "12px", lineHeight: "15px" }}>QVE</Text>
            <EContainer style={{ width: "3px" }} />
            <Text
              style={{
                fontWeight: "700",
                fontSize: "12px",
                lineHeight: "15px",
                color: "#5C5E81",
              }}
            >
              {rates[0]}%
            </Text>
          </EContainer>
          <EContainer
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontWeight: "400",
                fontSize: "11px",
                lineHeight: "13px",
                color: "#5C5E81",
              }}
            >
              Available
            </Text>
            <EContainer style={{ width: "4px" }}></EContainer>
            <Text
              style={{
                fontWeight: "400",
                fontSize: "11px",
                lineHeight: "13px",
                color: "#4A3CE8",
              }}
            >
              {available.QVE.available.toFixed(2)} QVE
            </Text>
          </EContainer>
        </EContainer>
      </Container>
      <EContainer style={{ height: "10px" }} />
      <EContainer
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "absolute",
        }}
      ></EContainer>
      <Container>
        <EContainer
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <EContainer
            style={{
              fontWeight: "500",
              fontSize: "14px",
              lineHeight: "17px",
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image src={arbQve} style={{ width: "32px", height: "32px" }} />
            <EContainer style={{ width: "3px" }} />
            <Input
              type="number"
              placeholder="Amount"
              value={values.mQVE}
              name="mQVE"
              onChange={onChangeInput}
            ></Input>
          </EContainer>
          <MaxButton
            onClick={() => setValues(maxValue)}
            style={{ backgroundColor: max ? "#5C5E81" : "#4a3ce8" }}
          >
            MAX
          </MaxButton>
        </EContainer>
        <EContainer style={{ height: "9.5px" }} />
        <EContainer
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <EContainer
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <EContainer style={{ width: "5px" }} />
            <Text style={{ fontSize: "12px", lineHeight: "15px" }}>mQVE</Text>
            <EContainer style={{ width: "3px" }} />
            <Text
              style={{
                fontWeight: "700",
                fontSize: "12px",
                lineHeight: "15px",
                color: "#5C5E81",
              }}
            >
              {rates[1]}%
            </Text>
          </EContainer>
          <EContainer
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontWeight: "400",
                fontSize: "11px",
                lineHeight: "13px",
                color: "#5C5E81",
              }}
            >
              Available
            </Text>
            <EContainer style={{ width: "4px" }}></EContainer>
            <Text
              style={{
                fontWeight: "400",
                fontSize: "11px",
                lineHeight: "13px",
                color: "#4A3CE8",
              }}
            >
              {available.mQVE.available.toFixed(2)} mQVE
            </Text>
          </EContainer>
        </EContainer>
      </Container>
      <EContainer style={{ height: "15px" }} />
      {values.QVE !== "" &&
      values.QVE !== 0 &&
      values.mQVE !== "" &&
      values.mQVE !== 0 ? (
        <Button onClick={() => onOpenModal()}>Add Liquidity</Button>
      ) : (
        <Button style={{ background: "#5C5E81" }}>Amount is Empty</Button>
      )}
      <EContainer style={{ height: "100px" }} />
      {modal ? (
        <Modal
          modal={modal}
          setModal={setModal}
          loading={loading}
          err={err}
          title={"Adding Liquidity"}
          subtitle={`Waiting for Add Liquidity to be\nincluded in the block`}
          success={`Add Liquidity Successful!`}
        />
      ) : (
        <></>
      )}
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
