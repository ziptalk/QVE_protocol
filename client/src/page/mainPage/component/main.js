import styled from "styled-components";
import LineChart from "./Chart";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ExcIcon from "../../../assets/img/Subtract.png";
import axios from "axios";
import HiddenMessage from "../../../assets/img/hiddenMessage.png";
import MainWalletXPetra from "./mainWalletXPetra";
import AssetConnected from "./assetConnected";
import QveLoadingHead from "../../../assets/img/QveLoading1.png";
import QveLoadingBase from "../../../assets/img/QveLoading2.svg";
import DropDown from "./dropdown";

function Main({
  selectedOption,
  setSelectedOption,
  preWalletCount,
  setPreWalletCount,
}) {
  const [balanceList, setBalanceList] = useState("");
  const [mdd, setMdd] = useState("");
  const [pnl, setPnl] = useState("");
  const [portfolio, setPortfolio] = useState("");
  const [excMsg, setExcMsg] = useState(0);
  const [secondPort, setSecondPort] = useState("");
  const [thirdPort, setThirdPort] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const totalInitialInvestment = 79300;
  const options = ["Arbitrage", "BTC Hedge", "Funding Rate"];
  const [account, setAccount] = useState();
  const [stakeContract, setStakeContract] = useState(null);
  const [usdtContract, setUsdtContract] = useState(null);
  const [liquidityContract, setLiquidityContract] = useState(null);
  const [aptosBalance, setAptosBalance] = useState(null);
  const [connected, setConnected] = useState("");
  const [notConnected, setNotConnected] = useState(false);

  const fetchBalanceList = async () => {
    axios
      .get("https://qve.today/balance/get/")
      .then((res) => {
        setBalanceList(res.data);
      })
      .catch((e) => console.log(e));
  };

  const fetchMdd = async () => {
    axios.get("https://qve.today/balance/getmdd").then((res) => {
      setMdd(res.data);
    });
  };
  const fetchPnl = async () => {
    axios.get("https://qve.today/balance/getpnl").then((res) => {
      setPnl(res.data);
    });
  };
  const fetchSecond = async () => {
    axios
      .get("https://qve.today/portfolios/eth-btc-hedge-volatility/")
      .then((res) => {
        setSecondPort(res.data);
      });
  };

  const fetchThird = async () => {
    axios
      .get("https://qve.today/portfolios/fundingfee-trading/")
      .then((res) => {
        setThirdPort(res.data);
      });
  };

  useEffect(() => {
    Promise.all([
      fetchBalanceList(),
      fetchMdd(),
      fetchPnl(),
      fetchSecond(),
      fetchThird(),
    ]);
  }, []);

  const navigate = useNavigate();
  function getKeyByValue(object, value) {
    return object[value];
  }
  const logout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  var balanceArray = [];
  var pnlArray = [];
  var secondPort_cr_Array = [];
  var secondPort_mdd_Array = [];
  var thirdPort_cr_Array = [];
  var thirdPort_mdd_Array = [];
  let second_max_mdd = 0;
  let third_max_mdd = 0;
  let connectionStatus;
  for (let i = 0; i < balanceList.length; i++) {
    let valueBalance = getKeyByValue(balanceList[i], "balance");
    balanceArray.push(valueBalance.toFixed(0));
  }

  let mdd_value;
  let pnl_value = getKeyByValue(pnl, "pnl");
  let pnl_24h_gap = getKeyByValue(pnl, "pnl_24h_gap");
  for (let i = 0; i < secondPort.length; i++) {
    let secondPort_cr = getKeyByValue(secondPort[i], "cr");
    secondPort_cr = (secondPort_cr - 1) * 100;
    let secondPort_mdd = getKeyByValue(secondPort[i], "mdd");
    secondPort_cr_Array.push(secondPort_cr);
    secondPort_mdd_Array.push(secondPort_mdd);
    if (secondPort_mdd > second_max_mdd) {
      second_max_mdd = secondPort_mdd;
    }
  }
  for (let i = 0; i < thirdPort.length; i++) {
    let thirdPort_cr = getKeyByValue(thirdPort[i], "cr");
    thirdPort_cr = (thirdPort_cr - 1) * 100;
    let thirdPort_mdd = getKeyByValue(thirdPort[i], "mdd");
    thirdPort_cr_Array.push(thirdPort_cr);
    thirdPort_mdd_Array.push(thirdPort_mdd);
    if (thirdPort_mdd > third_max_mdd) {
      third_max_mdd = thirdPort_mdd;
    }
  }

  if (selectedOption === "Arbitrage") {
    for (let i = 0; i < balanceArray.length; i++) {
      var pnlValue =
        (balanceArray[i] - totalInitialInvestment) / totalInitialInvestment;
      pnlArray.push((pnlValue * 100).toFixed(2));
    }
  } else if (selectedOption === "BTC Hedge") {
    for (let i = 0; i < secondPort.length; i++) {
      pnlArray.push(secondPort_cr_Array[i]);
    }
  } else if (selectedOption === "Funding Rate") {
    for (let i = 0; i < thirdPort.length; i++) {
      pnlArray.push(thirdPort_cr_Array[i]);
    }
  } else {
    for (let i = 0; i < thirdPort.length; i++) {
      pnlArray.push(thirdPort_cr_Array[i]);
    }
  }

  if (pnlArray != []) {
    for (let i = 0; i < pnlArray.length; i++) {
      pnlArray[i] = Number(pnlArray[i]).toFixed(2);
    }
  }

  if (selectedOption === "Arbitrage") {
    mdd_value = getKeyByValue(mdd, "mdd");
  } else if (selectedOption === "BTC Hedge") {
    mdd_value = second_max_mdd;
  } else if (selectedOption === "Funding Rate") {
    mdd_value = third_max_mdd;
  } else {
    mdd_value = third_max_mdd;
  }
  mdd_value = Math.abs(mdd_value);

  const currentPnl = pnlArray.at(-1);

  if (pnl_value != undefined) {
    pnl_value = pnl_value.toFixed(2);
    pnl_24h_gap = pnl_24h_gap.toFixed(2);
  }

  if (mdd_value != undefined) {
    mdd_value = mdd_value.toFixed(2);
  }

  const getAptosWallet = () => {
    if ("aptos" in window) {
      return window.aptos;
    } else if (!notConnected) {
      setNotConnected(true);
      // window.open("https://petra.app/", `_blank`);
    }
  };
  const wallet = getAptosWallet();

  useEffect(() => {
    if (notConnected) {
      window.open("https://petra.app/", `_blank`);
    }
  }, [notConnected]);

  if (balanceList == "") {
    // 연결정보 저장
    // if (wallet.isConnected) {
    //   try {
    //     connectionStatus = wallet.isConnected();
    //     connectionStatus.then((result) => {
    //       setConnected(result);
    //     });
    //   } catch (error) {}

    //   if (connected === false) {
    //     localStorage.removeItem("user");
    //   }
    // }

    return (
      <EContainer
        style={{
          height: "100vh",
          background: "#1B1A1E",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <EContainer
          style={{
            display: "flex",
            flexDirection: "column",
            position: "absolute",
          }}
        >
          <Image
            src={QveLoadingHead}
            style={{
              height: "65px",
              width: "75px",
              position: "relative",
              top: "150px",
              left: "65px",
            }}
          ></Image>
          <BaseImage
            src={QveLoadingBase}
            style={{ height: "276px", width: "210px" }}
          ></BaseImage>
        </EContainer>
      </EContainer>
    );
  } else {
    return (
      <ContainerAll
        style={{ filter: preWalletCount != null ? "blur(0px)" : "blur(0px)" }}
      >
        <EContainer style={{ height: "35px" }}></EContainer>
        <StrategyContainer>
          <Text>Strategy Selector</Text>
        </StrategyContainer>
        <EContainer style={{ height: "20px" }}></EContainer>
        <EContainer
          style={{
            display: "flex",
            flexDirection: "row",
            width: "90%",
            maxWidth: "374px",
            justifyContent: "flex-end",
          }}
        >
          {localStorage.getItem("user") === null ? (
            <DepositButton onClick={() => setPreWalletCount(1)}>
              Deposit
            </DepositButton>
          ) : (
            <DepositButton onClick={() => setPreWalletCount(3)}>
              Deposit
            </DepositButton>
          )}
        </EContainer>
        <EContainer style={{ height: "10px" }} />
        <EContainer
          style={{ width: "100%", display: "flex", justifyContent: "center" }}
        >
          <FirstContainer>
            <EContainer style={{ height: "12px" }}></EContainer>
            <ChartContainer>
              <EContainer style={{ position: "absolute", top: "37px" }}>
                <DropDown
                  selectedOption={selectedOption}
                  setSelectedOption={setSelectedOption}
                />
              </EContainer>
              <EContainer
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  flexDirection: "row",
                  alignSelf: "flex-end",
                }}
              >
                <ChartContainerPNL>PNL</ChartContainerPNL>
              </EContainer>
              <FirstContainerValue>
                <FirstContainerValueStart>
                  <ChartContainerPercent>{currentPnl}%</ChartContainerPercent>
                  <EContainer style={{ width: "5px" }}></EContainer>
                  <PnlChangePercent
                    style={{ color: pnl_24h_gap > 0 ? "#0FB63E" : "#FF395D" }}
                  >
                    {pnl_24h_gap}%p
                  </PnlChangePercent>
                </FirstContainerValueStart>
                <FirstContainerValueEnd>
                  <ExcButton>
                    <ExcImg src={ExcIcon}></ExcImg>
                    <ExcMsg src={HiddenMessage} />
                  </ExcButton>

                  <EContainer style={{ width: "4px" }}></EContainer>
                  <ChartContainerMDD>MDD</ChartContainerMDD>
                  <EContainer style={{ width: "4px" }}></EContainer>
                  <ChartContainerMDDSplit>:</ChartContainerMDDSplit>
                  <EContainer style={{ width: "4px" }}></EContainer>
                  <ChartContainerMDDValue style={{ color: "#FFFFFF" }}>
                    {mdd_value}
                  </ChartContainerMDDValue>
                  <EContainer style={{ width: "4px" }}></EContainer>
                </FirstContainerValueEnd>
              </FirstContainerValue>
              <EContainer style={{ height: "15px" }}></EContainer>
              <LineChartContainer>
                <LineChart
                  balanceList={balanceList}
                  pnlArray={pnlArray}
                  secondPort={secondPort}
                  thirdPort={thirdPort}
                  selectedOption={selectedOption}
                ></LineChart>
              </LineChartContainer>
            </ChartContainer>
          </FirstContainer>
        </EContainer>
        <EContainer style={{ height: "52px" }}></EContainer>
        <AssetContainer>
          {localStorage.getItem("user") === null ? (
            <MainWalletXPetra
              setAptosBalance={setAptosBalance}
              liquidityContract={liquidityContract}
              setLiquidityContract={setLiquidityContract}
              account={account}
              usdtContract={usdtContract}
              setUsdtContract={setUsdtContract}
              stakeContract={stakeContract}
              setStakeContract={setStakeContract}
              preWalletCount={preWalletCount}
              setPreWalletCount={setPreWalletCount}
              setAccount={setAccount}
            ></MainWalletXPetra>
          ) : (
            <AssetConnected
              account={account}
              setStakeContract={setStakeContract}
              preWalletCount={preWalletCount}
              setPreWalletCount={setPreWalletCount}
              stakeContract={stakeContract}
              usdtContract={usdtContract}
              setUsdtContract={setUsdtContract}
              setAccount={setAccount}
              aptosBalance={aptosBalance}
            ></AssetConnected>
          )}
        </AssetContainer>
        <EContainer style={{ height: "72px" }}></EContainer>
      </ContainerAll>
    );
  }
}
export default Main;

