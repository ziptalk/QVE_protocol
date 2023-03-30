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

function Pool({ setLiquidityCount, setRate }) {
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

  const poolTotal = (qveTotal / 10 ** 18 + arbQveTotal / 10 ** 18).toFixed(2);

  const [poolTotals, setPoolTotals] = useState([]);

  const getAptosWallet = () => {
    if ("aptos" in window) {
      return window.aptos;
    } else {
      window.open("https://petra.app/", `_blank`);
    }
  };
  const wallet = getAptosWallet();

  const getPoolInfo = async () => {
    const MODULE =
      "0x98c572593f715bd814aef03711a5a5a1705b8eba67f1686a725502f55fc92bb9";
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
              {poolTotals[1] ? poolTotals[1].toFixed(4) : 0.0}
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
              {poolTotals[0] ? poolTotals[0].toFixed(4) : 0.0}
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
        // <Button onClick={() => Connect()}>Connect Wallet</Button>
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
{
  /* <EContainer style={{height: '35px'}}></EContainer>
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
        </EContainer> */
}

/*
        <EContainer style={{width: '90%', maxWidth: '414px'}}>
    <Text style={{fontWeight: '700', fontSize: '24px', lineHeight: '36px', color: '#B7B8CD'}}>Pool</Text>
      <PoolContainer>
        <EContainer style={{height: '10px'}}/>
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
            <Text style={{fontWeight: '700', fontSize: '12px', lineHeight: '15px', color: '#B7B8CD'}}>APR</Text>
            <EContainer style={{height: '25px'}}/>
            <EContainer style={{display: 'flex', justifyContent: 'flex-end'}}> 
            <Text style={{fontWeight: '700', fontSize: '23px', color: '#B7B8CD', color: '#FFFFFF'}}>12.3%</Text>
            </EContainer>
        </DetailContainer>
        <EContainer style={{height: '20px'}}/>
        <DetailContainer>
            <Text style={{fontWeight: '700', fontSize: '12px', lineHeight: '15px', color: '#B7B8CD'}}>24h Trading Volume</Text>
            <EContainer style={{height: '25px'}}/>
            <EContainer style={{display: 'flex', justifyContent: 'flex-end'}}> 
            <Text style={{fontWeight: '700', fontSize: '23px', color: '#B7B8CD', color: '#FFFFFF'}}>$1,234,567</Text>
            </EContainer>
        </DetailContainer>
        <EContainer style={{height: '20px'}}/>
        <DetailContainer>
            <Text style={{fontWeight: '700', fontSize: '12px', lineHeight: '15px', color: '#B7B8CD'}}>Pool Liquidity</Text>
            <EContainer style={{height: '25px'}}/>
            <EContainer style={{display: 'flex', justifyContent: 'flex-end'}}> 
            <Text style={{fontWeight: '700', fontSize: '23px', color: '#B7B8CD', color: '#FFFFFF'}}>$1,234,567</Text>
            </EContainer>
        </DetailContainer>
        <EContainer style={{height: '20px'}}/>
        <DetailContainer>
            <Text style={{fontWeight: '700', fontSize: '12px', lineHeight: '15px', color: '#B7B8CD'}}>Swap Fee</Text>
            <EContainer style={{height: '25px'}}/>
            <EContainer style={{display: 'flex', justifyContent: 'flex-end'}}> 
            <Text style={{fontWeight: '700', fontSize: '23px', color: '#B7B8CD', color: '#FFFFFF'}}>0.5%</Text>
            </EContainer>
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
      </EContainer> */
