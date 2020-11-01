const { OperationsManager } = require('../../../libs/operations');

const createTenantAccount = async (req, res, next) => {
  try {
    const { firstname, lastname } = req.body;
    const result = await OperationsManager.createTenantAccount(firstname, lastname);
    res.status(200).json({ result });
  } catch (e) {
    next(e);
  }
};

const createLandlordAccount = async (req, res, next) => {
  try {
    const { firstname, lastname } = req.body;
    const result = await OperationsManager.createLandlordAccount(firstname, lastname);
    res.status(200).json({ result });
  } catch (e) {
    next(e);
  }
};

module.exports = {
  createTenantAccount,
  createLandlordAccount,
};
