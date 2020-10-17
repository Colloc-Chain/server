const Web3 = require('web3');
const Web3EEA = require('web3-eea');
const AccountFactory = require('./account-factory');
const { ERC20, ERC721 } = require('./ercs');
// prettier-ignore
// eslint-disable-next-line object-curly-newline
const { WEB3_ENDPOINT, MASTER_KEY, ERC20_ADDRESS, ERC721_ADDRESS, ERC20_ABI, ERC721_ABI } = require('../../config')

const web3 = new Web3EEA(new Web3(WEB3_ENDPOINT));
const erc20 = new ERC20(web3, ERC20_ADDRESS, ERC20_ABI);
const erc721 = new ERC721(web3, ERC721_ADDRESS, ERC721_ABI);
const factory = new AccountFactory(web3, MASTER_KEY, erc20, erc721);

const getERC20 = () => erc20;

const getERC721 = () => erc721;

const getAccount = () => factory.create();

const createPrivateKey = () => web3.eth.accounts.create().privateKey;

module.exports = {
  getERC20,
  getERC721,
  getAccount,
  createPrivateKey,
};
