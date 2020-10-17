// prettier-ignore
const { getAllUsers, getUserById, registerOneUser, updateOneUser, deleteOneUser } = require('../../libs/mongo');
const { createPrivateKey } = require('../../libs/smart-contracts');

const getUsers = async (_, res, next) => {
  try {
    const result = await getAllUsers();
    res.status(200).json({ result });
  } catch (e) {
    next(e);
  }
};

const getUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await getUserById(id);
    res.status(200).json({ result });
  } catch (e) {
    next(e);
  }
};

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
  getUsers,
  getUser,
  registerUser,
  updateUser,
  deleteUser,
};
