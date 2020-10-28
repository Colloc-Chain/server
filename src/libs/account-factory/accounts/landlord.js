const Account = require('./account');

function Landlord(web3, account, erc20, erc721) {
  Account.call(this, web3, account, erc20, erc721);
}

Landlord.prototype = Object.create(Account.prototype);
Landlord.prototype.constructor = Landlord;

Landlord.prototype.createLease = function (price, maxTenants, tenantsAddresses, tokenURI) {
  const payload = this.erc721.createLease(price, maxTenants, tenantsAddresses, tokenURI);
  return this.sendTransaction(payload, this.erc721.address);
};

Landlord.prototype.removeLease = function (tokenId) {
  const payload = this.erc721.removeLease(tokenId);
  return this.sendTransaction(payload, this.erc721.address);
};

Landlord.prototype.registerTenant = function (tokenId, address) {
  const payload = this.erc721.registerTenant(tokenId, address);
  return this.sendTransaction(payload, this.erc721.address);
};

Landlord.prototype.removeTenant = function (tokenId, address) {
  const payload = this.erc721.removeTenant(tokenId, address);
  return this.sendTransaction(payload, this.erc721.address);
};

module.exports = Landlord;
