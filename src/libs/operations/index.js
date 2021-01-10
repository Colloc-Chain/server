/* eslint-disable camelcase */
const Web3 = require('web3');
const Web3EEA = require('web3-eea');
const { __web3_uri__ } = require('@libs/config');
const AccountFactory = require('@libs/account-factory');
const { ERC20, ERC721 } = require('@libs/smart-contracts');
const { getOneSmartContract, registerOneSmartContract } = require('@libs/mongo/smart-contracts');
const {
  getAllUsers,
  getUserById,
  login,
  getOwner,
  registerOneUser,
  deleteOneUser,
  updateOneUser,
} = require('@libs/mongo/users');
const {
  getAllLeases,
  getOneLeaseById,
  getAllLeasesByOwnerId,
  registerLease,
  removeLease,
} = require('@libs/mongo/leases');

class Operations {
  constructor() {
    this.web3 = new Web3EEA(new Web3(__web3_uri__));
    this.init();
    this.getSmartContract = getOneSmartContract.bind(this);
    this.registerOneSmartContract = registerOneSmartContract.bind(this);
    this.registerOneUser = registerOneUser.bind(this);
    this.getAllLeases = getAllLeases.bind(this);
    this.getOneLeaseById = getOneLeaseById.bind(this);
    this.getAllLeasesByOwnerId = getAllLeasesByOwnerId.bind(this);
    this.getAllUsers = getAllUsers.bind(this);
    this.getUserById = getUserById.bind(this);
    this.login = login.bind(this);
    this.updateOneUser = updateOneUser.bind(this);
    this.deleteUser = deleteOneUser.bind(this);
  }

  async init() {
    const { address: erc20Address, abi: erc20Abi } = await getOneSmartContract('erc20');
    const { address: erc721Address, abi: erc721Abi } = await getOneSmartContract('erc721');
    this.erc20 = new ERC20(this.web3, erc20Address, erc20Abi);
    this.erc721 = new ERC721(this.web3, erc721Address, erc721Abi);
    const { privateKey } = await getOwner();
    const accountFactory = new AccountFactory(this.web3, privateKey, this.erc20, this.erc721);
    this.ownerAccount = await accountFactory.create();
  }

  createWeb3Account() {
    return this.web3.eth.accounts.create();
  }

  async createLandlordAccount(firstname, lastname, email, password) {
    const userAccount = this.createWeb3Account(this.web3);
    await this.ownerAccount.registerLandlord(userAccount.address);
    // prettier-ignore
    return registerOneUser(firstname, lastname, email, password, 'landlord', userAccount.privateKey);
  }

  async createTenantAccount(firstname, lastname, email, password) {
    const userAccount = this.createWeb3Account(this.web3);
    return registerOneUser(firstname, lastname, email, password, 'tenant', userAccount.privateKey);
  }

  // prettier-ignore
  async createLease(userId, type, size, address, city, price, rooms, maxTenants, tenants, tokenURI) {
    const { status, privateKey } = await this.getUserById(userId);

    if (status !== 'landlord') {
      throw new Error(`createLease: user ${userId} not landlord`);
    }

    const accountFactory = new AccountFactory(this.web3, privateKey, this.erc20, this.erc721);
    const userAccount = await accountFactory.create();
    // get tokenId before creating new one to preserve same index => tokenId starts at 0
    const tokenId = await this.erc721.getTotalTokensCreated();
    await userAccount.createLease(price, maxTenants, tenants, tokenURI);
    return registerLease(tokenId, userId, type, size, address, city, price, rooms, maxTenants, tenants, tokenURI);
  }

  async deleteLease(userId, leaseId) {
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

  async getUserBalanceById(userId) {
    const { balance } = await this.getUserById(userId);
    return balance;
  }

  async deposit(userId, amount) {
    const { status, privateKey, balance } = await this.getUserById(userId);

    if (status !== 'tenant') {
      throw new Error('only tenant can deposit');
    }

    const accountFactory = new AccountFactory(this.web3, privateKey, this.erc20, this.erc721);
    const userAccount = await accountFactory.create();
    const { status: transactionPassed } = await userAccount.deposit(amount);

    if (transactionPassed) {
      const filter = { _id: userId };
      const values = {
        $set: {
          balance: balance + amount,
        },
      };

      await this.updateOneUser(filter, values);
    }

    return transactionPassed;
  }

  async withdraw(userId, amount) {
    const { status, privateKey, balance } = await this.getUserById(userId);

    if (status !== 'tenant') {
      throw new Error('only tenant can withdraw');
    }

    const accountFactory = new AccountFactory(this.web3, privateKey, this.erc20, this.erc721);
    const userAccount = await accountFactory.create();

    const { status: transactionPassed } = await userAccount.withdraw(amount);

    if (transactionPassed) {
      const filter = { _id: userId };
      const values = {
        $set: {
          balance: balance - amount,
        },
      };

      await this.updateOneUser(filter, values);
    }

    return transactionPassed;
  }
}

const OperationsManager = new Operations();

module.exports = { OperationsManager };
