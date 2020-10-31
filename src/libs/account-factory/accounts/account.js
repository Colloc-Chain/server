function Account(web3, account, erc20, erc721) {
  this.web3 = web3;
  this.account = account;
  this.erc20 = erc20;
  this.erc721 = erc721;
}

Account.prototype.address = function () {
  return this.account.address;
};

Account.prototype.isLandlord = function () {
  return this.erc721.isLandlord(this.account.address);
};

Account.prototype.getLeaseById = function (tokenId) {
  return this.erc721.getLeaseById(tokenId);
};

Account.prototype.sendTransaction = async function (payload, to) {
  const nonce = await this.web3.eth.getTransactionCount(this.account.address);
  const tx = {
    data: payload,
    nonce,
    to,
    gas: 1000000,
  };

  const { rawTransaction } = await this.account.signTransaction(tx);
  return this.web3.eth.sendSignedTransaction(rawTransaction);
};

module.exports = Account;
