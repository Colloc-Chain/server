const { getOneSmartContract } = require('../../../libs/mongo/smart-contracts');
const { getERC20 } = require('../../../libs/smart-contracts');

const erc20 = getERC20();

const getSmartContract = async (req, res, next) => {
  try {
    const { erc } = req.params;
    const result = await getOneSmartContract(erc);
    res.status(200).json({ result });
  } catch (e) {
    next(e);
  }
};

const getTotalSupply = async (_, res, next) => {
  try {
    const totalSupply = await erc20.totalSupply();
    res.status(200).json({ result: totalSupply });
  } catch (e) {
    next(e);
  }
};

const getBalanceOf = async (req, res, next) => {
  try {
    const { address } = req.params;
    const balanceOf = await erc20.balanceOf(address);
    res.status(200).json({ result: balanceOf });
  } catch (e) {
    next(e);
  }
};

module.exports = {
  getSmartContract,
  getTotalSupply,
  getBalanceOf,
};
