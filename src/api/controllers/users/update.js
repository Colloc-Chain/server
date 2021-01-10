const { OperationsManager } = require('@libs/operations');

const updateUser = async (req, res, next) => {
  try {
    const { filter, values } = req.body;
    const result = await OperationsManager.updateOneUser(filter, values);
    res.status(200).json({ result });
  } catch (e) {
    next(e);
  }
};

const logout = async (req, res, next) => {
  try {
    const { user } = req;
    user.tokens = user.tokens.filter(({ token }) => token !== req.token);

    await user.save();
    res.status(200).json({ message: 'Successful logout' });
  } catch (e) {
    next(e);
  }
};

const logoutAll = async (req, res, next) => {
  try {
    const { user } = req;
    user.tokens = Array(0);

    await user.save();

    res.status(200).json({ message: 'Successful logout on all devices' });
  } catch (e) {
    next(e);
  }
};

const deposit = async (req, res, next) => {
  try {
    const { id, amount } = req.body;
    const result = await OperationsManager.deposit(id, amount);
    res.status(200).json({ result });
  } catch (e) {
    next(e);
  }
};

const withdraw = async (req, res, next) => {
  try {
    const { id, amount } = req.body;
    const result = await OperationsManager.withdraw(id, amount);
    res.status(200).json({ result });
  } catch (e) {
    next(e);
  }
};

module.exports = {
  updateUser,
  logout,
  logoutAll,
  deposit,
  withdraw,
};
