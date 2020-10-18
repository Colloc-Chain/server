const mongoose = require('mongoose');
const { SmartContractSchema } = require('../schemas');
// eslint-disable-next-line camelcase
const { __mongo_uri__ } = require('../../../config');

mongoose.connect(__mongo_uri__, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: true,
});

const SmartContract = mongoose.model('SmartContract', SmartContractSchema);

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
  getOneSmartContract,
  registerOneSmartContract,
  deleteOneSmartContract,
};
