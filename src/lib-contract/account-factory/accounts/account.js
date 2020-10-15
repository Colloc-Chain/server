function Account(web3, account, erc20, erc721) {
  this.web3 = web3;
  this.account = account;
  this.erc20 = erc20;
  this.erc721 = erc721;
}

Account.prototype.isLandlord = function () {
  return this.erc721.isLandlord(this.account.address);
};

Account.prototype.getLeaseById = function (tokenId) {
  return this.erc721.getLeaseById(tokenId);
};

Account.prototype.signTransaction = async function (payload, contractAddress) {
  const nonce = await this.web3.eth.getTransactionCount(this.account.address);
  const tx = {
    data: payload,
    nonce,
    to: contractAddress,
    gas: 10000000,
  };

  return this.account.signTransaction(tx);
};

Account.prototype.sendTransaction = async function (payload, contractAddress) {
  const { rawTransaction } = await this.signTransaction(payload, contractAddress);
  return this.web3.eth.sendSignedTransaction(rawTransaction);
};

module.exports = Account;
