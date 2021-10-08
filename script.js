const web3 = new Web3("https://cloudflare-eth.com");

// this variable will be the ID value for the gas prices
let dynamicElementID = 0;

// get gas price and convert to gwei, eth, and usd every 1 second
const interval = setInterval(function () {
  dynamicElementID = dynamicElementID + 1;

  // get gas price in wei from Web3.js
  web3.eth.getGasPrice().then((data) => {
    // create bullet point element and assign an ID
    // the ID is used to compare the current price and the last price 1 second ago
    let timeOutResults = document.createElement("li");
    timeOutResults.id = dynamicElementID;

    // bind and display gas price with html element
    let textNode = document.createTextNode(data);
    timeOutResults.appendChild(textNode);
    let parent = document.getElementById("parent");
    parent.insertBefore(timeOutResults, parent.childNodes[0]);

    // get gas price in gwei from Web3.js
    let gweiValue = Web3.utils.fromWei(data, "gwei");
    // show 2 decimal places
    gweiValue = Number(gweiValue).toFixed(2);

    // bind and display gas price with html element
    let gweiResults = document.createElement("li");
    let gweiTextNode = document.createTextNode(gweiValue);
    gweiResults.appendChild(gweiTextNode);
    let parentGWEI = document.getElementById("parent-gwei");
    parentGWEI.insertBefore(gweiResults, parentGWEI.childNodes[0]);

    // get gas price in eth from Web3.js
    let etherValue = Web3.utils.fromWei(data, "ether");
    // show 12 decimal places
    etherValue = Number(etherValue).toFixed(12);

    let ethResults = document.createElement("li");
    let ethTextNode = document.createTextNode(etherValue);
    ethResults.appendChild(ethTextNode);

    let parentETH = document.getElementById("parent-eth");
    parentETH.insertBefore(ethResults, parentETH.childNodes[0]);

    //trend
    // calculate the trend
    // grab last price
    let lastPriceID = dynamicElementID - 1;
    let lastPrice = document.getElementById(lastPriceID);
    let currentPrice = data;
    //  let difference = (currentPrice - lastPrice.innerText) / lastPrice.innerText;
    let difference = Math.floor(
      ((currentPrice - lastPrice.innerText) / lastPrice.innerText) * 100
    );
    console.log("difference: " + difference + "%");

    let trendResults = document.createElement("li");
    trendResults.id = "trend-" + dynamicElementID;
    let trendTextNode = document.createTextNode(difference + "%");

    trendResults.appendChild(trendTextNode);

    let parentTrend = document.getElementById("parent-trend");
    parentTrend.insertBefore(trendResults, parentTrend.childNodes[0]);

    //convert eth to usd

    fetch("https://api.cryptonator.com/api/full/eth-usd")
      .then((response) => response.json())
      .then((data) => {
        console.log(data.ticker.price);
        let usdResults = document.createElement("li");
        let usdPrice = etherValue * data.ticker.price;
        let usdTextNode = document.createTextNode("$" + usdPrice.toFixed(4));
        usdResults.appendChild(usdTextNode);

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

//clearInterval(interval);
