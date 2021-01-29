const { Owner, Landlord, Tenant } = require('./accounts');

function AccountFactory(web3, erc20, erc721) {
  this.web3 = web3;
  this.erc20 = erc20;
  this.erc721 = erc721;
}

// TODO: In our case, there is only one owner so retrieve the one stored in database
AccountFactory.prototype.create = async function (privateKey) {
  // contracts are deployed with same account
  const owner = await this.erc721.owner();
  const account = this.web3.eth.accounts.privateKeyToAccount(privateKey);

  if (owner === account.address) {
    console.log('is owner');
    return new Owner(this.web3, account, this.erc20, this.erc721);
  }

  // const isLandlord = await this.erc721.isLandlord(account.address);
  const isLandlord = await this.erc721.isLandlord(account.address);
  console.log(isLandlord);

  if (isLandlord) {
    console.log('is landlord');
    return new Landlord(this.web3, account, this.erc20, this.erc721);
  }

  console.log('is tenant');
  return new Tenant(this.web3, account, this.erc20, this.erc721);
};

module.exports = AccountFactory;
