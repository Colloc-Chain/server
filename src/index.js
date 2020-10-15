const Web3 = require('web3');
const Web3EEA = require('web3-eea');

// prettier-ignore
// eslint-disable-next-line object-curly-newline
const { ERC20_ADDRESS, ERC721_ADDRESS, ERC20_ABI, ERC721_ABI, MASTER_KEY, LANDLORD_KEY } = require('./config');
const { ERC20, ERC721 } = require('./lib-contract/ercs');
const AccountFactory = require('./lib-contract/account-factory');

const web3 = new Web3EEA(new Web3('http://localhost:8545'));

const erc20 = new ERC20(web3, ERC20_ADDRESS, ERC20_ABI);
const erc721 = new ERC721(web3, ERC721_ADDRESS, ERC721_ABI);
const dude = web3.eth.accounts.create();
const accountFactory = new AccountFactory(web3, dude.privateKey, erc20, erc721);
// const accountFactory = new AccountFactory(web3, MASTER_KEY, erc20, erc721);

// eslint-disable-next-line no-unused-vars
const testAccount = async () => {
  const account = await accountFactory.create();
  const res = await account.isLandlord();
  // const res = await account.isLandlord();
  // const res = await account.registerLandlord(publicKey);
  // const res = await account.removeLandlord(publicKey);
  // const res = await account.createLease(3000, 4, [], 'hello');
  // const res = await account.removeLease(1);
  // const res = await account.getLeaseById(1);
  console.log(res);
};

const main = async () => {
  testAccount();
};

main();
