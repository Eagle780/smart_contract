var klientas = document.getElementById("klientas");
var draudejas = document.getElementById("draudejas");
var menesis = document.getElementById("menesis");
var menesioSuma = document.getElementById("menesioSuma");
var sumoketiM = document.getElementById("sumoketi");
var ivykis = document.getElementById("ivykis");
var ivykisP = document.getElementById("ivykisP");
var ismoka = document.getElementById("ismoka");
var ismokaP = document.getElementById("ismokaP");

var menNr = 0;
var sumoketiMen = 0;

App = {
  web3Provider: null,
  contracts: {},
  instance: null,
  dabrAddr: null,
  menesiai: {},

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
    pasirinkimas.value = addr;
  });

  App.dabrAddr = adresai[0];
  rasytiBalansa();
  select.onchange = () => {
    App.dabrAddr = select.value;
    rasytiBalansa();
  };
}

async function rasytiBalansa() {
  const wei = await web3.eth.getBalance(App.dabrAddr);
  const bal = web3.utils.fromWei(wei, "ether");
  var addrBal = document.getElementById("bal");
  addrBal.innerHTML = `Balansas: ${bal} Eth`;
}

async function skaiciuotiSuma() {
  App.instance.skaiciuotiSuma({
    from: App.dabrAddr,
  });
  if (App.dabrAddr == App.adresai[0]) {
    menNr++;
    menesioSuma.innerHTML = `Draudėjas suskaičiavo ${menNr}-ojo mėnesio sumą`;
  } else {
    alert("Veiksmą atlieka netinkamas adresas");
  }
}

async function sumoketi() {
  const men = await App.instance.gautiMenesi(0);
  await App.instance.sumoketi({
    from: App.dabrAddr,
    value: web3.utils.toWei(men.suma.toString(), "wei"),
  });
  if (App.dabrAddr == App.adresai[1]) {
    sumoketiMen++;
    sumoketiM.innerHTML = `Klientas sumokėjo už ${sumoketiMen}-ąjį mėnesį`;
    await atnaujintiBal();
    await rasytiBalansa();
  } else {
    alert("Veiksmą atlieka netinkamas adresas");
  }
}

function uzregistruotiIvyki() {
  if (ivykis.value == "") return;
  if (ivykis.value >= 3) {
    alert("Ivykis gali buti tik 0 - Smulkus, 1 - vidutinis ir 2 - sunkus");
    return;
  }
  App.instance.uzregistruotiIvyki(ivykis.value, {
    from: App.dabrAddr,
  });
  ivykisP.innerHTML = `Įvykis užregistruotas prie ${sumoketiMen}-ojo mėnesio`;
}

async function atliktiIsmoka() {
  if (ismoka.value == "") return;
  if (ismoka.value >= sumoketiMen) {
    alert("pasirinktas netinkamas menuo");
    return;
  }
  var men;
  var n = menNr;
  if (n == 0) n++;
  for (let i = 0; i < n; i++) {
    var menL = await App.instance.gautiMenesi(i);
    if (menL.sumokejo) men = menL;
  }
  await App.instance.ismoka(ismoka.value, {
    from: App.dabrAddr,
    value: web3.utils.toWei(men.reikiamaSuma.toString(), "wei"),
  });
  await atnaujintiBal();
  await rasytiBalansa();
  ismokaP.innerHTML = `Draudėjas pervedė išmoką dėl ${sumoketiMen}-ojo mėnesio`;
}

async function pervestiPinigus() {
  if (App.dabrAddr == App.adresai[0]) {
    await App.instance.pervestiPinigus({
      from: App.dabrAddr,
    });
    var pinigai = document.getElementById("pinigai");
    pinigai.innerHTML = "Pinigai pervesti draudėjui ir klientui";
    await atnaujintiBal();
    await rasytiBalansa();
  } else {
    alert("Veiksmą atlieka netinkamas adresas");
  }
}

async function atnaujintiBal() {
  var sutBal = document.getElementById("sutBal");
  const balWei = await web3.eth.getBalance(App.instance.address);
  const balEth = web3.utils.fromWei(balWei, "ether");
  sutBal.innerHTML = `Sutarties balansas: ${balEth} Eth`;
}

async function gautiKlienta() {
  const kl = await App.instance.getKlientas();
  console.log(
    kl.klientoAddr,
    kl.amzius.words[0],
    kl.sveikata.words[0],
    kl.profesija.words[0]
  );
  klientas.innerHTML = `Kliento adresas: ${kl.klientoAddr},
  amzius: ${kl.amzius.words[0]},
  sveikata: ${kl.sveikata.words[0]},
  profesija: ${kl.profesija.words[0]}`;
}

async function gautiDraudeja() {
  const dr = await App.instance.getDraudejas();
  console.log(dr);
  draudejas.innerHTML = `draudejo adresas: ${dr}`;
}

async function gautiMenesi() {
  var n = document.getElementById("nr");
  if (n.value == "" || n.value > menNr) {
    alert("Netinkama įvestis");
    return;
  }
  const men = await App.instance.gautiMenesi(n.value);
  console.log(
    web3.utils.fromWei(men.suma.toString(), "ether"),
    men.sumokejo,
    men.ivykiuSkaicius.words[0],
    web3.utils.fromWei(men.ismoketaSuma.toString(), "ether")
  );
  menesis.innerHTML = `menesio suma: ${web3.utils.fromWei(
    men.suma,
    "ether"
  )}, ar sumoketa: ${men.sumokejo}, ivykiu skaicius: ${
    men.ivykiuSkaicius.words[0]
  }, reikiama suma: ${web3.utils.fromWei(
    men.reikiamaSuma,
    "ether"
  )} ismoketa suma: ${web3.utils.fromWei(men.ismoketaSuma, "ether")}`;
}
