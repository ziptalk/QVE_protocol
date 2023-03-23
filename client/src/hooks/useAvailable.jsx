import { useState, useEffect } from "react";
import axios from "axios";

/**
 * aptos 잔액을 확인할 수 있는 훅
 * [거래비율, 현재이용가능잔액]
 * 1APT당 mQVE는 몇인가
 * -> 거래 비율은 현재 임시로 1로 설정해둔 상태
 * **여기서 비율 바꾸면 됨**
 */
export const useAvailable = () => {
  const [available, setAvailable] = useState();
  const EXCHANGE_RATE = 1;

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
    }
  };

  const getAvailable = (address) => {
    axios
      .get(
        `https://fullnode.testnet.aptoslabs.com/v1/accounts/${address}/resources`
      )
      .then((res) => {
        const newValue = res.data[1].data.coin.value;
        setAvailable(newValue.substring(0, newValue.length - 8));
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    connectAptosWallet();
  }, []);

  return [EXCHANGE_RATE, available];
};
