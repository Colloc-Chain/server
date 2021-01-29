const router = require('express').Router();
const { createLease } = require('./create');
const { getAllLeases, getLeaseById, getLeasesByOwnerId, getTenantsByLeaseId } = require('./read');
const { updateLease, addTenantToLease, removeTenantFromLease } = require('./update'); // ici
const { deleteLease } = require('./delete');

router.get('/leases/all', getAllLeases);

router.get('/lease/:id', getLeaseById);
router.get('/user/leases/:ownerId', getLeasesByOwnerId);
router.get('/lease/tenants/:leaseId', getTenantsByLeaseId);

router.post('/lease/create', createLease);

router.put('/lease/update', updateLease);
router.put('/lease/tenant/add', addTenantToLease);
router.put('/lease/tenant/remove', removeTenantFromLease);

router.delete('/lease/delete', deleteLease);

module.exports = router;
