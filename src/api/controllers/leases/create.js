const { OperationsManager } = require('../../../libs/operations');

const createLease = async (req, res, next) => {
  try {
    // prettier-ignore
    const { userId, type, size, address, city, price, rooms, maxTenants, tenants, tokenURI } = req.body;
    const result = await OperationsManager.createLease(
      userId,
      type,
      size,
      address,
      city,
      price,
      rooms,
      maxTenants,
      tenants,
      tokenURI,
    );
    res.status(200).json({ result });
  } catch (e) {
    next(e);
  }
};

module.exports = {
  createLease,
};
