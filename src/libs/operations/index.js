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
  removeLease,
} = require('../mongo/leases');
const { __web3_uri__, __mongo_uri__, __master_key__ } = require('../config');

mongoose.connect(__mongo_uri__, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: true,
});

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

  createWeb3Account() {
    return this.web3.eth.accounts.create();
  }

  async createLandlordAccount(firstname, lastname) {
    await this.init();
    const userAccount = this.createWeb3Account(this.web3);
    await this.nodeAccount.registerLandlord(userAccount.address);
    return registerOneUser(firstname, lastname, 'landlord', userAccount.privateKey);
  }

  async createTenantAccount(firstname, lastname) {
    await this.init();
    const userAccount = this.createWeb3Account(this.web3);
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
    // get tokenId before creating new one to preserve same index => tokenId starts at 0
    const tokenId = await this.erc721.getTotalTokensCreated()
    await userAccount.createLease(price, maxTenants, tenants, tokenURI);
    // prettier-ignore
    return registerLease(tokenId, userId, type, size, address, city, price, rooms, maxTenants, tenants, tokenURI);
  }

  async deleteLease(userId, leaseId) {
    await this.init();
    const { status, privateKey } = await this.getUserById(userId);
    const { ownerId, tokenId } = await this.getOneLeaseById(leaseId);

    if (status !== 'landlord' || userId !== ownerId) {
      throw new Error(`deleteLease: user ${userId} not landlord or not owner of this lease`);
    }

    const accountFactory = new AccountFactory(this.web3, privateKey, this.erc20, this.erc721);
    const userAccount = await accountFactory.create();
    await userAccount.removeLease(tokenId);
    return removeLease(leaseId);
  }
}

const OperationsManager = new Operations();

module.exports = { OperationsManager };
