# set ferum testnet address
export set FERUM=0x728891241aa0dc576e23fa368c168f657b1364eb909c8444f28bc7e4a4a2268d

# create test coin
aptos move run \
  --type-args $FERUM::test_coins::USDF \
  --function-id 0x1::managed_coin::register \
  --profile ferum-tut

# mint coin
aptos move run \
  --function-id $FERUM::test_coins::mint_usdf \
  --args u64:10000000000000000 \
  --profile ferum-tut
aptos move run \
  --function-id $FERUM::test_coins::mint_aptf \
  --args u64:10000000000000000 \
  --profile ferum-tut

# Before interacting/trading on Ferum, 
# you need to open a market account and fund it. 
# open a market account
aptos move run \
  --function-id $FERUM::market::open_market_account_entry \
  --type-args 0x1::aptos_coin::AptosCoin $FERUM::test_coins::USDF \
  --profile default

# Deposit to market account.
aptos move run \
  --function-id $FERUM::market::deposit_to_market_account_entry \
  --type-args $FERUM::test_coins::APTF $FERUM::test_coins::USDF \
  --args u64:10000000000000000 u64:10000000000000000 \
  --profile ferum-tut

# place an order
aptos move run \
  --function-id $FERUM::market::add_order_entry \
  --type-args 0x1::aptos_coin::AptosCoin $FERUM::test_coins::USDF \
  --args u8:1 u8:1 u64:10000000000 u64:10000000000 u32:1 u64:0 \
  --profile ferum-tut

# Crank market.
aptos move run \
  --function-id $FERUM::market::crank_entry \
  --type-args 0x1::aptos_coin::AptosCoin $FERUM::test_coins::USDF \
  --args u8:10 \
  --profile default

# view market account
curl --request POST \
  --url https://fullnode.testnet.aptoslabs.com/v1/view \
  --header 'Content-Type: application/json; charset=utf-8' \
  --data '{
  "function": "0x728891241aa0dc576e23fa368c168f657b1364eb909c8444f28bc7e4a4a2268d::market::view_market_account",
  "type_arguments": [
    "0x1::aptos_coin::AptosCoin",
    "0x728891241aa0dc576e23fa368c168f657b1364eb909c8444f28bc7e4a4a2268d::test_coins::USDF"
  ],
  "arguments": [
    "0x728891241aa0dc576e23fa368c168f657b1364eb909c8444f28bc7e4a4a2268d",
    "0xf763fe2af78283f67909c9424ecbda781e106011777e7b92561972f33edf0c3a"
  ]
}' | jq .

