import styled from "styled-components";
import BothCoins from "../../assets/img/BothCoins.svg";
import { ProgressBar } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Contract from "../../assets/contract/contract";
import TotalLineImg from "../../assets/img/TotalLine.png";
import { useState, useEffect } from "react";
import { CustomWalletSelector } from "../../common/CustomConnectButton";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import axios from "axios";

const Container = styled.div`
  width: 90%;
  max-width: 374px;
`;

const EContainer = styled.div``;

const Text = styled.div`
  font-weight: 700;
  font-size: 24px;
  line-height: 36px;
  letter-spacing: 0.02em;
  color: #b7b8cd;
`;

const PoolContainer = styled.div`
  padding: 32px 25px 50px 25px;
  background: #2b2b34;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
`;

const Image = styled.img``;

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

const DetailContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const CompositionContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: "0px 13px 0px 13px";
`;

const thousandsSeparator = (target) => {
  return target?.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
};

function Pool({ setLiquidityCount, setRate, setRates }) {
  const [qveTotal, setQveTotal] = useState("");
  const [arbQveTotal, setArbQveTotal] = useState("");

  const qveContract = Contract();
  const arbQVETotal = qveContract.LiquidityContract.methods.getTotalA().call();
  const QVETotal = qveContract.LiquidityContract.methods.getTotalB().call();
  const { connected } = useWallet();
  arbQVETotal.then((result) => {
    console.log(result);
    setArbQveTotal(result);
  });

  QVETotal.then((result) => {
    setQveTotal(result);
  });

  const [poolTotals, setPoolTotals] = useState([]);

  const getPoolInfo = async () => {
    const MODULE = process.env.REACT_APP_MODULE_ADDRESS;
    axios
      .post("https://fullnode.testnet.aptoslabs.com/v1/view", {
        function: `${MODULE}::pool::get_reserve_stable`,
        type_arguments: [`${MODULE}::coins::QVE`, `${MODULE}::coins::MQVE`],
        arguments: [],
      })
      .then((res) => {
        // console.log(res.data.map((p) => Number(p) / 10 ** 8));
        const newValue = res.data.map((p) => Number(p) / 10 ** 8);
        setPoolTotals(newValue);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getPoolInfo();
  }, []);

  useEffect(() => {
    setRate(poolTotals[1] / poolTotals[0]);
    setRates([
      ((poolTotals[0] / (poolTotals[0] + poolTotals[1])) * 100).toFixed(2),
      ((poolTotals[1] / (poolTotals[0] + poolTotals[1])) * 100).toFixed(2),
    ]);
  }, [poolTotals]);

  return (
    <Container>
      <Text>Pool</Text>
      <EContainer style={{ height: "15px" }} />
      <Text style={{ fontWeight: "500", fontSize: "12px", lineHeight: "15px" }}>
        Add your assets to this pool to unlock APRs.
        <br />
        The longer your unbonding period, the more you make.
      </Text>
      <EContainer style={{ height: "25px" }} />
      <PoolContainer>
        <EContainer style={{ display: "flex", flexDirection: "row" }}>
          <Image
            src={BothCoins}
            style={{ width: "97.21px", height: "78.41px" }}
          />
          <EContainer style={{ width: "15px" }} />
          <EContainer
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                fontWeight: "700",
                fontSize: "18px",
                lineHeight: "24px",
                color: "#FFFFFF",
              }}
            >
              QVE / mQVE
            </Text>
            <Text
              style={{
                fontWeight: "600",
                fontSize: "14px",
                lineHeight: "17px",
                color: "#5C5E81",
              }}
            >
              Staking enabled
            </Text>
          </EContainer>
        </EContainer>
        <EContainer style={{ height: "40px" }} />
        <DetailContainer>
          <Text
            style={{
              fontWeight: "700",
              fontSize: "12px",
              lineHeight: "15px",
              color: "#B7B8CD",
            }}
          >
            APR
          </Text>
          <Text
            style={{
              fontWeight: "700",
              fontSize: "18px",
              lineHeight: "24px",
              color: "#FFFFFF",
            }}
          >
            12.3%
          </Text>
        </DetailContainer>
        <EContainer style={{ height: "33px" }} />
        <DetailContainer>
          <Text
            style={{
              fontWeight: "700",
              fontSize: "12px",
              lineHeight: "15px",
              color: "#B7B8CD",
            }}
          >
            24h Trading Volume
          </Text>
          <Text
            style={{
              fontWeight: "700",
              fontSize: "18px",
              lineHeight: "24px",
              color: "#FFFFFF",
            }}
          >
            $1,234,567
          </Text>
        </DetailContainer>
        <EContainer style={{ height: "33px" }} />
        <DetailContainer>
          <Text
            style={{
              fontWeight: "700",
              fontSize: "12px",
              lineHeight: "15px",
              color: "#B7B8CD",
            }}
          >
            Pool Liquidity
          </Text>
          <Text
            style={{
              fontWeight: "700",
              fontSize: "18px",
              lineHeight: "24px",
              color: "#FFFFFF",
            }}
          >
            $1,234,567
          </Text>
        </DetailContainer>
        <EContainer style={{ height: "33px" }} />
        <DetailContainer>
          <Text
            style={{
              fontWeight: "700",
              fontSize: "12px",
              lineHeight: "15px",
              color: "#B7B8CD",
            }}
          >
            Swap Fee
          </Text>
          <Text
            style={{
              fontWeight: "700",
              fontSize: "18px",
              lineHeight: "24px",
              color: "#FFFFFF",
            }}
          >
            0.5%
          </Text>
        </DetailContainer>
        <EContainer style={{ height: "28px" }} />
        <Image src={TotalLineImg} />
        <EContainer style={{ height: "28px" }} />
        <Text
          style={{
            fontWeight: "700",
            fontSize: "12px",
            lineHeight: "15px",
            color: "#B7B8CD",
          }}
        >
          Pool Composition
        </Text>
        <EContainer style={{ height: "16px" }} />
        <CompositionContainer>
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
                color: "#B7B8CD",
                color: "#B7B8CD",
              }}
            >
              mQVE:
              {` ${(
                (poolTotals[1] / (poolTotals[0] + poolTotals[1])) *
                100
              ).toFixed(2)}%`}
            </Text>
            <Text
              style={{
                fontWeight: "700",
                fontSize: "12px",
                lineHeight: "15px",
                color: "#B7B8CD",
                color: "#B7B8CD",
              }}
            >
              QVE:
              {` ${(
                (poolTotals[0] / (poolTotals[0] + poolTotals[1])) *
                100
              ).toFixed(2)}%`}
            </Text>
          </EContainer>
          <EContainer style={{ height: "15px" }} />
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
                fontSize: "18px",
                lineHeight: "15px",
                color: "#B7B8CD",
                color: "#FFFFFF",
              }}
            >
              {poolTotals[1]
                ? thousandsSeparator(poolTotals[1].toFixed(2))
                : 0.0}
            </Text>
            <Text
              style={{
                fontWeight: "700",
                fontSize: "18px",
                lineHeight: "15px",
                color: "#B7B8CD",
                color: "#FFFFFF",
              }}
            >
              {poolTotals[0]
                ? thousandsSeparator(Number(poolTotals[0]).toFixed(2))
                : 0.0}
            </Text>
          </EContainer>
          <EContainer style={{ height: "20px" }} />
          <ProgressBar
            now={(
              (poolTotals[1] / (poolTotals[0] + poolTotals[1])) *
              100
            ).toFixed(2)}
          />
        </CompositionContainer>
      </PoolContainer>
      <EContainer style={{ height: "20px" }} />
      {!connected ? (
        <CustomWalletSelector style={{ height: 55, borderRadius: 16 }} />
      ) : (
        <Button
          style={{ background: "#4A3CE8", color: "#FFFFFF" }}
          onClick={() => {
            setLiquidityCount(1);
          }}
        >
          Add Liquidity
        </Button>
      )}

      <EContainer style={{ height: "88px" }} />
    </Container>
  );
}

export default Pool;
