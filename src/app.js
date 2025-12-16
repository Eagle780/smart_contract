App = {
  web3Provider: null,
  contracts: {},
  instance: null,
  dabrAddr: null,

  init: function () {
    return App.initWeb3();
  },

  initWeb3: function () {
    if (window.ethereum) {
      /*
      App.web3Provider = window.ethereum;
      await window.ethereum.request({ method: "eth_requestAccounts" });
    } else {
      App.web3Provider = new Web3.providers.HttpProvider("http://127.0.0.1:9545");
      */
      App.web3Provider = new Web3.providers.HttpProvider("http://127.0.0.1:9545");
    }
    web3 = new Web3(App.web3Provider);
    return App.initContract();
  },

  initContract: function () {
    $.getJSON("Draudimas.json", function (data) {
      App.contracts.Draudimas = TruffleContract(data);
      console.log(App.contracts.Draudimas);
      App.contracts.Draudimas.setProvider(App.web3Provider);
      console.log("Contract loaded");

      App.sutartisParuosta();
    });
  },

  sutartisParuosta: async function () {
    App.instance = await App.contracts.Draudimas.deployed();
    console.log("Contract instance ready");

    await gautiAdresus();
    //kitas funkcijas kviesti cia
  },
};

window.addEventListener("load", function () {
  App.init();
});

async function gautiAdresus() {
  const adresai = await web3.eth.getAccounts();
  console.log(adresai[0]);
  App.adresai = adresai;

  const select = document.getElementById("adresai");

  var i = 0;
  adresai.forEach((addr) => {
    i++;
    const pasirinkimas = document.getElementById(i);
    pasirinkimas.text = addr;
  });

  App.dabrAddr = adresai[0];
  select.onchange = () => {
    App.dabrAddr = select.value;
  };
}
