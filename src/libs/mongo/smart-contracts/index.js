const mongoose = require('../connection');
const { SmartContractSchema } = require('../schemas');

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
