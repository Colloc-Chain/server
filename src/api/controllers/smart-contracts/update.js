const { OperationsManager } = require('../../../libs/operations');

const registerSmartContract = async (req, res, next) => {
  try {
    const { erc, address, abi } = req.body;
    const result = await OperationsManager.registerOneSmartContract(erc, address, abi);
    res.status(200).json({ result });
  } catch (e) {
    next(e);
  }
};

module.exports = {
  registerSmartContract,
};
