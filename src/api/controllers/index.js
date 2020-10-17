const { getUsers, getUser, registerUser, updateUser, deleteUser } = require('./users');
const { getTotalSupply, getBalanceOf } = require('./erc20');

module.exports = {
  getTotalSupply,
  getBalanceOf,
  getUsers,
  getUser,
  registerUser,
  updateUser,
  deleteUser,
};
