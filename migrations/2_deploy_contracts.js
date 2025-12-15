var Draudimas = artifacts.require("Draudimas");

module.exports = function (deployer, network, accounts) {
  const owner = accounts[0];
  const client = accounts[1];

  deployer.deploy(Draudimas, client, 18, 1, 0);
};
