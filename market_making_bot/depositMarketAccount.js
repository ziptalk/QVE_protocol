const {
  AptosAccount,
  AptosClient,
  TxnBuilderTypes,
  BCS,
  HexString,
} = require("aptos")
const util = require("util")
require("dotenv").config({ path: "../.env" })

// Update to the latest by checking Ferum's Move.toml file:
// https://github.com/ferum-dex/ferum/blob/testnet/contract/Move.toml

// new testnet
const FERUM =
  "0x728891241aa0dc576e23fa368c168f657b1364eb909c8444f28bc7e4a4a2268d"

const NODE_URL = "https://fullnode.testnet.aptoslabs.com/v1"
const client = new AptosClient(NODE_URL)

// Shown for illustration purposes only. You should probably be reading this
// from the environment variable or a secret store in a production setting.
const aptosAccountObject = {
  address: process.env.FERUM_TESTNET_ADDRESS,
  privateKeyHex: process.env.FERUM_TESTNET_PRIVATEKEYHEX,
  publicKeyHex: process.env.FERUM_TESTNET_PUBLICKEYHEX,
}
const account = new AptosAccount(
  HexString.ensure(aptosAccountObject.privateKeyHex).toUint8Array()
)

// Helper function to send signed transactions.
async function sendSignedTransactionWithAccount(signerAccount, entryFunction) {
  const entryFunctionPayload =
    new TxnBuilderTypes.TransactionPayloadEntryFunction(entryFunction)

  // Ge the latest sequence number and chain id.
  const [{ sequence_number: sequenceNumber }, chainId] = await Promise.all([
    client.getAccount(signerAccount.address()),
    client.getChainId(),
  ])

  const rawTxn = new TxnBuilderTypes.RawTransaction(
    // Transaction sender account address
    TxnBuilderTypes.AccountAddress.fromHex(signerAccount.address()),
    BigInt(sequenceNumber),
    entryFunctionPayload,
    // Max gas unit to spend
    BigInt(100000),
    // Gas price per unit
    BigInt(1500),
    // Expiration timestamp. The transaction is discarded if it is not
    // executed within 10 seconds from now.
    BigInt(Math.floor(Date.now() / 1000) + 10),
    new TxnBuilderTypes.ChainId(chainId)
  )

  const signedTxn = await client.signTransaction(signerAccount, rawTxn)
  const pendingTxn = await client.submitSignedBCSTransaction(signedTxn)

  return pendingTxn.hash
}

// Helper function to create limit order.
// 이게 initialize market
async function depositAccount(
  signerAccount, // AptosAccount,
  instrumentCoin, // string,
  quoteCoin, // string,
  coinIAmt, // number,
  coinQAmt // number
) {
  const instrumentCoinTypeTag = new TxnBuilderTypes.TypeTagStruct(
    TxnBuilderTypes.StructTag.fromString(instrumentCoin)
  )
  const quoteCoinTypeTag = new TxnBuilderTypes.TypeTagStruct(
    TxnBuilderTypes.StructTag.fromString(quoteCoin)
  )

  const entryFunction = TxnBuilderTypes.EntryFunction.natural(
    `${FERUM}::market`,
    "deposit_to_market_account_entry",
    [instrumentCoinTypeTag, quoteCoinTypeTag],
    [
      BCS.bcsSerializeUint64(coinIAmt), // coinIAmt
      BCS.bcsSerializeUint64(coinQAmt), // coinQAmt
    ]
  )

  return await sendSignedTransactionWithAccount(signerAccount, entryFunction)
}

async function main() {
  const coinIAmt = (1 * Math.pow(10, 10)).toString()
  const coinQAmt = (1000 * Math.pow(10, 10)).toString()
  const instrumentCoinType = "0x1::aptos_coin::AptosCoin"
  const quoteCoinType = `${FERUM}::test_coins::USDF`

  const txHash = await depositAccount(
    account,
    instrumentCoinType,
    quoteCoinType,
    coinIAmt,
    coinQAmt
  )

  const txResult = await client.waitForTransactionWithResult(txHash)
  console.log(
    txResult.success,
    txResult.vm_status,
    util.inspect(txResult.events, {
      showHidden: false,
      depth: null,
      colors: true,
    })
  )
}
main()