const ContainerAll = styled.div`
  height: 100%;
  z-index: -1;
  background-color: #1b1a1e;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const EContainer = styled.div``;

const FirstContainer = styled.div`
  width: 90%;
  max-width: 374px;
`;

const FirstContainerValue = styled.div`
  display: flex;
  flex-direction: row;
  padding: 0px 20px 0px 20px;
  height: 32px;
  justify-content: space-between;
`;

const FirstContainerValueStart = styled.div`
  display: flex;
  flex-direction: row;
`;

const FirstContainerValueEnd = styled.div`
  display: flex;
  flex-direction: row;
  align-self: end;
`;

const PnlChangePercent = styled.div`
  display: flex;
  width: 47px;
  height: 17px;
  align-self: end;
  font-weight: 700;
  font-size: 14px;
  line-height: 17px;
  color: #ff395d;
`;

const ChartContainer = styled.div`
  width: 100%;
  background: #2b2b34;
  border-radius: 16px;
`;

const ChartContainerPNL = styled.div`
  padding: 24px 0px 0px 20px;
  font-weight: 700;
  font-size: 14px;
  line-height: 17px;
  color: #b7b8cd;
`;

const ChartContainerPercent = styled.div`
  height: 39px;
  font-weight: 700;
  font-size: 30px;
  line-height: 39px;
  color: #ffffff;
