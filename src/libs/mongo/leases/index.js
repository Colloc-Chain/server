const { Types } = require('mongoose');
const { Lease } = require('../models');

function getAllLeases(projection) {
  return Lease.find({}, { ...projection, __v: 0 });
}

function getOneLeaseById(id, projection) {
  return Lease.findById(id, { ...projection, __v: 0 });
}

function getAllLeasesByOwnerId(ownerId, projection) {
  return Lease.find({ ownerId }, { ...projection, __v: 0 });
}

// prettier-ignore
function registerLease(tokenId, ownerId, type, size, address, city, price, rooms, maxTenants, tenants, tokenURI) {
  const lease = new Lease({
    _id: Types.ObjectId(),
    tokenId,
    ownerId,
    type,
    size,
    address,
    city,
    price,
    rooms,
    maxTenants,
    tenants,
    tokenURI,
  });
  return lease.save();
}

module.exports = {
  getAllLeases,
  getOneLeaseById,
  getAllLeasesByOwnerId,
  registerLease,
};
