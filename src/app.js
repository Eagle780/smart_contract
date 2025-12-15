App = {
  web3Provider: null,
  contracts: {},

  init: async function () {
    return App.initWeb3();
  },

  initWeb3: async function () {
    if (window.ethereum) {
      App.web3Provider = window.ethereum;
      await window.ethereum.request({ method: "eth_requestAccounts" });
    } else {
      App.web3Provider = new Web3.providers.HttpProvider("http://127.0.0.1:9545");
    }

    web3 = new Web3(App.web3Provider);
    return App.initContract();
  },

  initContract: function () {
    $.getJSON("Draudimas.json", function (data) {
      App.contracts.Draudimas = TruffleContract(data);
      App.contracts.Draudimas.setProvider(App.web3Provider);
      console.log("Contract loaded");
    });
  },
};

$(function () {
  $(window).load(function () {
    App.init();
  });
});

/*
$.getJSON("../build/contracts/Draudimas.json", function (data) {
  // Get the necessary contract artifact file and instantiate it with truffle-contract
  var voteArtifact = data;
  App.contracts.vote = TruffleContract(voteArtifact);
  // Set the provider for our contract
  App.contracts.vote.setProvider(App.web3Provider);
  return App.bindEvents();
});

// Modern dapp browsers...
if (window.ethereum) {
  App.web3Provider = window.ethereum;
  try {
    // Request account access
    window.ethereum.enable();
  } catch (error) {
    // User denied account access...
    console.error("User denied account access");
  }
}
// Legacy dapp browsers...
else if (window.web3) {
  App.web3Provider = window.web3.currentProvider;
}
// If no injected web3 instance is detected, fall back to Ganache
else {
  App.web3Provider = new Web3.providers.HttpProvider("http://localhost:9545");
}
web3 = new Web3(App.web3Provider);
*/
/*
const Web3 = require("web3");
const contractJson = require("../Draudimas.json");

const web3 = new Web3("http://127.0.0.1:9545");

async function main() {
  const accounts = await web3.eth.getAccounts();

  const contract = new web3.eth.Contract(
    contractJson.abi,
    contractJson.networks["5777"].address // develop network id
  );

  console.log("Owner:", accounts[0]);

  const result = await contract.methods.someMethod().call({ from: accounts[0] });

  console.log(result);
}

main();
*/
