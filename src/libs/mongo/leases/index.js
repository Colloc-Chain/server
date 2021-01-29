const { Types } = require('mongoose');
const { Lease } = require('@libs/mongo/models');

function getAllLeases(projection) {
  return Lease.find({}, { ...projection, __v: 0 });
}

function getOneLeaseById(id, projection) {
  return Lease.findById(id, { ...projection, __v: 0 });
}

function getAllLeasesByOwnerId(ownerId, projection) {
  return Lease.find({ ownerId }, { ...projection, __v: 0 });
}

function getLeaseByTenantId(tenantId) {
  return Lease.findOne({ 'tenants.tenantId': tenantId });
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

function removeLease(id) {
  return Lease.findByIdAndDelete(id);
}

function addTenantToLease(leaseId, tenantId) {
  return Lease.updateOne({ _id: leaseId }, { $push: { tenants: { tenantId } } });
}

function removeTenantFromLease(leaseId, tenantId) {
  return Lease.updateOne({ _id: leaseId }, { $pullAll: { tenants: tenantId } });
}

module.exports = {
  getAllLeases,
  getOneLeaseById,
  getAllLeasesByOwnerId,
  registerLease,
  removeLease,
  addTenantToLease,
  removeTenantFromLease,
  getLeaseByTenantId,
};
