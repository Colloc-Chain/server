/* eslint-disable camelcase */

const Web3 = require('web3');
const Web3EEA = require('web3-eea');
const AccountFactory = require('./account-factory');
const { ERC20, ERC721 } = require('./ercs');
const { __web3_uri__, __master_key__ } = require('../config');
const { getOneSmartContract } = require('../mongo/smart-contracts');

const web3 = new Web3EEA(new Web3(__web3_uri__));

async function getERC20() {
  const { address, abi } = await getOneSmartContract('erc20');
  return new ERC20(web3, address, abi);
}

async function getERC721() {
  const { address, abi } = await getOneSmartContract('erc721');
  return new ERC721(web3, address, abi);
}

async function getAccount() {
  const erc20 = await getERC20();
  const erc721 = await getERC721();
  const factory = new AccountFactory(web3, __master_key__, erc20, erc721);
  return factory.create();
}

function createPrivateKey() {
  return web3.eth.accounts.create().privateKey;
}

module.exports = {
  getERC20,
  getERC721,
  getAccount,
  createPrivateKey,
};
