const Account = require('./account');

function Tenant(web3, account, erc20, erc721) {
  Account.call(this, web3, account, erc20, erc721);
}

Tenant.prototype = Object.create(Account.prototype);
Tenant.prototype.constructor = Tenant;

Tenant.prototype.deposit = function (amount) {
  const payload = this.erc20.deposit(this.account.address, amount);
  return this.sendTransaction(payload, this.erc20.address);
};

Tenant.prototype.withdraw = function (amount) {
  const payload = this.erc20.withdraw(this.account.address, amount);
  return this.sendTransaction(payload, this.erc20.address);
};

module.exports = Tenant;
