import styled from "styled-components";
import XImg from "../../assets/img/x.png";
import BackgroundImage from "../../assets/img/SwapImage.png";
import Web3 from "web3";
import QveArtifact from "../../artifact/Qve.json";
import stakeArtifact from "../../artifact/Stake.json";
import { useState, useEffect } from "react";
import Contract from "../../assets/contract/contract";
import ContractAddress from "../../assets/contract/contractAddress";
import GoToTop from "../../common/GotoTop";
import Qve from "../../assets/img/Qve.svg";
import arbQve from "../../assets/img/arbQve.svg";
import StakingModal from "./modal";
import { useAvailable } from "../../hooks/useAvailable";

function StakeArbQve({ setCount }) {
  const [amount, setAmount] = useState("");
  const [values, setValues] = useState({
    amount: "",
    available: 1.2345,
  });
  const [max, setMax] = useState(false);
  const [modal, setModal] = useState(false);
  const [connected, setConnected] = useState("");
  const [arbQveBalance, setArbQveBalance] = useState("");
  const [available] = useAvailable();

  useEffect(() => {
    setValues({ ...values, available: available.mQVE.available });
  }, [available]);

  //솔리디티 관련 코드들
  //   const qveContract = Contract();
  //   const Address = ContractAddress();
  //   const web3 = new Web3(window.ethereum);
  //   let account = JSON.parse(localStorage.getItem("user"));

  //솔리티 컨트랙트 연결
  /* function stakeArbQve() {
        qveContract.ArbQVEContract.methods.approve(Address.StakeAddress, web3.utils.toBN(amount * 10**18)).send({ from: account });

        qveContract.StakeContract.methods.StakeArbQVE(web3.utils.toBN(amount * 10**18)).send({ from: account });
    }

    const availableArbQVE = qveContract.ArbQVEContract.methods.balanceOf(account).call();
    availableArbQVE.then((result) => {
        console.log('arbQVEbalance',result);
        setArbQveBalance(result);
    }) */

  //Move 칸트랙트 연결
  function stakeArbQvePetra() {
    //에러 발생하는 중, 임시로 스테이킹 풀 완료되었다는 모달 첨가
    // const transaction = {
    //   type: "entry_function_aptos_transfer",
    //   function:
    //     "0x393368cfe77fda732c00f6a2b865bf89cf5bcf723c93a20547ebcd6f7a02ea07::stake::staked_arbQVE",
    //   arguments: [amount * 10 ** 8],
    //   type_arguments: [],
    // };

    // window.aptos.signAndSubmitTransaction(transaction).then(() => {
    //   console.log("전송 성공");
    // });

    setModal(true);
  }

  const onChangeInput = (e) => {
    const newNum = e.target.value;
    if (newNum >= values.available) {
      setValues({
        ...values,
        amount: values.available,
      });
      setMax(true);
    } else {
      setValues({
        ...values,
        amount: newNum,
      });
      setMax(false);
    }
  };

  useEffect(() => {
    if (values.amount >= values.available) {
      setValues({
        ...values,
        amount: values.available,
      });
      setMax(true);
    } else {
      setMax(false);
    }
  }, [values.amount]);

  return (
    <Background>
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
          <EContainer style={{ height: "30px" }} />
          <Button
            onClick={() => {
              setCount(1);
            }}
          >
            Stake
          </Button>
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
              value={values.amount}
              onChange={onChangeInput}
            />
            <MaxButton
              style={{ backgroundColor: max ? "#5C5E81" : "#4A3CE8" }}
              onClick={() => setValues({ ...values, amount: values.available })}
            >
              MAX
            </MaxButton>
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
                {`${values.available.toFixed(2)} QVE`}
              </Text>
            </EContainer>
          </EContainer>
          <EContainer style={{ height: "30px" }} />
          {(values.amount === "") | (values.amount === 0) ? (
            <Button style={{ background: "#5C5E81" }}>Amount is Empty</Button>
          ) : (
            <Button onClick={() => stakeArbQvePetra()}>Stake</Button>
          )}
        </StakeContainer>
      </EContainer>
      {modal ? <StakingModal setModal={setModal} /> : <></>}
    </Background>
  );
}

export default StakeArbQve;

//<Input placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)}></Input>
/*{amount === '' ?
            <Button style={{background: '#5C5E81'}}>Amount is Empty</Button> 
            :
            <Button onClick={() => stakeArbQvePetra()}>Swap</Button>
        } */

/*
const [amount, setAmount] = useState('');
    const [connected, setConnected] = useState('');
    const [arbQveBalance, setArbQveBalance] = useState('');
    const qveContract = Contract();
    const Address = ContractAddress();
    const web3 = new Web3(window.ethereum);
    let account = JSON.parse(localStorage.getItem('user'));

    /* function stakeArbQve() {
        qveContract.ArbQVEContract.methods.approve(Address.StakeAddress, web3.utils.toBN(amount * 10**18)).send({ from: account });

        qveContract.StakeContract.methods.StakeArbQVE(web3.utils.toBN(amount * 10**18)).send({ from: account });
    }

    const availableArbQVE = qveContract.ArbQVEContract.methods.balanceOf(account).call();
    availableArbQVE.then((result) => {
        console.log('arbQVEbalance',result);
        setArbQveBalance(result);
    }) */

// function stakeArbQvePetra() {
//     const transaction = {
//         type: "entry_function_aptos_transfer",
//         function: '0x393368cfe77fda732c00f6a2b865bf89cf5bcf723c93a20547ebcd6f7a02ea07::stake::staked_arbQVE',
//         arguments: [amount * 10**8],
//         type_arguments: [],
//     };

//     window.aptos.signAndSubmitTransaction(transaction).then(() => {
//         console.log("전송 성공");
//     })
// }

const Background = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
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

  transition: all 0.15s;
`;

const Input = styled.input`
  all: unset;
  font-weight: 700;
  font-size: 16px;
  line-height: 19px;
  color: #ffffff;
  width: 50%;
  outline: none;

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
  transition: all 0.1s;
`;
