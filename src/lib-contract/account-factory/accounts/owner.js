const Account = require('./account');

function Owner(web3, account, erc20, erc721) {
  Account.call(this, web3, account, erc20, erc721);
}

Owner.prototype = Object.create(Account.prototype);
Owner.prototype.constructor = Owner;

Owner.prototype.registerLandlord = function (address) {
  const payload = this.erc721.registerLandlord(address);
  return this.sendTransaction(payload, this.erc721.address);
};

Owner.prototype.removeLandlord = function (address) {
  const payload = this.erc721.removeLandlord(address);
  return this.sendTransaction(payload, this.erc721.address);
};

module.exports = Owner;
