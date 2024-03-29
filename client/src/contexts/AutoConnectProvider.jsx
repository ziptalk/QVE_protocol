import { useEffect, useState, createContext, useContext } from "react";

const AUTO_CONNECT_LOCAL_STORAGE_KEY = "AptosWalletAutoConnect";

export const AutoConnectContext = createContext({});

export function useAutoConnect() {
  return useContext(AutoConnectContext);
}

export const AutoConnectProvider = ({ children }) => {
  const [autoConnect, setAutoConnect] = useState(true);

  useEffect(() => {
    try {
      if (!autoConnect) {
        localStorage.removeItem(AUTO_CONNECT_LOCAL_STORAGE_KEY);
      } else {
        localStorage.setItem(
          AUTO_CONNECT_LOCAL_STORAGE_KEY,
          JSON.stringify(autoConnect)
        );
      }
    } catch (error) {
      if (typeof window !== "undefined") {
        console.error(error);
      }
    }
  }, [autoConnect]);

  return (
    <AutoConnectContext.Provider value={{ autoConnect, setAutoConnect }}>
      {children}
    </AutoConnectContext.Provider>
  );
};
