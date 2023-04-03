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

// Helper function to create limit order.
async function addOrder(
  signerAccount,
  instrumentCoin,
  quoteCoin,
  side,
  typ,
  price,
  quantity
) {
  let parsedTyp = 0
  if (typ === "gtc") {
    parsedTyp = 1
  } else if (typ === "post") {
    parsedTyp = 2
  } else if (typ === "ioc") {
    parsedTyp = 3
  } else if (typ === "fok") {
    parsedTyp = 4
  }

  const instrumentCoinTypeTag = new TxnBuilderTypes.TypeTagStruct(
    TxnBuilderTypes.StructTag.fromString(instrumentCoin)
  )
  const quoteCoinTypeTag = new TxnBuilderTypes.TypeTagStruct(
    TxnBuilderTypes.StructTag.fromString(quoteCoin)
  )

  const entryFunction = TxnBuilderTypes.EntryFunction.natural(
    `${process.env.FERUM_MODULE_ADDRESS}::market`,
    "add_order_entry",
    [instrumentCoinTypeTag, quoteCoinTypeTag],
    [
      BCS.bcsSerializeU8(side === "buy" ? 2 : 1),
      BCS.bcsSerializeU8(parsedTyp),
      BCS.bcsSerializeUint64(price),
      BCS.bcsSerializeUint64(quantity),
      BCS.bcsSerializeU32(1),
      BCS.bcsSerializeUint64(""),
    ]
  )

  return await sendSignedTransactionWithAccount(signerAccount, entryFunction)
}

async function createOrder(coinPrice, side, size) {
  const price = coinPrice.toString()
  const quantity = (size * Math.pow(10, 10)).toString()
  const typ = "gtc"
  const instrumentCoinType = `${process.env.FERUM_MODULE_ADDRESS}::test_coins::APTF`
  const quoteCoinType = `${process.env.FERUM_MODULE_ADDRESS}::test_coins::USDF`

  const txHash = await addOrder(
    account,
    instrumentCoinType,
    quoteCoinType,
    side,
    typ,
    price,
    quantity
  )

  const txResult = await client.waitForTransactionWithResult(txHash)
  const decimalPoint = Math.pow(10, 10)
  const instrument = instrumentCoinType.split("::test_coins::")[1]
  const quote = quoteCoinType.split("::test_coins::")[1]

  console.log(
    `Side: ${txResult.events[0].data.orderMetadata.side === 1 ? "Sell" : "Buy"}
Price: ${txResult.events[0].data.orderMetadata.price / decimalPoint} ${quote}
Quantity: ${
      txResult.events[0].data.orderMetadata.originalQty / decimalPoint
    } ${instrument}
Order Number: ${txResult.events[0].data.orderMetadata.orderID.counter}
`
  )

  //   Best Ask Price: ${
  //     txResult.events[1].data.minAsk / decimalPoint
  //   } ${quote} | Size: ${
  //     txResult.events[1].data.askSize / decimalPoint
  //   } ${instrument}
  // Best Bid Price: ${
  //     txResult.events[1].data.maxBid / decimalPoint
  //   } ${quote} | Size: ${
  //     txResult.events[1].data.bidSize / decimalPoint
  //   } ${instrument}

  return txResult.events[0].data.orderMetadata.orderID.counter
}

exports.createOrder = createOrder
