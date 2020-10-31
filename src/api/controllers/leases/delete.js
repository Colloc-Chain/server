// const { OperationsManager } = require('../../../libs/operations');

const deleteLease = async (req, res, next) => {
  try {
    const { userId, leaseId } = req.body;
    res.json(200).next({ userId, leaseId });
  } catch (e) {
    next(e);
  }
};

module.exports = {
  deleteLease,
};
