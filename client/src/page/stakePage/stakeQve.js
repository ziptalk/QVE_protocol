import styled from "styled-components";
import XImg from "../../assets/img/x.png";
import BackgroundImage from "../../assets/img/SwapImage.png";
import Web3 from "web3";
import QveArtifact from "../../artifact/Qve.json";
import stakeArtifact from "../../artifact/Stake.json";
import { useState } from "react";
import Contract from "../../assets/contract/contract";
import ContractAddress from "../../assets/contract/contractAddress";
import GoToTop from "../../common/GotoTop";
import Qve from "../../assets/img/Qve.svg";
import arbQve from "../../assets/img/arbQve.svg";
const Background = styled.div`
  height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const EContainer = styled.div``;

const Text = styled.div`
  font-weight: 700;
  font-size: 24px;
  line-height: 36px;
  /* identical to box height, or 150% */

  letter-spacing: 0.02em;

  /* dark/label */

  color: #b7b8cd;
`;

const StakeContainer = styled.div`
  display: flex;
  flex-direction: column;

  background: #2b2b34;
  border-radius: 16px;
  padding: 30px 27px 25px 27px;
`;

const Image = styled.img``;

const Button = styled.button`
  all: unset;
  cursor: pointer;
  height: 55px;
  width: 100%;
  background: #4a3ce8;
  border-radius: 16px;
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
  /* identical to box height */

  text-align: center;

  /* dark/white */

  color: #ffffff;
`;

const Input = styled.input`
  all: unset;
  font-weight: 700;
  font-size: 16px;
  line-height: 19px;
  color: #ffffff;
  width: 50%;
`;

const MaxButton = styled.button`
  all: unset;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background: #4a3ce8;
  border-radius: 16px;
  font-weight: 700;
  font-size: 9px;
  line-height: 11px;
  letter-spacing: 0.02em;
  color: #ffffff;
  padding: 7px 13px;
