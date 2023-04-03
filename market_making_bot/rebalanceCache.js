const {
  AptosAccount,
  AptosClient,
  TxnBuilderTypes,
  BCS,
  HexString,
} = require("aptos")
const util = require("util")
require("dotenv").config({ path: "../.env" })

const NODE_URL = "https://fullnode.testnet.aptoslabs.com/v1"
const client = new AptosClient(NODE_URL)

const account = new AptosAccount(
  HexString.ensure(process.env.MY_PRIVATE_KEY).toUint8Array()
)

async function sendSignedTransactionWithAccount(signerAccount, entryFunction) {
  const entryFunctionPayload =
    new TxnBuilderTypes.TransactionPayloadEntryFunction(entryFunction)

  const [{ sequence_number: sequenceNumber }, chainId] = await Promise.all([
    client.getAccount(signerAccount.address()),
    client.getChainId(),
  ])

  const rawTxn = new TxnBuilderTypes.RawTransaction(
    TxnBuilderTypes.AccountAddress.fromHex(signerAccount.address()),
    BigInt(sequenceNumber),
    entryFunctionPayload,
    BigInt(100000),
    BigInt(1500),
    BigInt(Math.floor(Date.now() / 1000) + 10),
    new TxnBuilderTypes.ChainId(chainId)
  )

  const signedTxn = await client.signTransaction(signerAccount, rawTxn)
  const pendingTxn = await client.submitSignedBCSTransaction(signedTxn)

  return pendingTxn.hash
}

async function crank(signerAccount, instrumentCoin, quoteCoin) {
  const instrumentCoinTypeTag = new TxnBuilderTypes.TypeTagStruct(
    TxnBuilderTypes.StructTag.fromString(instrumentCoin)
  )
  const quoteCoinTypeTag = new TxnBuilderTypes.TypeTagStruct(
    TxnBuilderTypes.StructTag.fromString(quoteCoin)
  )

  const entryFunction = TxnBuilderTypes.EntryFunction.natural(
    `${process.env.FERUM_MODULE_ADDRESS}::market`,
    "rebalance_cache_entry",
    [instrumentCoinTypeTag, quoteCoinTypeTag],
    [BCS.bcsSerializeU8(10)]
  )

  return await sendSignedTransactionWithAccount(signerAccount, entryFunction)
}

async function main() {
  const quoteCoinType = `${process.env.FERUM_MODULE_ADDRESS}::test_coins::USDF`
  const instrumentCoinType = `${process.env.FERUM_MODULE_ADDRESS}::test_coins::APTF`

  const txHash = await crank(account, instrumentCoinType, quoteCoinType)

  const txResult = await client.waitForTransactionWithResult(txHash)

  console.log(txResult.success)
}
main()
