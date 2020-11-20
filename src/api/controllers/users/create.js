const { OperationsManager } = require('@libs/operations');

const createTenantAccount = async (req, res, next) => {
  try {
    const { firstname, lastname, email, password } = req.body;
    const result = await OperationsManager.createTenantAccount(
      firstname,
      lastname,
      email,
      password,
    );
    res.status(200).json({ result });
  } catch (e) {
    next(e);
  }
};

const createLandlordAccount = async (req, res, next) => {
  try {
    const { firstname, lastname, email, password } = req.body;
    const result = await OperationsManager.createLandlordAccount(
      firstname,
      lastname,
      email,
      password,
    );
    res.status(200).json({ result });
  } catch (e) {
    next(e);
  }
};

module.exports = {
  createTenantAccount,
  createLandlordAccount,
};
