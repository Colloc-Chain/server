const { getERC20 } = require('../../libs');

const erc20 = getERC20();

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
  getTotalSupply,
  getBalanceOf,
};
