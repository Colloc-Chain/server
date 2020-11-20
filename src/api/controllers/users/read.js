const { OperationsManager } = require('@libs/operations');

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

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const { user, token } = await OperationsManager.login(email, password);

    if (!user) {
      res.status(401);
      throw new Error('Login: Invalid credentials');
    }

    res.status(200).json({ user, token });
  } catch (e) {
    next(e);
  }
};

module.exports = {
  getUsers,
  getUser,
  login,
};
