import styled from "styled-components";
import XImg from "../../../../assets/img/x.png";
import Favicon from "../../../../assets/img/Favicon.png";
import { Label, TOKEN } from "./common";
import Dropdown from "./Dropdown";
import EnterAmount from "./EnterAmount";
import ConfirmDeposit from "./ConfirmDeposit";
import Result from "./Result";
import { useState, useEffect } from "react";
import { useAvailable } from "../../../../hooks/useAvailable";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { AptosClient } from "aptos";
import { AptosPriceServiceConnection } from "@pythnetwork/pyth-aptos-js";

const STAGES = [Dropdown, EnterAmount, ConfirmDeposit, Result];

const DEFAULT_VALUES = {
  available: 0,
  dolar: 0,
  input: "",
  rate: 0,
};

export const DEVNET_NODE_URL = "https://fullnode.testnet.aptoslabs.com/v1";

const aptosClient = new AptosClient(DEVNET_NODE_URL, {
  WITH_CREDENTIALS: false,
});

/**
 * Deposit 모달
 */
const ModalWrapper = ({ setPreWalletCount, preWalletCount }) => {
  const {
    connected,
    disconnect,
    account,
    network,
    wallet,
    signAndSubmitTransaction,
    signTransaction,
    signMessage,
    signMessageAndVerify,
  } = useWallet();

  const connection = new AptosPriceServiceConnection(
    "https://xc-testnet.pyth.network"
  );
  const priceId = [
    "0x44a93dddd8effa54ea51076c4e851b6cbbfd938e82eb90197de38fe8876bb66e", // APT/USD price id in testnet
  ];

  const [successAlertMessage, setSuccessAlertMessage] = useState("");
  const [errorAlertMessage, setErrorAlertMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const moduleAddress =
    "0x7ced9822447b29b33304877b6fff04edb9e5924c0d50ad76219cf206f26e7baa";

  const onSignAndSubmitTransaction = async () => {
    const priceUpdateData = await connection.getPriceFeedsUpdateData(priceId);

    const payload = {
      type: "entry_function_payload",
      function: `${moduleAddress}::deposit_mint::deposit_apt_get_mint`,
      arguments: [100000000 * values.input, priceUpdateData],
      type_arguments: [`${moduleAddress}::coins::MQVE`],
    };

    try {
      const response = await signAndSubmitTransaction(payload);
      await aptosClient.waitForTransaction(response?.hash || "");
      setSuccessAlertMessage(
        `https://explorer.aptoslabs.com/txn/${response?.hash}`
      );
      return true;
    } catch (error) {
      console.log("error", error);
      setErrorAlertMessage(error);
      return false;
    }
  };
  const [curStage, setCurStage] = useState(0);
  const [token, setToken] = useState(TOKEN[0]);
  const [values, setValues] = useState(DEFAULT_VALUES);
  const [tokenInfo] = useAvailable(preWalletCount);

  const CurStage = STAGES[curStage];

  const onEnd = () => {
    if (curStage !== STAGES.length - 2) setCurStage((prev) => prev + 1);
    else {
      setCurStage((prev) => prev + 1);
      setLoading(true);
      onSignAndSubmitTransaction().then((res) => {
        if (res) setLoading(false);
      });

      console.log("this thing should be changed", token, values, tokenInfo);
    }
  };

  //모달을 닫을 때 초기화
  useEffect(() => {
    setCurStage(0);
    setToken(TOKEN[0]);
    setValues({
      ...values,
      available: tokenInfo.APT.available,
      rate: tokenInfo.APT.rate,
    });
  }, [preWalletCount]);

  //토큰 선택시 해당 토큰 정보를 상태에 담음
  useEffect(() => {
    setValues({
      ...values,
      available: tokenInfo[token.name].available,
      rate: tokenInfo[token.name].rate,
    });
  }, [token]);

  useEffect(() => {
    console.log(successAlertMessage);
  }, []);

  return (
    <ModalContainer>
      <Xbtn src={XImg} onClick={() => setPreWalletCount(null)} />
      {curStage !== STAGES.length - 1 ? (
        <>
          <LogoWrapper>
            <Logo src={Favicon} />
            <Label style={{ fontWeight: 700, color: "white", marginTop: 5 }}>
              Deposit
            </Label>
            <Label style={{ fontWeight: 400, color: "white" }}>
              Market making
            </Label>
          </LogoWrapper>
        </>
      ) : (
        <></>
      )}
      <CurStage
        token={token}
        setToken={setToken}
        onEnd={onEnd}
        values={values}
        setValues={setValues}
        preWalletCount={preWalletCount}
        loading={loading}
      />
    </ModalContainer>
  );
};

const ModalContainer = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90vw;
  max-width: 374px;
  background: #2b2b34;
  border-radius: 16px;
  padding: 50px 20px 20px 20px;
  z-index: 30;
  gap: 20px;
`;

const Xbtn = styled.img`
  width: 19px;
  height: 19px;
  cursor: pointer;
  position: absolute;
  top: 35px;
  right: 30px;
`;

const LogoWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3px;
`;

const Logo = styled.img`
  width: 45px;
  height: auto;
`;

export default ModalWrapper;
