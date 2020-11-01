/* eslint-disable camelcase */
const Web3 = require('web3');
const Web3EEA = require('web3-eea');
const mongoose = require('mongoose');
const AccountFactory = require('../account-factory');
const { ERC20, ERC721 } = require('../smart-contracts');
const { getOneSmartContract, registerOneSmartContract } = require('../mongo/smart-contracts');
const {
  getAllUsers,
  getUserById,
  registerOneUser,
  deleteOneUser,
  updateOneUser,
} = require('../mongo/users');
const {
  getAllLeases,
  getOneLeaseById,
  getAllLeasesByOwnerId,
  registerLease,
} = require('../mongo/leases');
const { createWeb3Account } = require('./utils');
const { __web3_uri__, __mongo_uri__, __master_key__ } = require('../config');

class Operations {
  constructor() {
    this.web3 = new Web3EEA(new Web3(__web3_uri__));
    this.privateKey = __master_key__;
    this.init();
    this.getSmartContract = getOneSmartContract.bind(this);
    this.registerOneSmartContract = registerOneSmartContract.bind(this);
    this.getAllLeases = getAllLeases.bind(this);
    this.getOneLeaseById = getOneLeaseById.bind(this);
    this.getAllLeasesByOwnerId = getAllLeasesByOwnerId.bind(this);
    this.getAllUsers = getAllUsers.bind(this);
    this.getUserById = getUserById.bind(this);
    this.updateOneUser = updateOneUser.bind(this);
    this.deleteUser = deleteOneUser.bind(this);
  }

  async init() {
    await mongoose.connect(__mongo_uri__, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: true,
    });
    await this.getERCs();
  }

  async getERCs() {
    const { address: erc20Address, abi: erc20Abi } = await getOneSmartContract('erc20');
    const { address: erc721Address, abi: erc721Abi } = await getOneSmartContract('erc721');
    this.erc20 = new ERC20(this.web3, erc20Address, erc20Abi);
    this.erc721 = new ERC721(this.web3, erc721Address, erc721Abi);
    const accountFactory = new AccountFactory(this.web3, this.privateKey, this.erc20, this.erc721);
    this.nodeAccount = await accountFactory.create();
  }

  async createLandlordAccount(firstname, lastname) {
    await this.init();
    const userAccount = createWeb3Account(this.web3);
    await this.nodeAccount.registerLandlord(userAccount.address);
    return registerOneUser(firstname, lastname, 'landlord', userAccount.privateKey);
  }

  async createTenantAccount(firstname, lastname) {
    await this.init();
    const userAccount = createWeb3Account(this.web3);
    return registerOneUser(firstname, lastname, 'tenant', userAccount.privateKey);
  }

  // prettier-ignore
  async createLease(userId, type, size, address, city, price, rooms, maxTenants, tenants, tokenURI) {
    await this.init();
    const { status, privateKey } = await this.getUserById(userId);

    if (status !== 'landlord') {
      throw new Error(`createLease: user ${userId} not landlord`);
    }

    const accountFactory = new AccountFactory(this.web3, privateKey, this.erc20, this.erc721);
    const userAccount = await accountFactory.create();
    await userAccount.createLease(price, maxTenants, tenants, tokenURI);
    // prettier-ignore
    return registerLease(userId, type, size, address, city, price, rooms, maxTenants, tenants, tokenURI);
  }
}

const OperationsManager = new Operations();

module.exports = { OperationsManager };
