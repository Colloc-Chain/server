const updateLease = async (req, res, next) => {
  try {
    res.status(200).json({ result: 'updateLease route' });
  } catch (e) {
    next(e);
  }
};

module.exports = {
  updateLease,
};
