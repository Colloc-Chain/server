const router = require('express').Router();
const { createLease } = require('./create');
const { deleteLease } = require('./delete');

router.post('/lease/create', createLease);
router.delete('/lease/delete', deleteLease);

module.exports = router;
