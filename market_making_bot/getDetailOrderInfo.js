const axios = require("axios")
require("dotenv").config({ path: "../.env" })

const view_order = async (counter) => {
  const toHexadecimal = (from) => {
    const hexa = from.toString(16)
    return `0x${"0".repeat(8 - hexa.length)}${hexa}`
  }

  try {
    const { data } = await axios.post(
      "https://fullnode.testnet.aptoslabs.com/v1/view",
      {
        function: `${process.env.FERUM_MODULE_ADDRESS}::market::view_order`,
        type_arguments: [
          `${process.env.FERUM_MODULE_ADDRESS}::test_coins::APTF`,
          `${process.env.FERUM_MODULE_ADDRESS}::test_coins::USDF`,
        ],
        arguments: [
          process.env.FERUM_MODULE_ADDRESS,
          process.env.MY_ACCOUNT,
          Number(toHexadecimal(counter)),
        ],
      },
      {
        headers: { "Content-Type": "application/json", charset: "utf-8" },
      }
    )
    console.log(
      data,
      `
      ${data[0].side === 1 ? "sell" : "buy"}
      price: ${data[0].price / 10 ** 10}
      quantity: ${data[0].originalQty / 10 ** 10}
      unfilled quantity: ${data[0].unfilledQty / 10 ** 10}
      takerCrankPendingQty: ${data[0].takerCrankPendingQty / 10 ** 10}
      ${data[0].originalQty / 10 ** 10} APT를 각 ${
        data[0].price / 10 ** 10
      } USDF에 ${data[0].side === 1 ? "팔" : "사"}겠다.
      `
    )
  } catch (e) {
    console.error(e.response.data)
  }
}
view_order(91)
