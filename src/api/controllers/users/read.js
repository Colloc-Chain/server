const { OperationsManager } = require('../../../libs/operations');

const getUsers = async (_, res, next) => {
  try {
    const result = await OperationsManager.getAllUsers();
    res.status(200).json({ result });
  } catch (e) {
    next(e);
  }
};

const getUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await OperationsManager.getUserById(id);
    res.status(200).json({ result });
  } catch (e) {
    next(e);
  }
};

module.exports = {
  getUsers,
  getUser,
};
