var Draudimas = artifacts.require("Draudimas");

module.exports = async function (deployer, network, accounts) {
  const owner = accounts[0];
  const client = accounts[1];

  await deployer.deploy(Draudimas, client, 18, 1, 0);
};
