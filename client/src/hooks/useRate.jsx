import { useEffect, useRef, useState } from "react";
import axios from "axios";

const DEFAULT_VALUE = {
  APT: {
    USD: 0,
  },
  USDT: {
    USD: 0,
  },
  USDC: {
    USD: 0,
  },
};

/**
 * 현재 [APT, USDT, USDC]의 달러 환율을 가져오는 훅
 * 2초에 한 번씩 최신화된다.
 */
export function useRate(delay) {
  const savedCallback = useRef();
  // const delay = 2000;
  const [rate, setRate] = useState(DEFAULT_VALUE);
  const KEY = process.env.REACT_APP_CRYPTO_COMPARE_KEY;

  const callback = () => {
    axios
      .get(
        `https://min-api.cryptocompare.com/data/pricemulti?fsyms=APT,USDT,USDC&tsyms=USD&api_key=${KEY}`
      )
      .then((res) => setRate(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);

  useEffect(() => {
    callback();
  }, []);

  return [rate];
}
