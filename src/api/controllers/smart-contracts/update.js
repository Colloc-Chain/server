const {
  registerOneSmartContract,
  deleteOneSmartContract,
} = require('../../../libs/mongo/smart-contracts');

const registerSmartContract = async (req, res, next) => {
  try {
    const { erc, address, abi } = req.body;
    const result = await registerOneSmartContract(erc, address, abi);
    res.status(200).json({ result });
  } catch (e) {
    next(e);
  }
};

const deleteSmartContract = async (req, res, next) => {
  try {
    const { erc } = req.body;

    if (erc === undefined) {
      throw new Error('erc to delete not defined');
    }

    const filter = {
      erc,
    };

    const result = await deleteOneSmartContract(filter);
    res.status(200).json({ result });
  } catch (e) {
    next(e);
  }
};

module.exports = {
  registerSmartContract,
  deleteSmartContract,
};
