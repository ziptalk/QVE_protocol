import styled from "styled-components";
import QveImage from "../../assets/img/SwapImage.png";
import Qve from "../../assets/img/Qve.svg";
import arbQve from "../../assets/img/arbQve.svg";
import LiquidityArtifact from "../../artifact/LiquidityPool.json";
import arbQveArtifact from "../../artifact/ArbQVE.json";
import QveArtifact from "../../artifact/Qve.json";
import Web3 from "web3";
import SwapIcon from "../../assets/img/SwapIcon.svg";
import { useState } from "react";
import Contract from "../../assets/contract/contract.js";
import ContractAddress from "../../assets/contract/contractAddress";
import { useEffect } from "react";
import { useAvailable } from "../../hooks/useAvailable";
import Modal from "../../common/modal";
import { CustomWalletSelector } from "../../common/CustomConnectButton";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { AptosClient } from "aptos";
import { inputNumberReg } from "../../hooks/reg";

/**
 * QVE -> mQVE 전환시 비율
 * 1QVE = 비율 * mQVE
 */
const QVE_TO_MQVE = 1;
const DEVNET_NODE_URL = "https://fullnode.testnet.aptoslabs.com/v1";
const aptosClient = new AptosClient(DEVNET_NODE_URL, {
  WITH_CREDENTIALS: false,
});

