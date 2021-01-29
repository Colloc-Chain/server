function ERC721(web3, address, abi) {
  this.address = address;
  this.contract = new web3.eth.Contract(abi, address);
}

ERC721.prototype.contract = function () {
  return this.contract;
};

ERC721.prototype.name = function () {
  return this.contract.methods.name().call();
};

ERC721.prototype.symbol = function () {
  return this.contract.methods.symbol().call();
};

ERC721.prototype.getTotalTokensCreated = function () {
  return this.contract.methods.getTotalTokensCreated().call();
};

ERC721.prototype.totalSupply = function () {
  return this.contract.methods.totalSupply().call();
};

ERC721.prototype.owner = function () {
  return this.contract.methods.owner().call();
};

ERC721.prototype.ownerOf = function (tokenId) {
  return this.contract.methods.ownerOf(tokenId).call();
};

ERC721.prototype.balanceOf = function (address) {
  return this.contract.methods.balanceOf(address).call();
};

/* ERC721.prototype.isLandlord = async function (address) {
   
  const result = this.contract.methods.isLandlord(address).call();
  console.log(`Landlord? ${result}`);
  return result;
}; */

ERC721.prototype.isLandlord = function (address) {
  const result = this.contract.methods.isLandlord(address).call();
  console.log(`Landlord? ${result}`);
  return result;
};

ERC721.prototype.registerLandlord = function (address) {
  return this.contract.methods.registerLandlord(address).encodeABI();
};

ERC721.prototype.removeLandlord = function (address) {
  return this.contract.methods.removeLandlord(address).encodeABI();
};

ERC721.prototype.registerTenant = function (tokenId, address) {
  return this.contract.methods.registerTenant(tokenId, address).encodeABI();
};

ERC721.prototype.removeTenant = function (tokenId, address) {
  return this.contract.methods.removeTenant(tokenId, address).encodeABI();
};

ERC721.prototype.getLeaseById = async function (tokenId) {
  const lease = await this.contract.methods.getLeaseById(tokenId).call();
  return { price: lease['0'], maxTenants: lease['1'], tenantsAddresses: lease['2'] };
};

ERC721.prototype.createLease = function (price, maxTenants, tenantsAddresses, tokenURI) {
  return this.contract.methods
    .createLease(price, maxTenants, tenantsAddresses, tokenURI)
    .encodeABI();
};

ERC721.prototype.removeLease = function (tokenId) {
  return this.contract.methods.removeLease(tokenId).encodeABI();
};

ERC721.prototype.payRent = function (tenant, landlord) {
  return this.contract.methods.PayRent(tenant, landlord).encodeABI();
};

module.exports = ERC721;