`;

const ChartContainerMDD = styled.div`
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
  color: #ffffff;
  flex: none;
  order: 0;
  flex-grow: 0;
`;

const ChartContainerMDDSplit = styled.div`
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
  color: #ffffff;
`;

const ChartContainerMDDValue = styled.div`
  font-weight: 700;
  font-size: 14px;
  line-height: 17px;
`;
const ExcButton = styled.button`
  all: unset;
  width: 16px;
  height: 16px;
  cursor: pointer;
  position: relative;
  &:focus {
    img {
      opacity: 1;
    }
  }
`;

const ExcImg = styled.img`
  width: 16px;
  height: 16px;
  position: absolute;
  top: 0px;
`;

const BaseImage = styled.img``;

const Image = styled.img`
  animation: 2s infinite slidein;

  @keyframes slidein {
    50% {
      transform: translateY(15px);
    }
  }
`;

const LineChartContainer = styled.div`
  width: 100%;
  height: max-content;
  float: "center";
`;

const AssetContainer = styled.div`
  display: flex;
  width: 90%;
  flex-direction: column;
  margin: auto;
  align-items: center;
`;

const ExcMsg = styled.img`
  height: 50.58px;
  width: auto;
  box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.3);
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  transition: 0.3s;
  opacity: 0;
`;

const StrategyContainer = styled.div`
  width: 90%;
  max-width: 374px;
  font-weight: 500;
  font-size: 12px;
  line-height: 15px;
  display: flex;
  align-items: center;
  color: #b7b8cd;
