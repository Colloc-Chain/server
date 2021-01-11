const router = require('express').Router();
const { getSmartContract, getERCNameAndSymbol } = require('./read');
const { registerSmartContract } = require('./update');

router.get('/smart-contract/:erc', getSmartContract);
router.get('/smart-contract/name-symbol/:erc', getERCNameAndSymbol);
router.post('/smart-contract/register', registerSmartContract);

module.exports = router;
