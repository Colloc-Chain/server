const { getUsers, getUser, registerUser, updateUser, deleteUser } = require('./users');
const { getSmartContract, registerSmartContract, deleteSmartContract } = require('./smartContract');
const { getTotalSupply, getBalanceOf } = require('./erc20');

module.exports = {
  getTotalSupply,
  getBalanceOf,
  getUsers,
  getUser,
  registerUser,
  updateUser,
  deleteUser,
  getSmartContract,
  registerSmartContract,
  deleteSmartContract,
};
