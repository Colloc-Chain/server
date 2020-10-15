const { Owner, Landlord, Tenant } = require('./accounts');

function AccountFactory(web3, privateKey, erc20, erc721) {
  this.web3 = web3;
  this.account = web3.eth.accounts.privateKeyToAccount(privateKey);
  this.erc20 = erc20;
  this.erc721 = erc721;
}

AccountFactory.prototype.create = async function () {
  const owner = await this.erc721.owner();

  if (owner === this.account.address) {
    console.log('is owner');
    return new Owner(this.web3, this.account, this.erc20, this.erc721);
  }

  const isLandlord = await this.erc721.isLandlord(this.account.address);

  if (isLandlord) {
    console.log('is landlord');
    return new Landlord(this.web3, this.account, this.erc20, this.erc721);
  }

  console.log('is tenant');
  return new Tenant(this.web3, this.account, this.erc20, this.erc721);
};

module.exports = AccountFactory;
