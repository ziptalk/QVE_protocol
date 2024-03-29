import { useState, useEffect } from "react";
import styled from "styled-components";
import DepositImg from "../../../assets/img/Deposit.svg";
import StakingImg from "../../../assets/img/Staking.svg";
import LiquidityImg from "../../../assets/img/Liquidity.svg";
import TotalLineImg from "../../../assets/img/TotalLine.png";
import { useNavigate } from "react-router-dom";
import Web3 from "web3";
import Contract from "../../../assets/contract/contract";
import ContractAddress from "../../../assets/contract/contractAddress";
import { useAvailable } from "../../../hooks/useAvailable";
import { useRate } from "../../../hooks/useRate";

const Asset = styled.div`
  /* Heading 2 */
  width: 90%;
  max-width: 374px;
  font-weight: 700;
  font-size: 24px;
  line-height: 36px;
  align-self: flex-start;
  /* identical to box height, or 150% */

  letter-spacing: 0.02em;

  align-self: center;
  /* dark/label */

  color: #b7b8cd;
`;
const EContainer = styled.div``;

const PreWalletConnectBackground = styled.div`
  width: 100%;
  height: 100%;
  padding-top: 77px;
  backdrop-filter: blur(5px);
  position: absolute;
  left: 0;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 11;
`;

const TextContainer = styled.div`
  color: #b7b8cd;
`;

const DepositContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 90vw;
  max-width: 374px;
  background: #2b2b34;
  border-radius: 16px;
`;

const StakingRewardsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 90vw;
  max-width: 374px;
  background: #2b2b34;
  border-radius: 16px;
`;

const LiquidityRewardsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 90vw;
  max-width: 374px;
  background: #2b2b34;
  border-radius: 16px;
`;

const Text = styled.div`
  letter-spacing: 0.02em;
  color: #ffffff;
`;

const Button = styled.button`
  all: unset;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10px;
  background: #5c5e81;
  border-radius: 16px;
  font-weight: 700;
  font-size: 12px;
  line-height: 15px;
  letter-spacing: 0.02em;
  color: #ffffff;
`;

const Image = styled.img``;

const Input = styled.input`
  all: unset;
`;

const InputContainer = styled.div`
  all: unset;
  position: relative;
  height: 57px;
  width: 90%;
  background: #2b2b34;
  border: 1px solid #5c5e81;
  border-radius: 16px;
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
  color: #ffffff;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
// console.log("lc in connected",localStorage.getItem('user'))
// const aptosWeb3 = require('@martiandao/aptos-web3.js');

// const client = new CoinClient('https://fullnode.devnet.aptoslabs.com/v1');
// console.log('client is', client);