function SwapQVEtoarbQVE({ setIcon }) {
  const qveContract = Contract();
  const Address = ContractAddress();
  const [depositAmount, setDepositAmount] = useState("");
  // const [connected, setConnected] = useState("");
  const [qvePriceSwap, setQvePriceSwap] = useState("");
  const [arbQvePriceSwap, setArbQvePriceSwap] = useState("");
  const [BtoA, setBtoA] = useState("");
  const [maxQve, setMaxQve] = useState("");
  const [max, setMax] = useState(false);
  const [available] = useAvailable();
  const [modal, setModal] = useState(false);
  const { connected, signAndSubmitTransaction } = useWallet();

  const [values, setValues] = useState({
    available: 0,
    amount: "",
  });

  const [successAlertMessage, setSuccessAlertMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(false);

  useEffect(() => {
    setValues({ ...values, available: available.QVE.available });
    if (available.QVE.available > values.amount) setMax(false);
  }, [available]);

  //솔리디티 관련 코드들
  //   const web3 = new Web3(window.ethereum);
  //   let account = JSON.parse(localStorage.getItem("user"));

  // function SwapBtoA() {
  //     qveContract.QVEContract.methods.approve(Address.LiquidityAddress, web3.utils.toBN(depositAmount * 10**18)).send({ from: account });

  //     qveContract.LiquidityContract.methods.swapBtoA(web3.utils.toBN(depositAmount * 10**18)).send({ from: account });

  // }

  // const getSwapBData = qveContract.LiquidityContract.methods.getSwapBtoAReturnAmount(web3.utils.toBN(depositAmount * 10**18)).call();
  // const getSwapBtoACurrency = qveContract.LiquidityContract.methods.getSwapBtoAReturnAmount(web3.utils.toBN(1 * 10**18)).call();
  // const getMaxQve = qveContract.QVEContract.methods.balanceOf(account).call();
  // getSwapBData.then((result) => {
  //     setQvePriceSwap(result);
  //   });
  // getSwapBtoACurrency.then((result) => {
  //     setBtoA(result);
  // });
  // getMaxQve.then((result) => {
  //     setMaxQve(result)
  // });
  const getAptosWallet = () => {
    if ("aptos" in window) {
      return window.aptos;
    } else {
      window.open("https://petra.app/", `_blank`);
    }
  };
  const wallet = getAptosWallet();

  const SwapQVEtoArb = async () => {
    // const moduleAddress = process.env.REACT_APP_MODULE_ADDRESS;
    const moduleAddress = `0xf9ecb89020d67e318321ea2848029d40c1f96d5aecca78f5e75872e7122a786a`;

    const payload = {
      type: "entry_function_payload",
      function: `${moduleAddress}::pool::stable_swap`,
      arguments: [parseInt(100000000 * values.amount)],
      type_arguments: [
        `${moduleAddress}::coins::QVE`,
        `${moduleAddress}::coins::MQVE`,
      ],
    };

    try {
      const response = await signAndSubmitTransaction(payload);
      await aptosClient.waitForTransaction(response?.hash || "");
      setSuccessAlertMessage(
        `https://explorer.aptoslabs.com/txn/${response?.hash}`
      );
      return "success";
    } catch (error) {
      return "err";
    }
  };

  const onSwap = () => {
    setModal(true);
    SwapQVEtoArb().then((res) => {
      console.log(res);
      setLoading(false);
      if (res === "success") setErr(false);
      else if (res === "err") setErr(true);
    });
  };

  // async function Connect() {
  //   console.log("connnect");
  //   try {
  //     await wallet.connect();
  //     const account = await wallet.account();
  //     localStorage.setItem("user", JSON.stringify(account.address));
  //     window.location.reload();
  //   } catch (error) {}
  // }

  // try {
  //   let connectionStatus = wallet.isConnected();
  //   connectionStatus.then((result) => {
  //     setConnected(result);
  //   });
  // } catch (error) {}

  const onInputAmount = (e) => {
    const newValues = {
      ...values,
      amount: inputNumberReg(e),
    };
    setValues(newValues);
  };

  useEffect(() => {
    if (values.amount >= values.available) {
      const fullValues = {
        ...values,
        amount: values.available,
      };
      setValues(fullValues);
      setMax(true);
    } else {
      setMax(false);
    }
  }, [values.amount]);

  useEffect(() => {
    setLoading(true);
    setErr(false);
  }, [modal]);

  return (
    <Background>
      <EContainer style={{ height: "45px" }}></EContainer>
      <EContainer style={{ width: "90%", maxWidth: "374px" }}>
        <Text
          style={{ fontWeight: "700", fontSize: "24px", lineHeight: "36px" }}
        >
          Swap
        </Text>
      </EContainer>
      <EContainer style={{ height: "0px" }}></EContainer>
      <EContainer style={{ display: "flex", justifyContent: "center" }}>
        <SwapContainer>
          <EContainer style={{ height: "10px" }}></EContainer>
          <TokenOneContainer>
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
                <Image src={Qve} style={{ width: "31px", height: "32px" }} />
                <Input
                  type="number"
                  placeholder="Amount"
                  value={values.amount}
                  onChange={onInputAmount}
                ></Input>
              </EContainer>
              <MaxButton
                style={{ backgroundColor: max ? "#5C5E81" : "#4A3CE8" }}
                onClick={() =>
                  // setDepositAmount((maxarbQVE / 10 ** 18).toFixed(2))
                  setValues({
                    ...values,
                    amount: values.available,
                  })
                }
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
                <Text>QVE</Text>
                <EContainer style={{ width: "3px" }} />
                <Text
                  style={{
                    fontWeight: "400",
                    fontSize: "11px",
                    lineHeight: "13px",
                    color: "#5C5E81",
                  }}
                >
                  QVE Protocol
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
                <Text style={{ color: "#5C5E81" }}>Available</Text>
                <EContainer style={{ width: "4px" }}></EContainer>
                <Text style={{ color: "#4A3CE8" }}>
                  {values.available.toFixed(2)} QVE
                </Text>
              </EContainer>
            </EContainer>
          </TokenOneContainer>
          <EContainer style={{ height: "10px" }} />
          {/* <EContainer
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              position: "absolute",
              top: 81,
              left: "50%",
              transform: "translateX(-50%)",
              cursor: "pointer",
            }}
          >
            <Image
              src={SwapIcon}
              onClick={() => setIcon(0)}
              style={{ width: 45, height: 45 }}
            />
          </EContainer> */}
          <IconWrapper>
            <Image
              src={SwapIcon}
              onClick={() => setIcon(0)}
              style={{ width: 45, height: 45 }}
            />
          </IconWrapper>
          <TokenTwoContainer>
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
                <Image src={arbQve} style={{ width: "31px", height: "32px" }} />
                <Input
                  placeholder="Amount"
                  value={values.amount * QVE_TO_MQVE}
                  onChange={onInputAmount}
                ></Input>
              </EContainer>
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
                <Text>mQVE</Text>
                <EContainer style={{ width: "3px" }} />
                <Text
                  style={{
                    fontWeight: "400",
                    fontSize: "11px",
                    lineHeight: "13px",
                    color: "#5C5E81",
                  }}
                >
                  Market Making QVE
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
                <Text style={{ color: "#5C5E81" }}>Available</Text>
                <EContainer style={{ width: "4px" }}></EContainer>
                <Text style={{ color: "#4A3CE8" }}>
                  {available.mQVE.available.toFixed(2)} mQVE
                </Text>
              </EContainer>
            </EContainer>
          </TokenTwoContainer>
          <EContainer style={{ height: "20px" }}></EContainer>
          <EContainer
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "flex-start",
            }}
          >
            <Text
              style={{
                fontWeight: "400",
                fontSize: "11px",
                lineHeight: "13px",
                paddingLeft: "10px",
                color: "#B7B8CD",
              }}
            >
              1 QVE ≈ {QVE_TO_MQVE.toFixed(2)} mQVE
            </Text>
          </EContainer>
          <EContainer style={{ height: "20px" }}></EContainer>

          {!connected ? (
            // <Button onClick={() => Connect()}>Connect Wallet</Button>
            <CustomWalletSelector style={{ height: 55, borderRadius: 16 }} />
          ) : values.amount === "" || values.amount === 0 ? (
            <Button style={{ background: "#5C5E81" }}>Amount is Empty</Button>
          ) : (
            <Button onClick={() => onSwap()}>Swap</Button>
          )}

          <BackgroudImage src={QveImage}></BackgroudImage>
        </SwapContainer>
      </EContainer>
      {modal ? (
        <Modal
          modal={modal}
          setModal={setModal}
          loading={loading}
          err={err}
          title={"Transaction Broadcasting"}
          subtitle={"Waiting for transaction to be\nincluded in the block"}
          success={"Transaction Successfull!"}
        />
      ) : (
        <></>
      )}
    </Background>
  );
}

