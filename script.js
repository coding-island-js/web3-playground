const web3 = new Web3("https://cloudflare-eth.com");

web3.eth.getBlockNumber().then((data) => {
  console.log(data);
  document.getElementById("block").innerText = data;
});

web3.eth.getGasPrice().then((data) => {
  console.log(data);
  document.getElementById("gas").innerText = data;
});


/*
web3.eth.getBlockNumber(function (error, result) {
  console.log(result);
  document.getElementById("block").innerText = result;
});



*/