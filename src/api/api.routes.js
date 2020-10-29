const router = require('express').Router();
const smartContracts = require('./controllers/smart-contracts/smart-contract.routes');
const users = require('./controllers/users/users.routes');
const leases = require('./controllers/leases/leases.routes');

router.use(smartContracts);
router.use(users);
router.use(leases);

module.exports = router;
