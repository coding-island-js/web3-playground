# web3.js gas price tracker

## about

simple tool that:

- gets the gas price from web3.js in wei every 1 second
- converts wei to gwei
- converts wei to eth
- calculates the difference between the current gas price and last gas price from 1 second ago
- converts the eth to USD using a cryptocurrency exchange rate api

## disclaimer

- web3.js calculates the gas price in wei using the median price of the last few blocks
- api.cryptonator.com is the exchange rate API I am using
  - it is free and prices are updated every 30 seconds
  - for a real-time exchange rate, I think you have to use another API which most likely costs money
