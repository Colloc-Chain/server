const { OperationsManager } = require('../../../libs/operations');

const updateUser = async (req, res, next) => {
  try {
    const { filter, values } = req.body;
    const result = await OperationsManager.updateOneUser(filter, values);
    res.status(200).json({ result });
  } catch (e) {
    next(e);
  }
};

module.exports = {
  updateUser,
};