export default SwapQVEtoarbQVE;

const Background = styled.div`
  background-color: #1b1a1e;
  height: 100vh;
  display: flex;
  flex-direction: column;

  align-items: center;
`;
const EContainer = styled.div``;

const SwapContainer = styled.div`
  max-width: 374px;
  display: flex;
  flex-direction: column;
  border-radius: 16px;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const Text = styled.div`
  font-weight: 700;
  font-size: 12px;
  line-height: 15px;
  letter-spacing: 0.02em;
  color: #ffffff;
`;

const TokenOneContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 16px 25px 16px 25px;
  background: rgba(43, 43, 52, 0.9);
  border-radius: 16px;
`;

const TokenTwoContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 16px 25px 16px 25px;
  background: rgba(43, 43, 52, 0.9);
  border-radius: 16px;
`;

const BackgroudImage = styled.img`
  width: 100%;
  z-index: 1;
`;

const Button = styled.button`
  all: unset;
  cursor: pointer;
  width: 100%;
  height: 55px;
  background: #4a3ce8;
  border-radius: 16px;
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
  text-align: center;
  color: #ffffff;
`;

const MaxButton = styled.button`
  all: unset;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  padding: 7px 13px;
  border-radius: 16px;
  font-weight: 600;
  font-size: 12px;
  line-height: 15px;
  color: #ffffff;
`;

const Image = styled.img``;

const Input = styled.input`
  font-weight: 700;
  font-size: 18px;
  line-height: 24px;
  text-align: left;
  letter-spacing: 0.02em;
  color: #b7b8cd;
  background: transparent;
  border: none;
  outline: none;
  margin-left: 6px;
  color: #ffffff;

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

const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 81px;
  left: 50%;
  transform: translateX(-50%);
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    transform: translateX(-50%) rotate(-180deg);
  }
`;
