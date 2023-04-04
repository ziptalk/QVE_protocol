const axios = require("axios")
require("dotenv").config({ path: "../.env" })

const viewMarketAccount = async () => {
  const { data } = await axios.post(
    "https://fullnode.testnet.aptoslabs.com/v1/view",
    {
      function: `${process.env.FERUM_MODULE_ADDRESS}::market::view_market_account`,
      type_arguments: [
        `${process.env.FERUM_MODULE_ADDRESS}::test_coins::APTF`,
        `${process.env.FERUM_MODULE_ADDRESS}::test_coins::USDF`,
      ],
      arguments: [process.env.FERUM_MODULE_ADDRESS, process.env.MY_ACCOUNT],
    },
    {
      headers: { "Content-Type": "application/json", charset: "utf-8" },
    }
  )
  console.log("Get existing orders:", data[0].activeOrders, "\n")
}

exports.viewMarketAccount = viewMarketAccount
