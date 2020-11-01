const { OperationsManager } = require('../../../libs/operations');

const deleteLease = async (req, res, next) => {
  try {
    const { ownerId, leaseId } = req.body;
    const result = await OperationsManager.deleteLease(ownerId, leaseId);
    res.status(200).json({ result });
  } catch (e) {
    next(e);
  }
};

module.exports = {
  deleteLease,
};