`;

const Text = styled.div`
  font-weight: 500;
  font-size: 12px;
  line-height: 15px;
  display: flex;
  align-items: center;
  color: #b7b8cd;
`;

const DropDownHeader = styled("div")`
  box-sizing: border-box;
  flex-wrap: wrap;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  align-content: space-between;
  padding: 18px 20px;
  width: 224px;
  height: 60px;
  background: #1b1a1e;
  border: 1px solid #3f3f46;
  border-radius: 16px;
  order: 0;
  flex-grow: 0;
  cursor: pointer;
  font-weight: 700;
  font-size: 24px;
  line-height: 36px;
  letter-spacing: 0.02em;
  color: #b7b8cd;
`;

const DropDownListContainer = styled("div")``;

const DropDownList = styled("ul")`
  padding: 0;
  margin: 0;
  padding-left: 7px;
  padding-right: 7px;
  background: #ffffff;
  border: 2px solid #e5e5e5;
  box-sizing: border-box;
  color: #3faffa;
  font-size: 1.3rem;
  font-weight: 500;
  &:first-child {
    padding-top: 0.3em;
  }
  cursor: pointer;
  width: 224px;
  background: #2b2b34;
  border: 1px solid #3f3f46;
  box-shadow: 4px 4px 60px rgba(0, 0, 0, 0.4);
  border-radius: 16px;
  color: #b7b8cd;
`;

const ListItem = styled("li")`
  display: flex;
  width: 100%;
  height: 40px;
  left: 10px;
  font-weight: 700;
  font-size: 16px;
  line-height: 19px;
  align-items: center;
  &:hover {
    background: #3f3f46;
  }
  border-radius: 10px;
`;

const DepositButton = styled.button`
  all: unset;
  cursor: pointer;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10px;
  width: 100px;
  height: 40px;
  background: #4a3ce8;
  border-radius: 16px;
  flex: none;
  order: 1;
  flex-grow: 0;
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
  color: #ffffff;
`;
