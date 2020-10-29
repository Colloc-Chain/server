function createWeb3Account(web3) {
  return web3.eth.accounts.create();
}

module.exports = {
  createWeb3Account,
};
