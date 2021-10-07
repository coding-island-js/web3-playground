const web3 = new Web3("https://cloudflare-eth.com");

let numberTest = 0;

const interval = setInterval(function () {
  numberTest = numberTest + 1;
  web3.eth.getGasPrice().then((data) => {
    console.log(data);
    let timeOutResults = document.createElement("li");
    timeOutResults.id = numberTest;
    let textNode = document.createTextNode(data);
    timeOutResults.appendChild(textNode);

    let parent = document.getElementById("parent");
    parent.insertBefore(timeOutResults, parent.childNodes[0]);

    let etherValue = Web3.utils.fromWei(data, "ether");

    let ethResults = document.createElement("li");
    let ethTextNode = document.createTextNode(etherValue);
    ethResults.appendChild(ethTextNode);

    let parentETH = document.getElementById("parent-eth");
    parentETH.insertBefore(ethResults, parentETH.childNodes[0]);

    // calculate the trend
    // grab last price
    let lastPriceID = numberTest - 1;
    let lastPrice = document.getElementById(lastPriceID);
    let currentPrice = data;
    //  let difference = (currentPrice - lastPrice.innerText) / lastPrice.innerText;
    let difference = Math.floor(
      ((currentPrice - lastPrice.innerText) / lastPrice.innerText) * 100
    );
    console.log("difference: " + difference + "%");

    let trendResults = document.createElement("li");
    trendResults.id = "trend-" + numberTest;
    let trendTextNode = document.createTextNode(difference + "%");

    trendResults.appendChild(trendTextNode);

    let parentTrend = document.getElementById("parent-trend");
    parentTrend.insertBefore(trendResults, parentTrend.childNodes[0]);
    

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
