import styled from "styled-components";
import QveImage from "../../assets/img/SwapImage.png";
import Qve from "../../assets/img/Qve.svg";
import arbQve from "../../assets/img/arbQve.svg";
import Web3 from "web3";
import SwapIcon from "../../assets/img/SwapIcon.png";
import { useState, useEffect } from "react";
import Contract from "../../assets/contract/contract.js";
import ContractAddress from "../../assets/contract/contractAddress";
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
  background: #4a3ce8;
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
`;

function SwaparbQVEtoQVE({ setIcon }) {
  const [depositAmount, setDepositAmount] = useState("");
  const [arbQvePriceSwap, setArbQvePriceSwap] = useState("");
  const [connected, setConnected] = useState("");
  const qveContract = Contract();
  const Address = ContractAddress();
  const [AtoB, setAtoB] = useState("");
  const [maxarbQVE, setMaxarbQVE] = useState("");
  const web3 = new Web3(window.ethereum);
  // let account = JSON.parse(localStorage.getItem('user'));
  // function SwapAtoB() {
  //     qveContract.ArbQVEContract.methods.approve(Address.LiquidityAddress, web3.utils.toBN(depositAmount * 10**18)).send({ from: account });

  //     qveContract.LiquidityContract.methods.swapAtoB(web3.utils.toBN(depositAmount * 10**18)).send({ from: account });
  // }

  // const getSwapAData = qveContract.LiquidityContract.methods.getSwapAtoBReturnAmount(web3.utils.toBN(depositAmount * 10**18)).call();
  // const getSwapAtoBCurrency = qveContract.LiquidityContract.methods.getSwapAtoBReturnAmount(web3.utils.toBN(1 * 10**18)).call();
  // const getMaxarbQVE = qveContract.ArbQVEContract.methods.balanceOf(account).call();
  // getSwapAData.then((result) => {
  //     setArbQvePriceSwap(result);
  //   });
  // getSwapAtoBCurrency.then((result) => {
  //     setAtoB(result);
  // });
  // getMaxarbQVE.then((result) => {
  //     setMaxarbQVE(result)
  // });
  const getAptosWallet = () => {
    if ("aptos" in window) {
      return window.aptos;
    } else {
      window.open("https://petra.app/", `_blank`);
    }
  };
  const wallet = getAptosWallet();

  async function Connect() {
    console.log("connnect");
    setDepositAmount("");
    try {
      await wallet.connect();
      const account = await wallet.account();
      localStorage.setItem("user", JSON.stringify(account.address));
      setIcon(1);
    } catch (error) {}
  }
  // get current connection status
  // console.log('conneectttttted', window.aptos.isConnected());
  // console.log('user is ', JSON.parse(localStorage.getItem('user')));
  try {
    let connectionStatus = wallet.isConnected();
    connectionStatus.then((result) => {
      setConnected(result);
    });
    // // event listener for disconnecting
    // window.aptos.onDisconnect(() => {
    //   connectionStatus = false;
    // });
  } catch (error) {}

  function SwapArbtoQVE() {
    const transaction = {
      type: "entry_function_aptos_transfer",
      function:
        "0x393368cfe77fda732c00f6a2b865bf89cf5bcf723c93a20547ebcd6f7a02ea07::liqpool::swapArbtoQve",
      arguments: [depositAmount * 10 ** 8],
      type_arguments: [],
    };

    window.aptos.signAndSubmitTransaction(transaction).then(() => {
      console.log("전송 성공");
    });
  }

  // console.log('connectionStatusconnected', connectionStatus);

  return (
    <Background>
      <EContainer style={{ height: "132px" }} />
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
                <Image src={arbQve} style={{ width: "31px", height: "32px" }} />
                <Input
                  type="number"
                  placeholder="Amount"
                  value={depositAmount}
                  onChange={(e) => setDepositAmount(e.target.value)}
                ></Input>
              </EContainer>
              <MaxButton
                onClick={() =>
                  setDepositAmount((maxarbQVE / 10 ** 18).toFixed(2))
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
                  {(maxarbQVE / 10 ** 18).toFixed(2)} mQVE
                </Text>
              </EContainer>
            </EContainer>
          </TokenOneContainer>
          <EContainer style={{ height: "10px" }} />
          <EContainer
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              position: "absolute",
            }}
          >
            <Image
              src={SwapIcon}
              style={{
                position: "relative",
                top: "-165px",
                cursor: "pointer",
                width: "100px",
                height: "100px",
              }}
              onClick={() => setIcon(1)}
            />
          </EContainer>
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
                <Image src={Qve} style={{ width: "31px", height: "32px" }} />
                <Input
                  placeholder="Amount"
                  value={depositAmount}
                  onChange={(e) => setDepositAmount(e.target.value)}
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
                  {(maxarbQVE / 10 ** 18).toFixed(2)} QVE
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
              1 mQVE ≈ {(AtoB / 10 ** 18).toFixed(2)} QVE
            </Text>
          </EContainer>
          <EContainer style={{ height: "20px" }}></EContainer>

          {localStorage.getItem('user') === null ||  localStorage.getItem('user') === undefined ? (
            <Button onClick={() => Connect()}>Connect Wallet</Button>
          ) : depositAmount === "" ? (
            <Button style={{ background: "#5C5E81" }}>Amount is Empty</Button>
          ) : (
            <Button onClick={() => SwapArbtoQVE()}>Swap</Button>
          )}

          <BackgroudImage src={QveImage}></BackgroudImage>
        </SwapContainer>
      </EContainer>
    </Background>
  );
}

export default SwaparbQVEtoQVE;
