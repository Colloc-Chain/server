function ERC20(web3, address, abi) {
  this.address = address;
  this.contract = new web3.eth.Contract(abi, address);
}

ERC20.prototype.address = function () {
  return this.address;
};

ERC20.prototype.contract = function () {
  return this.contract;
};

ERC20.prototype.totalSupply = function () {
  return this.contract.methods.totalSupply().call();
};

ERC20.prototype.balanceOf = function (address) {
  return this.contract.methods.balanceOf(address).call();
};

ERC20.prototype.deposit = function (address, amount) {
  return this.contract.methods.deposit(address, amount).encodeABI();
};

ERC20.prototype.withdraw = function (amount) {
  return this.contract.methods.withdraw(amount).encodeABI();
};

ERC20.prototype.transfer = function (recipient, amount) {
  return this.contract.methods.transfer(recipient, amount).encodeABI();
};

ERC20.prototype.transferFrom = function (sender, recipient, amount) {
  return this.contract.methods.transferFrom(sender, recipient, amount).encodeABI();
};

ERC20.prototype.approve = function (spender, amount) {
  return this.contract.methods.approve(spender, amount).encodeABI();
};

ERC20.prototype.increaseAllowance = function (spender, amount) {
  return this.contract.methods.increaseAllowance(spender, amount).encodeABI();
};

ERC20.prototype.decreaseAllowance = function (spender, amount) {
  return this.contract.methods.decreaseAllowance(spender, amount).encodeABI();
};

module.exports = ERC20;
