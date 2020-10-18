const mongoose = require('mongoose');
const { UserSchema, SmartContractSchema } = require('./schemas');
const { __mongo_uri__ } = require('../../config');

mongoose.connect(__mongo_uri__, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: true,
});

const User = mongoose.model('User', UserSchema);
const SmartContract = mongoose.model('SmartContract', SmartContractSchema);

function getAllUsers() {
  return User.find({});
}

function getUserById(id) {
  return User.findById(id);
}

function registerOneUser(firstname, lastname, status, privateKey) {
  const user = new User({
    _id: mongoose.Types.ObjectId(),
    firstname,
    lastname,
    status,
    privateKey,
  });

  return user.save();
}

function updateOneUser(filter, values) {
  return User.updateOne(filter, values);
}

function deleteOneUser(id) {
  return User.deleteOne({ _id: id });
}

function getOneSmartContract(erc) {
  return SmartContract.findOne({ erc });
}

function registerOneSmartContract(erc, address, abi) {
  const data = {
    erc,
    address,
    abi,
  };
  return SmartContract.findOneAndUpdate({ erc }, data, { upsert: true });
}

function deleteOneSmartContract(filter) {
  return SmartContract.deleteOne(filter);
}

module.exports = {
  getAllUsers,
  getUserById,
  registerOneUser,
  updateOneUser,
  deleteOneUser,
  getOneSmartContract,
  registerOneSmartContract,
  deleteOneSmartContract,
};
