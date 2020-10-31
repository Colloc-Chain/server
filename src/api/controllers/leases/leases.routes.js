const router = require('express').Router();
const { createLease } = require('./create');
const { getAllLeases, getLeaseById, getLeasesByOwnerId } = require('./read');
const { updateLease } = require('./update');
const { deleteLease } = require('./delete');

router.get('/leases/all', getAllLeases);
router.get('/lease/:id', getLeaseById);
router.get('/user/leases/:ownerId', getLeasesByOwnerId);
router.post('/lease/create', createLease);
router.put('/lease/update', updateLease);
router.delete('/lease/delete', deleteLease);

module.exports = router;
