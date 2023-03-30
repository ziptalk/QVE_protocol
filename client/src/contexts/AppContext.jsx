import { PetraWallet } from "petra-plugin-wallet-adapter"
import { AptosWalletAdapterProvider } from "@aptos-labs/wallet-adapter-react"
import { AutoConnectProvider, useAutoConnect } from "./AutoConnectProvider"

const WalletContextProvider = ({ children }) => {
  const { autoConnect } = useAutoConnect()

  const wallets = [new PetraWallet()]

  return (
    <AptosWalletAdapterProvider plugins={wallets} autoConnect={autoConnect}>
      {children}
    </AptosWalletAdapterProvider>
  )
}

export const AppContext = ({ children }) => {
  return (
    <AutoConnectProvider>
      <WalletContextProvider>{children}</WalletContextProvider>
    </AutoConnectProvider>
  )
}
