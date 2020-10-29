const { Types } = require('mongoose');
const { Lease } = require('../models');

function registerLease(owner, price, maxTenants, tenants, tokenURI) {
  const lease = new Lease({
    _id: Types.ObjectId(),
    owner,
    price,
    maxTenants,
    tenants,
    tokenURI,
  });
  return lease.save();
}

module.exports = {
  registerLease,
};
