const axios = require("axios")
require("dotenv").config({ path: "../.env" })

const thousandsSeparator = (target) => {
  return target?.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
}

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
  console.log(
    data[0].activeOrders
    //     `
    // instrument balance: ${thousandsSeparator(
    //       data[0].instrumentBalance / 10 ** 10
    //     )} APT
    // quote balance: ${thousandsSeparator(data[0].quoteBalance / 10 ** 10)} USDF
    // `
  )
}
// viewMarketAccount()

exports.viewMarketAccount = viewMarketAccount
