const router = require('express').Router();
const { getSmartContract, getTotalSupply, getBalanceOf } = require('./read');
const { registerSmartContract, deleteSmartContract } = require('./update');

router.get('/smart-contract/:erc', getSmartContract);
router.get('/totalSupply', getTotalSupply);
router.get('/balanceOf/:address', getBalanceOf);

router.post('/smart-contract/register', registerSmartContract);

router.delete('/smart-contract/delete', deleteSmartContract);

module.exports = router;
