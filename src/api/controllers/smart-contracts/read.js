const { OperationsManager } = require('@libs/operations');

const getERCNameAndSymbol = async (req, res, next) => {
  try {
    const { erc } = req.params;
    const result = await OperationsManager.getERCNameAndSymbol(erc);
    res.status(200).json({ result });
  } catch (e) {
    next(e);
  }
};

const getSmartContract = async (req, res, next) => {
  try {
    const { erc } = req.params;
    const result = await OperationsManager.getSmartContract(erc);
    res.status(200).json({ result });
  } catch (e) {
    next(e);
  }
};

module.exports = {
  getSmartContract,
  getERCNameAndSymbol,
};
