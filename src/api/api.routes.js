const { Router } = require('express');
const { getTotalSupply, getBalanceOf } = require('./controllers');

const router = Router();

router.get('/totalSupply', getTotalSupply);
router.get('/balanceOf/:address', getBalanceOf);

module.exports = router;
