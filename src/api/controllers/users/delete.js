const { OperationsManager } = require('@libs/operations');

const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await OperationsManager.deleteUser(id);
    res.status(200).json({ result });
  } catch (e) {
    next(e);
  }
};

module.exports = {
  deleteUser,
};
