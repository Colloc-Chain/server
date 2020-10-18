const { registerOneUser, updateOneUser, deleteOneUser } = require('../../../libs/mongo/users');
const { createPrivateKey } = require('../../../libs/smart-contracts');

const registerUser = async (req, res, next) => {
  try {
    const { firstname, lastname, status } = req.body;
    const privateKey = createPrivateKey();
    const result = await registerOneUser(firstname, lastname, status, privateKey);
    res.status(200).json({ result });
  } catch (e) {
    next(e);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const { filter, values } = req.body;
    const result = await updateOneUser(filter, values);
    res.status(200).json({ result });
  } catch (e) {
    next(e);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await deleteOneUser(id);
    res.status(200).json({ result });
  } catch (e) {
    next(e);
  }
};

module.exports = {
  registerUser,
  updateUser,
  deleteUser,
};
