const WebSocket = require("ws")
require("dotenv").config({ path: "../.env" })
const { createOrder } = require("./createOrder")
const { cancelOrder } = require("./cancelOrderEntry")
const { viewMarketAccount } = require("./viewMarketAccount")

const round = (num, point) => {
  return Number(Math.round(num + `e+${point}`) + `e-${point}`)
}
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

const main = async () => {
  const binanceWebsocket = (binanceProduct) => {
    let count = 20
    let bidIndex = 0
    let askIndex = 0

    const orderBookBinance = new WebSocket(
      `${process.env.binance_mainnet_websocket}/stream?streams=${binanceProduct}@depth5@500ms` // 100, 250, 500 ms
    )

    orderBookBinance.on("message", async (data) => {
      const orderBook = JSON.parse(data).data
      // 500ms * 20 = every 10 seconds
      if (count++ % 20 === 0) {
        count = 1
        console.log(
          binanceProduct,
          orderBook.a[0][0],
          orderBook.b[0][0],
          Date.now()
        )

        if (askIndex !== 0 && bidIndex !== 0) {
          await cancelOrder(askIndex)
          await sleep(1000)
          await cancelOrder(bidIndex)
        }
        await viewMarketAccount()

        // size = market making account / 24h trading volume
        // buffer = 1%
        console.log(
          "hi",
          Math.round(orderBook.a[0][0] * 1.01 * Math.pow(10, 3)) *
            Math.pow(10, 7)
        )

        askIndex = await createOrder(
          Math.round(orderBook.a[0][0] * 1.01 * Math.pow(10, 3)) *
            Math.pow(10, 7),
          "sell",
          10
        )
        await sleep(1000)
        bidIndex = await createOrder(
          Math.round(orderBook.b[0][0] * 0.99 * Math.pow(10, 3)) *
            Math.pow(10, 7),
          "buy",
          10
        )

        await viewMarketAccount()
      }
    })

    orderBookBinance.on("close", () => {
      orderBookBinance.close()
      binanceWebsocket(binanceProduct)
    })
    orderBookBinance.on("error", () => {
      orderBookBinance.close()
      binanceWebsocket(binanceProduct)
    })
  }

  binanceWebsocket("aptusdt")
}

main()
