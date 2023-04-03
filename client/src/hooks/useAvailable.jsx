import { useState, useEffect } from "react";
import axios from "axios";

const DEFAULT_TOKENS_INFO = {
  APT: {
    isExisted: false,
    available: 0,
    rate: 11.17,
  },
  USDT: {
    isExisted: false,
    available: 0,
    rate: 1,
  },
  USDC: {
    isExisted: false,
    available: 0,
    rate: 1,
  },
  mQVE: {
    isExisted: false,
    available: 0,
    rate: 1,
  },
  QVE: {
    isExisted: false,
    available: 0,
    rate: 1,
  },
};

/**
 * aptos 잔액을 확인할 수 있는 훅
 * [현재이용가능토큰정보]
 * ex. 1APT당 mQVE는 몇인가
 * -> 거래 비율은 현재 임시로 1로 설정해둔 상태
 */
export const useAvailable = (dependency) => {
  const [values, setValues] = useState(null);
  const [tokenInfo, setTokenInfo] = useState(DEFAULT_TOKENS_INFO);
  const APT_EXCHANGE_RATE = 11.17;
  const USDT_EXCHANGE_RATE = 1;
  const USDC_EXCHANGE_RATE = 1;
  const mQVE_EXCHANGE_RATE = 1;
  const QVE_EXCHANGE_RATE = 1;

  const getAptosWallet = () => {
    if ("aptos" in window) {
      return window.aptos;
    } else {
      window.open("https://petra.app/", `_blank`);
    }
  };

  const connectAptosWallet = async () => {
    const wallet = getAptosWallet();
    try {
      const account = await wallet.account();
      getAvailable(account.address);
    } catch (error) {
      // { code: 4001, message: "User rejected the request."}
      console.log(error);
    }
  };

  const getAvailable = (address) => {
    axios
      .get(
        `https://fullnode.testnet.aptoslabs.com/v1/accounts/${address}/resources`
      )
      .then((res) => {
        const values = res.data;
        setValues(values);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    connectAptosWallet();
  }, [dependency]);

  useEffect(() => {
    if (values) {
      let newObj = {};
      values.map((value) => {
        if (value.type.includes("AptosCoin")) {
          newObj = {
            ...newObj,
            APT: {
              isExisted: true,
              available:
                Math.floor((Number(value.data.coin.value) / 10 ** 8) * 1e6) /
                1e6,
              rate: APT_EXCHANGE_RATE,
            },
          };
        } else if (
          value.type.includes(
            `${process.env.REACT_APP_MODULE_ADDRESS}::coins::USDC`
          )
        ) {
          newObj = {
            ...newObj,
            USDC: {
              isExisted: true,
              available:
                Math.floor((Number(value.data.coin.value) / 10 ** 8) * 1e6) /
                1e6,
              rate: USDC_EXCHANGE_RATE,
            },
          };
        } else if (
          value.type.includes(
            `${process.env.REACT_APP_MODULE_ADDRESS}::coins::USDT`
          )
        ) {
          newObj = {
            ...newObj,
            USDT: {
              isExisted: true,
              available:
                Math.floor((Number(value.data.coin.value) / 10 ** 8) * 1e6) /
                1e6,
              rate: USDT_EXCHANGE_RATE,
            },
          };
        } else if (value.type.includes("MQVE")) {
          newObj = {
            ...newObj,
            mQVE: {
              isExisted: true,
              available:
                Math.floor((Number(value.data.coin.value) / 10 ** 8) * 1e6) /
                1e6,
              rate: mQVE_EXCHANGE_RATE,
            },
          };
        } else if (value.type.includes("QVE")) {
          newObj = {
            ...newObj,
            QVE: {
              isExisted: true,
              available:
                Math.floor((Number(value.data.coin.value) / 10 ** 8) * 1e6) /
                1e6,
              rate: QVE_EXCHANGE_RATE,
            },
          };
        }
      });
      setTokenInfo({ ...tokenInfo, ...newObj });
    }
  }, [values]);

  return [tokenInfo];
};
