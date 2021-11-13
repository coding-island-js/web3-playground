// free web3 provider from cloudflare
const web3 = new Web3("https://cloudflare-eth.com");

// this variable will be the HTML ID value for the gas prices.
let dynamicElementID = 0;

// get gas price and convert to eth and usd every 1 second using the Set Interval Function
const interval = setInterval(function () {
  // when this function runs every 1 second, we will increment the ID value by 1. This will make more sense later in the code
  dynamicElementID = dynamicElementID + 1;

  // get gas price in WEI from Web3.js
  web3.eth.getGasPrice().then((data) => {
    // create bullet point element and assign an ID
    // the ID is used to compare the current price and the last price 1 second ago
    let timeOutResults = document.createElement("li");
    timeOutResults.id = dynamicElementID;

    // bind and display WEI gas price to the html element
    let textNode = document.createTextNode(data);
    timeOutResults.appendChild(textNode);
    let parent = document.getElementById("parent");
    parent.insertBefore(timeOutResults, parent.childNodes[0]);

    // get gas price in ETH from Web3.js and show 12 decimal places
    let etherValue = Web3.utils.fromWei(data, "ether");
    etherValue = Number(etherValue).toFixed(12);

    // bind and display ETH gas price to the html element
    let ethResults = document.createElement("li");
    let ethTextNode = document.createTextNode(etherValue);
    ethResults.appendChild(ethTextNode);
    let parentETH = document.getElementById("parent-eth");
    parentETH.insertBefore(ethResults, parentETH.childNodes[0]);

    // calculate the trend
    // grab last price using the ID created 1 second ago (current ID - 1)
    let lastPriceID = dynamicElementID - 1;
    let lastPrice = document.getElementById(lastPriceID);

    // get current price in WEI
    let currentPrice = data;

    //calculate the difference between the current price and last price in percentage
    let difference = Math.floor(
      ((currentPrice - lastPrice.innerText) / lastPrice.innerText) * 100
    );

     // bind and display trend % to the html element
    let trendResults = document.createElement("li");
    trendResults.id = "trend-" + dynamicElementID;
    let trendTextNode = document.createTextNode(difference + "%");
    trendResults.appendChild(trendTextNode);
    let parentTrend = document.getElementById("parent-trend");
    parentTrend.insertBefore(trendResults, parentTrend.childNodes[0]);

    //convert eth to usd using a free Currency Convertor API

    fetch("https://api.cryptonator.com/api/full/eth-usd")
      .then((response) => response.json())
      .then((data) => {
        let usdResults = document.createElement("li");
        let usdPrice = etherValue * data.ticker.price;
        let usdTextNode = document.createTextNode("$" + usdPrice.toFixed(4));
        usdResults.appendChild(usdTextNode);

        // use color to show if the trend is staying the same (yellow), increasing (green), or decreasing (pink)
        if (difference === 0) {
          trendResults.style.backgroundColor = "yellow";
          usdResults.style.backgroundColor = "yellow";
        }

        if (difference > 0) {
          trendResults.style.backgroundColor = "lightgreen";
          usdResults.style.backgroundColor = "lightgreen";
        }

        if (difference < 0) {
          trendResults.style.backgroundColor = "lightpink";
          usdResults.style.backgroundColor = "lightpink";
        }

        let parentUSD = document.getElementById("parent-usd");
        parentUSD.insertBefore(usdResults, parentUSD.childNodes[0]);
      });
  });
}, 1000);
