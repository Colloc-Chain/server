const { OperationsManager } = require('@libs/operations');

const getAllLeases = async (_, res, next) => {
  try {
    const result = await OperationsManager.getAllLeases();
    res.status(200).json({ result });
  } catch (e) {
    next(e);
  }
};

const getLeaseById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await OperationsManager.getOneLeaseById(id);
    res.status(200).json({ result });
  } catch (e) {
    next(e);
  }
};

const getLeasesByOwnerId = async (req, res, next) => {
  try {
    const { ownerId } = req.params;
    const result = await OperationsManager.getAllLeasesByOwnerId(ownerId);
    res.status(200).json({ result });
  } catch (e) {
    next(e);
  }
};

module.exports = {
  getAllLeases,
  getLeaseById,
  getLeasesByOwnerId,
};
