const WebSocket = require("ws")
require("dotenv").config({ path: "../.env" })
const { createOrder } = require("./createOrder")
const { cancelOrders } = require("./cancelOrders")
const { viewMarketAccount } = require("./viewMarketAccount")

const threshold = 30

const main = async () => {
  const binanceWebsocket = (binanceProduct) => {
    let count = threshold
    let bidIndex = 0
    let askIndex = 0

    const orderBookBinance = new WebSocket(
      `${process.env.binance_mainnet_websocket}/stream?streams=${binanceProduct}@depth5@500ms` // 100, 250, 500 ms
    )

    orderBookBinance.on("message", async (data) => {
      const orderBook = JSON.parse(data).data
      // get price every 500ms * threshold
      if (count++ % threshold === 0) {
        count = 1
        console.log(
          `Get Reference Market(Binance) Price of ${binanceProduct} every ${
            threshold * 0.5
          } seconds
Best ask: ${orderBook.a[0][0]}
Best bid: ${orderBook.b[0][0]}
          `
        )

        if (askIndex !== 0 && bidIndex !== 0) {
          console.log("If there is existing orders then cancel those orders")
          await cancelOrders()

          // if order is filled then enter opposite position in reference market
        }
        await viewMarketAccount()

        // size = market making account / 24h trading volume
        // buffer = 1%
        askIndex = await createOrder(
          Math.round(orderBook.a[0][0] * 1.01 * Math.pow(10, 3)) *
            Math.pow(10, 7),
          "sell",
          10
        )
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
