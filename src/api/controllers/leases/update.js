const { OperationsManager } = require('@libs/operations');

const updateLease = async (req, res, next) => {
  try {
    res.status(200).json({ result: 'updateLease route' });
  } catch (e) {
    next(e);
  }
};

const addTenantToLease = async (req, res, next) => {
  try {
    const { email, leaseId } = req.body;
    const result = await OperationsManager.addTenant(email, leaseId);
    res.status(200).json({ result });
  } catch (e) {
    next(e);
  }
};

const removeTenantFromLease = async (req, res, next) => {
  try {
    const { email, leaseId } = req.body;
    const result = await OperationsManager.removeTenant(email, leaseId);
    res.status(200).json({ result });
  } catch (e) {
    next(e);
  }
};

module.exports = {
  updateLease,
  addTenantToLease,
  removeTenantFromLease,
};
