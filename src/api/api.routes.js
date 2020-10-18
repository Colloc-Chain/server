const router = require('express').Router();
const smartContracts = require('./controllers/smart-contracts/smart-contract.routes');
const users = require('./controllers/users/users.routes');

router.use(smartContracts);
router.use(users);

module.exports = router;
