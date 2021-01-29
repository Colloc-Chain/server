/* eslint-disable camelcase */
/* eslint-disable no-underscore-dangle */
const Web3 = require('web3');
const Web3EEA = require('web3-eea');
const { __web3_uri__, __node_private_key__, __eth_to_fund__ } = require('@libs/config');
const AccountFactory = require('@libs/account-factory');
const { ERC20, ERC721 } = require('@libs/smart-contracts');
const { getOneSmartContract, registerOneSmartContract } = require('@libs/mongo/smart-contracts');
const {
  getAllUsers,
  getUserById,
  login,
  getOwner,
  getUserByEmail,
  registerOneUser,
  updateOneUser,
  deleteOneUser,
  getUsersByIds,
} = require('@libs/mongo/users');
const {
  getAllLeases,
  getOneLeaseById,
  getAllLeasesByOwnerId,
  getLeaseByTenantId,
  registerLease,
  removeLease,
  addTenantToLease,
  removeTenantFromLease,
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
    this.getLeaseByTenantId = getLeaseByTenantId.bind(this);
    this.getAllUsers = getAllUsers.bind(this);
    this.getUserById = getUserById.bind(this);
    this.getUsersByIds = getUsersByIds.bind(this);
    this.getUserByEmail = getUserByEmail.bind(this);
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
    this.accountFactory = new AccountFactory(this.web3, this.erc20, this.erc721);
    this.ownerAccount = await this.accountFactory.create(privateKey);
  }

  createWeb3Account() {
    return this.web3.eth.accounts.create();
  }

  async getERCNameAndSymbol(erc) {
    const name = erc === 'erc20' ? await this.erc20.name() : await this.erc721.name();
    const symbol = erc === 'erc20' ? await this.erc20.symbol() : await this.erc721.symbol();
    return { name, symbol };
  }

  /**
   * The only purpose of this function is to "BYPASS" the issue with the non free-gas network
   * We encountered this issue at the very end of the project so the lib was not built with that in mind
   * Before that, the free-gas network was working perfectly but it seems the Besu doesn't load correctly the config file anymore
   * The main problem we can have with this workaround is when the account funding other accounts runs out of ether
   * @param {string} address - address to fund
   */
  async fundAccount(address) {
    const nodeAccount = this.web3.eth.accounts.privateKeyToAccount(__node_private_key__);
    const nonce = await this.web3.eth.getTransactionCount(nodeAccount.address); //
    const tx = {
      to: address,
      value: this.web3.utils.toHex(this.web3.utils.toWei(__eth_to_fund__, 'ether')),
      nonce,
      gas: 100000,
    };

    const { rawTransaction } = await nodeAccount.signTransaction(tx);
    return this.web3.eth.sendSignedTransaction(rawTransaction);
  }

  async createLandlordAccount(firstname, lastname, email, password) {
    const userAccount = this.createWeb3Account(this.web3);
    await this.fundAccount(userAccount.address);
    await this.ownerAccount.registerLandlord(userAccount.address);
    // prettier-ignore
    return registerOneUser(firstname, lastname, email, password, 'landlord', userAccount.privateKey);
  }

  async createTenantAccount(firstname, lastname, email, password) {
    const userAccount = this.createWeb3Account(this.web3);
    await this.fundAccount(userAccount.address);
    return registerOneUser(firstname, lastname, email, password, 'tenant', userAccount.privateKey);
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

    const userAccount = await this.accountFactory.create(privateKey);
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
    // todo check balance
    const { status, privateKey, balance } = await this.getUserById(userId);

    if (status !== 'tenant') {
      throw new Error('only tenant can withdraw');
    }

    const userAccount = await this.accountFactory.create(privateKey);

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

  // prettier-ignore
  async createLease(userId, type, size, address, city, price, rooms, maxTenants, tenants, tokenURI) {
    const { status, privateKey } = await this.getUserById(userId);

    if (status !== 'landlord') {
      throw new Error(`createLease: user ${userId} not landlord`);
    }

    const userAccount = await this.accountFactory.create(privateKey);

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

    const userAccount = await this.accountFactory.create(privateKey);
    await userAccount.removeLease(tokenId);
    return removeLease(leaseId);
  }

  async getTenantsByLeaseId(leaseId) {
    const { tenants } = await this.getOneLeaseById(leaseId);

    const userIds = [];
    tenants.forEach(element => {
      userIds.push(element.tenantId);
    });

    const tenantsOfLease = this.getUsersByIds(userIds);
    return tenantsOfLease;
  }

  async payRent(tenantId) {
    const tenant = await this.getUserById(tenantId);

    if (tenant.status !== 'tenant') {
      throw new Error('only tenant can pay rent');
    }

    const lease = await this.getLeaseByTenantId(tenant._id);

    const rentShare = lease.price / lease.tenants.length;

    if (tenant.balance < rentShare) {
      throw new Error(`Not enough founds, you need ${lease.price} to pay rent`);
    }

    const landlord = await this.getUserById(lease.ownerId);

    const tenantAccount = await this.accountFactory.create(tenant.privateKey);

    const tenantAddress = this.web3.eth.accounts.privateKeyToAccount(tenant.privateKey);
    const landlordAddress = this.web3.eth.accounts.privateKeyToAccount(landlord.privateKey);

    const { status: transactionPassed } = await tenantAccount.payRent(
      tenantAddress,
      landlordAddress,
    );

    if (transactionPassed) {
      const filter = { _id: tenant._id };
      const values = {
        $set: {
          balance: tenant.balance - rentShare,
        },
      };

      await this.updateOneUser(filter, values);
    }

    return transactionPassed;
  }

  async addTenant(email, leaseId) {
    // todo check if landlord
    const tenant = await this.getUserByEmail(email);

    if (tenant.status !== 'tenant') {
      throw new Error(`addTenant: user ${email} not tenant`);
    }

    const { address } = this.web3.eth.accounts.privateKeyToAccount(tenant.privateKey);

    const { tokenId, ownerId } = await this.getOneLeaseById(leaseId);

    const landlord = await this.getUserById(ownerId);
    const landlordAccount = await this.accountFactory.create(landlord.privateKey);

    await landlordAccount.registerTenant(tokenId, address);
    return addTenantToLease(leaseId, tenant._id);
  }

  async removeTenant(email, leaseId) {
    const tenant = await this.getUserByEmail(email);

    if (tenant.status !== 'tenant') {
      throw new Error(`addTenant: user ${email} not tenant`);
    }

    const { address } = this.web3.eth.accounts.privateKeyToAccount(tenant.privateKey);

    const { tokenId, ownerId } = await this.getOneLeaseById(leaseId);

    const landlord = await this.getUserById(ownerId);
    const landlordAccount = await this.accountFactory.create(landlord.privateKey);

    await landlordAccount.removeTenant(tokenId, address);
    return removeTenantFromLease(leaseId, tenant._id);
  }
}
const OperationsManager = new Operations();

module.exports = { OperationsManager };
