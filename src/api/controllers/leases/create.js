const { OperationsManager } = require('../../../libs/operations');

const createLease = async (req, res, next) => {
  try {
    const { userId, price, maxTenants, tenants, tokenURI } = req.body;
    const result = await OperationsManager.createLease(
      userId,
      price,
      maxTenants,
      tenants,
      tokenURI,
    );
    res.status(200).json({ result });
  } catch (e) {
    next(e);
  }
};

module.exports = {
  createLease,
};