`;

function StakeQve({ setCount }) {
  const [amount, setAmount] = useState("");
  const [qveBalance, setQveBalance] = useState("");
  //솔리디티 관련 코드들
//   const web3 = new Web3(window.ethereum);
//   const qveContract = Contract();
//   const Address = ContractAddress();
//   let account = JSON.parse(localStorage.getItem("user"));

  //Move 코드
  function stakeQvePetra() {
    const transaction = {
      type: "entry_function_aptos_transfer",
      function:
        "0x393368cfe77fda732c00f6a2b865bf89cf5bcf723c93a20547ebcd6f7a02ea07::stake::staked_Qve",
      arguments: [amount * 10 ** 8],
      type_arguments: [],
    };

    window.aptos.signAndSubmitTransaction(transaction).then(() => {
      console.log("전송 성공");
    });
  }

  //solidity 코드
  // function stakeQve() {
  //     qveContract.QVEContract.methods.approve(Address.StakeAddress, web3.utils.toBN(amount * 10**18)).send({ from: account });

  //     qveContract.StakeContract.methods.StakeQVE(web3.utils.toBN(amount * 10**18)).send({ from: account });
  // }

  // const availableQVE = qveContract.QVEContract.methods.balanceOf(account).call();

  // availableQVE.then((result) => {
  //     setQveBalance(result);
  // })

  return (
    <Background>
      <EContainer style={{ height: "132px" }}></EContainer>
      <EContainer style={{ width: "90%", maxWidth: "374px" }}>
        <Text
          style={{ fontWeight: "700", fontSize: "24px", lineHeight: "36px" }}
        >
          Stake
        </Text>
        <EContainer style={{ height: "10px" }} />
        <StakeContainer>
          <EContainer
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <EContainer style={{ display: "flex", flexDirection: "row" }}>
              <Image
                src={Qve}
                style={{ width: "54.72px", height: "57.53px" }}
              ></Image>
              <EContainer style={{ width: "20px" }} />
              <EContainer style={{ display: "flex", flexDirection: "column" }}>
                <Text
                  style={{
                    fontWeight: "700",
                    fontSize: "24px",
                    lineHeight: "36px",
                    color: "#FFFFFF",
                  }}
                >
                  QVE
                </Text>
                <Text
                  style={{
                    fontWeight: "600",
                    fontSize: "14px",
                    lineHeight: "17px",
                    color: "#5C5E81",
                  }}
                >
                  Staking Pool
                </Text>
              </EContainer>
            </EContainer>
            <EContainer
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-evenly",
              }}
            >
              <EContainer
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-evenly",
                }}
              >
                <Text
                  style={{
                    fontWeight: "700",
                    fontSize: "12px",
                    lineHeight: "15px",
                    color: "#B7B8CD",
                  }}
                >
                  APY
                </Text>
                <Text
                  style={{
                    fontWeight: "700",
                    fontSize: "12px",
                    lineHeight: "15px",
                    color: "#B7B8CD",
                  }}
                >
                  TVL
                </Text>
              </EContainer>
              <EContainer style={{ width: "14px" }} />
              <EContainer
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-evenly",
                  alignItems: "flex-end",
                }}
              >
                <Text
                  style={{
                    fontWeight: "700",
                    fontSize: "16px",
                    lineHeight: "19px",
                    color: "#FFFFFF",
                  }}
                >
                  12.3%
                </Text>
                <Text
                  style={{
                    fontWeight: "700",
                    fontSize: "16px",
                    lineHeight: "19px",
                    color: "#FFFFFF",
                  }}
                >
                  $12.3M
                </Text>
              </EContainer>
            </EContainer>
          </EContainer>
          <EContainer style={{ height: "36px" }} />
          <EContainer
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Input
              type="number"
              placeholder="Amount"
              style={{ flexGrow: "1", paddingRight: "5px" }}
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <MaxButton>MAX</MaxButton>
          </EContainer>
          <EContainer style={{ height: "13px" }} />
          <EContainer
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <EContainer
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text
                style={{
                  fontWeight: "700",
                  fontSize: "12px",
                  lineHeight: "15px",
                  color: "#FFFFFF",
                }}
              >
                QVE
              </Text>
              <EContainer style={{ width: "3px" }} />
              <Text
                style={{
                  fontWeight: "600",
                  fontSize: "12px",
                  lineHeight: "15px",
                  color: "#5C5E81",
                }}
              >
                50%
              </Text>
            </EContainer>
            <EContainer
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
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
              <EContainer style={{ width: "4px" }} />
              <Text
                style={{
                  fontWeight: "400",
                  fontSize: "11px",
                  lineHeight: "13px",
                  color: "#4A3CE8",
                }}
              >
                0 QVE
              </Text>
            </EContainer>
          </EContainer>
          <EContainer style={{ height: "30px" }} />
          {amount === "" ? (
            <Button style={{ background: "#5C5E81" }}>Amount is Empty</Button>
          ) : (
            <Button onClick={() => stakeQvePetra()}>Swap</Button>
          )}
        </StakeContainer>
        <EContainer style={{ height: "25px" }} />
        <StakeContainer>
          <EContainer
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <EContainer style={{ display: "flex", flexDirection: "row" }}>
              <Image
                src={arbQve}
                style={{ width: "54.72px", height: "57.53px" }}
              ></Image>
              <EContainer style={{ width: "20px" }} />
              <EContainer style={{ display: "flex", flexDirection: "column" }}>
                <Text
                  style={{
                    fontWeight: "700",
                    fontSize: "24px",
                    lineHeight: "36px",
                    color: "#FFFFFF",
                  }}
                >
                  arbQVE
                </Text>
                <Text
                  style={{
                    fontWeight: "600",
                    fontSize: "14px",
                    lineHeight: "17px",
                    color: "#5C5E81",
                  }}
                >
                  Staking Pool
                </Text>
              </EContainer>
            </EContainer>
            <EContainer
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-evenly",
              }}
            >
              <EContainer
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-evenly",
                }}
              >
                <Text
                  style={{
                    fontWeight: "700",
                    fontSize: "12px",
                    lineHeight: "15px",
                    color: "#B7B8CD",
                  }}
                >
                  APY
                </Text>
                <Text
                  style={{
                    fontWeight: "700",
                    fontSize: "12px",
                    lineHeight: "15px",
                    color: "#B7B8CD",
                  }}
                >
                  TVL
                </Text>
              </EContainer>
              <EContainer style={{ width: "14px" }} />
              <EContainer
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-evenly",
                  alignItems: "flex-end",
                }}
              >
                <Text
                  style={{
                    fontWeight: "700",
                    fontSize: "16px",
                    lineHeight: "19px",
                    color: "#FFFFFF",
                  }}
                >
                  12.3%
                </Text>
                <Text
                  style={{
                    fontWeight: "700",
                    fontSize: "16px",
                    lineHeight: "19px",
                    color: "#FFFFFF",
                  }}
                >
                  $12.3M
                </Text>
              </EContainer>
            </EContainer>
          </EContainer>
          <EContainer style={{ height: "30px" }} />
          <Button
            onClick={() => {
              setCount(2);
            }}
          >
            Stake
          </Button>
        </StakeContainer>
      </EContainer>
    </Background>
  );
}

export default StakeQve;

/*
const [amount, setAmount] = useState('');
    const [connected, setConnected] = useState('');
    const [qveBalance, setQveBalance] = useState('');
    const web3 = new Web3(window.ethereum);
    const qveContract = Contract();
    const Address = ContractAddress();
    let account = JSON.parse(localStorage.getItem('user'));


    function stakeQvePetra() {
        const transaction = {
            type: "entry_function_aptos_transfer",
            function: '0x393368cfe77fda732c00f6a2b865bf89cf5bcf723c93a20547ebcd6f7a02ea07::stake::staked_Qve',
            arguments: [amount * 10**8],
            type_arguments: [],
        };
        
        window.aptos.signAndSubmitTransaction(transaction).then(() => {
            console.log("전송 성공");
        })
    }
   

    // function stakeQve() {
    //     qveContract.QVEContract.methods.approve(Address.StakeAddress, web3.utils.toBN(amount * 10**18)).send({ from: account });

    //     qveContract.StakeContract.methods.StakeQVE(web3.utils.toBN(amount * 10**18)).send({ from: account });
    // }

    // const availableQVE = qveContract.QVEContract.methods.balanceOf(account).call();

    // availableQVE.then((result) => {
    //     setQveBalance(result);
    // })
*/
