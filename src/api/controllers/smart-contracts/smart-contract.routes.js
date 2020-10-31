const router = require('express').Router();
const { getSmartContract } = require('./read');
const { registerSmartContract } = require('./update');

router.get('/smart-contract/:erc', getSmartContract);
router.post('/smart-contract/register', registerSmartContract);

module.exports = router;