function AssetConnected({
  preWalletCount,
  setPreWalletCount,
  setAccount,
  setStakeContract,
  account,
  stakeContract,
  usdtContract,
  setUsdtContract,
  liquidityContract,
  setLiquidityContract,
  aptosBalance,
}) {
  // console.log('Balance:', aptosWeb3.getBalance(account));
  const web3 = new Web3(window.ethereum);
  const qveContract = Contract();
  const Address = ContractAddress();
  const [depositAmount, setDepositAmount] = useState(0);
  const [usdt, setUsdt] = useState("");
  const [qve, setQve] = useState("");
  const [arbQve, setArbQve] = useState("");
  const [stakedQve, setStakedQve] = useState("");
  const [stakedArbQve, setStakedArbQve] = useState("");
  const [connected, setConnected] = useState("");
  const navigate = useNavigate();
  const [available] = useAvailable();
  const [rate] = useRate(10000);

  //Metamask 미설치시, 에러 발생 방지
  const [metaMask, setMetamMask] = useState(false);

  useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
      setMetamMask(true);
    } else {
      alert("Metamask is not installed.\nPlease install Metamask first!");
    }
  }, []);

  //솔리디티 관련 코드
  //   const Account = JSON.parse(localStorage.getItem("user"));
  //   localStorage.getItem("user") != undefined
  //     ? (account = localStorage.getItem("user"))
  //     : (account = null);
  //   console.log("account", Account);
  // // client.getAccountResources(account).then(setData);
  // console.log("CHECK BALANCE", client.checkBalance(account));
  // console.log("data is", data);
  //   function DepositMetamask() {
  //     console.log("account", Account);
  //     // Approve the transfer of the specified amount of USDT from the current account to the contract
  //     qveContract.UsdtContract.methods
  //       .approve(
  //         Address.DepositAddress,
  //         web3.utils.toBN(depositAmount * 10 ** 18)
  //       )
  //       .send({ from: Account });

  //     // Deposit the approved amount of USDT to the contract
  //     qveContract.DepositContract.methods
  //       .deposit(web3.utils.toBN(depositAmount * 10 ** 18))
  //       .send({ from: Account });

  //     // qveContract.methods.mintToken(account,account,depositAmount).send({ from : account });
  //     // console.log("Deposit success!");
  //   }
  // console.log('account is', account);
  function DepositAptos() {
    // console.log("Deposit Aptos");
    const transaction = {
      type: "entry_function_aptos_transfer",
      function:
        "0x393368cfe77fda732c00f6a2b865bf89cf5bcf723c93a20547ebcd6f7a02ea07::mint::exchange_to_entry",
      arguments: [depositAmount * 10 ** 8],
      type_arguments: [],
    };
    window.aptos.signAndSubmitTransaction(transaction).then(() => {
      // console.log("전송 성공");
    });
    //TODO 추후에 staking하는 코드 넣기
  }

  //     useEffect(() => {
  //     const UsdtBalance = qveContract.UsdtContract.methods.balanceOf(Account).call();
  //     const qveBalance = qveContract.QVEContract.methods.balanceOf(Account).call();
  //     const arbQVEBalance = qveContract.ArbQVEContract.methods.balanceOf(Account).call();
  //     const qveStakedBalance = qveContract.StakeContract.methods.staked_QVE(Account).call();
  //     const arbQveStakedBalance = qveContract.StakeContract.methods.staked_arbQVE(Account).call();

  //     UsdtBalance.then((result) => {
  //         setUsdt(result);
  //       });

  //     qveBalance.then((result) => {
  //         setQve(result);
  //       });

  //     arbQVEBalance.then((result) => {
  //         setArbQve(result);
  //       });
  //     qveStakedBalance.then((result) => {
  //         setStakedQve(result);
  //     })
  //     arbQveStakedBalance.then((result) => {
  //         setStakedArbQve(result);
  //     })
  // },[depositAmount])

  function Deposit() {
    if (metaMask) {
      DepositAptos();
      setPreWalletCount(null);
    }
  }

  useEffect(() => {
    if (metaMask) {
      window.ethereum.on("accountsChanged", async () => {
        localStorage.removeItem("user");
        window.location.reload();
        console.log("account is changeed");
      });
    }
  }, [metaMask]);

  return (
    <>
      <EContainer>
        <Asset>My Asset</Asset>
        <EContainer style={{ height: "15px" }} />
        <DepositContainer>
          <EContainer style={{ height: "25px" }}></EContainer>
          <EContainer
            style={{
              display: "flex",
              flexDirection: "row",
              padding: "0px 25px 0px 25px",
              justifyContent: "space-between",
            }}
          >
            <EContainer style={{ display: "flex", flexDirection: "column" }}>
              <EContainer
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Image
                  src={DepositImg}
                  style={{ width: "24px", height: "24px" }}
                ></Image>
                <Text
                  style={{
                    fontWeight: "700",
                    fontSize: "12px",
                    lineHeight: "15px",
                    color: "#B7B8CD",
                  }}
                >
                  Deposit
                </Text>
              </EContainer>
              <EContainer style={{ height: "3px" }} />
              <Text
                style={{
                  fontWeight: "700",
                  fontSize: "18px",
                  lineHeight: "24px",
                  color: "#FFFFFF",
                }}
              >
                {available.APT.available.toFixed(6)} APT
              </Text>
            </EContainer>
            <Button
              style={{ width: "83px", height: "27px" }}
              onClick={() => setPreWalletCount(3)}
            >
              Deposit
            </Button>
          </EContainer>
          <EContainer style={{ height: "45px" }}></EContainer>
          <EContainer
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              padding: "0px 25px 0px 25px",
            }}
          >
            <Text
              style={{
                fontWeight: "700",
                fontSize: "14px",
                lineHeight: "17px",
                color: "#B7B8CD",
              }}
            >
              {/* {(arbQve / 10 ** 18).toFixed(2)} mQVE */}
              {available.mQVE.available.toFixed(2)} mQVE
            </Text>
            <EContainer
              style={{ display: "flex", flexDirection: "column", gap: 3 }}
            >
              <Text
                style={{
                  fontWeight: "700",
                  fontSize: "14px",
                  lineHeight: "17px",
                  color: "#0FB63E",
                  textAlign: "end",
                }}
              >
                {/* 여기 수정 */}+ $ 0 (↑0%)
              </Text>
              <Text
                style={{
                  fontWeight: "500",
                  fontSize: "12px",
                  lineHeight: "15px",
                  color: "#FFFFFF",
                  textAlign: "end",
                }}
              >
                = $ {(available.mQVE.available * rate.APT.USD).toFixed(2)}
              </Text>
            </EContainer>
          </EContainer>
          <EContainer style={{ height: "25px" }}></EContainer>
          <EContainer
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              padding: "0px 25px 0px 25px",
            }}
          >
            <Text
              style={{
                fontWeight: "700",
                fontSize: "14px",
                lineHeight: "17px",
                color: "#B7B8CD",
              }}
            >
              {available.QVE.available.toFixed(2)} QVE
            </Text>
            <EContainer
              style={{ display: "flex", flexDirection: "column", gap: 3 }}
            >
              <Text
                style={{
                  fontWeight: "700",
                  fontSize: "14px",
                  lineHeight: "17px",
                  color: "#0FB63E",
                }}
              >
                + $ 0 (↑0%)
              </Text>
              <Text
                style={{
                  fontWeight: "500",
                  fontSize: "12px",
                  lineHeight: "15px",
                  color: "#FFFFFF",
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                = $ {(available.QVE.available * rate.APT.USD).toFixed(2)}
              </Text>
            </EContainer>
          </EContainer>
          <EContainer style={{ height: "20px" }}></EContainer>
          <EContainer
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image src={TotalLineImg} style={{ width: "90%" }}></Image>
          </EContainer>
          <EContainer style={{ height: "20px" }}></EContainer>
          <EContainer
            style={{
              display: "flex",
              flexDirection: "column",
              padding: "0px 26.5px 0px 20px",
              justifyContent: "flex-end",
              alignItems: "flex-end",
              gap: 3,
            }}
          >
            <Text
              style={{
                fontWeight: "700",
                fontSize: "14px",
                lineHeight: "17px",
                color: "#0FB63E",
              }}
            >
              + $ 0 (↑0%)
            </Text>
            <Text
              style={{
                fontWeight: "500",
                fontSize: "12px",
                lineHeight: "15px",
                color: "#FFFFFF",
              }}
            >
              = ${" "}
              {(
                available.QVE.available * rate.APT.USD +
                available.mQVE.available +
                rate.APT.USD
              ).toFixed(2)}
            </Text>
          </EContainer>
          <EContainer style={{ height: "25px" }} />
        </DepositContainer>

        <EContainer style={{ height: "20px" }} />
        <StakingRewardsContainer>
          <EContainer style={{ height: "25px" }}></EContainer>
          <EContainer
            style={{
              display: "flex",
              flexDirection: "row",
              padding: "0px 25px 0px 25px",
              justifyContent: "space-between",
            }}
          >
            <EContainer
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Image
                src={StakingImg}
                style={{ width: "24px", height: "24px" }}
              ></Image>
              <Text
                style={{
                  fontWeight: "700",
                  fontSize: "12px",
                  lineHeight: "15px",
                  color: "#B7B8CD",
                  padding: "5px 0px 5px 0px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                Staking Rewards
              </Text>
            </EContainer>
            <Button
              style={{ width: "83px", height: "27px" }}
              onClick={() => navigate("/stakePage")}
            >
              Stake
            </Button>
          </EContainer>
          <EContainer style={{ height: "20px" }} />
          <EContainer
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              padding: "0px 25px 0px 25px",
              gap: 3,
            }}
          >
            <Text
              style={{
                fontWeight: "700",
                fontSize: "14px",
                lineHeight: "17px",
                color: "#B7B8CD",
              }}
            >
              {(stakedQve / 10 ** 18).toFixed(2)} QVE
            </Text>
            <EContainer
              style={{ display: "flex", flexDirection: "column", gap: 3 }}
            >
              <Text
                style={{
                  fontWeight: "700",
                  fontSize: "14px",
                  lineHeight: "17px",
                  color: "#0FB63E",
                }}
              >
                + $ 0 (↑0%)
              </Text>
              <Text
                style={{
                  fontWeight: "500",
                  fontSize: "12px",
                  lineHeight: "15px",
                  color: "#FFFFFF",
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                = $ 0
              </Text>
            </EContainer>
          </EContainer>
          <EContainer style={{ height: "25px" }} />
        </StakingRewardsContainer>
        <EContainer style={{ height: "20px" }} />
        <LiquidityRewardsContainer>
          <EContainer style={{ height: "25px" }}></EContainer>
          <EContainer
            style={{
              display: "flex",
              flexDirection: "row",
              padding: "0px 25px 0px 25px",
              justifyContent: "space-between",
            }}
          >
            <EContainer
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Image
                src={LiquidityImg}
                style={{ width: "24px", height: "24px" }}
              ></Image>
              <Text
                style={{
                  fontWeight: "700",
                  fontSize: "12px",
                  lineHeight: "15px",
                  color: "#B7B8CD",
                  padding: "5px 0px 5px 0px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                Liquidity Rewards
              </Text>
            </EContainer>
            <Button
              style={{ width: "115px", height: "27px" }}
              onClick={() => navigate("/poolPage")}
            >
              Add Liquidity
            </Button>
          </EContainer>
          <EContainer style={{ height: "20px" }} />
          <EContainer
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              padding: "0px 25px 0px 25px",
            }}
          >
            <Text
              style={{
                fontWeight: "700",
                fontSize: "14px",
                lineHeight: "17px",
                color: "#B7B8CD",
              }}
            >
              mQVE/QVE
            </Text>
            <EContainer
              style={{ display: "flex", flexDirection: "column", gap: 3 }}
            >
              <Text
                style={{
                  fontWeight: "700",
                  fontSize: "14px",
                  lineHeight: "17px",
                  color: "#0FB63E",
                }}
              >
                + $ 0 (↑0%)
              </Text>
              <Text
                style={{
                  fontWeight: "500",
                  fontSize: "12px",
                  lineHeight: "15px",
                  color: "#FFFFFF",
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                = $ 0
              </Text>
            </EContainer>
          </EContainer>
          <EContainer style={{ height: "25px" }} />
        </LiquidityRewardsContainer>
      </EContainer>
    </>
  );
}

export default AssetConnected;

// !!(preWalletCount === 3) &&
//                     <PreWalletConnectBackground style={{visibility : preWalletCount === 3 ? "visible" : "hidden"}}></PreWalletConnectBackground>
