const { SmartContract } = require('@libs/mongo/models');

function getOneSmartContract(erc, projection) {
  return SmartContract.findOne({ erc }, projection);
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
