const router = require('express').Router();
const { createTenantAccount, createLandlordAccount } = require('./create');
const { getUser, getUsers } = require('./read');
const { updateUser } = require('./update');
const { deleteUser } = require('./delete');

router.get('/users', getUsers);
router.get('/user/:id', getUser);

router.post('/user/register/tenant', createTenantAccount);
router.post('/user/register/landlord', createLandlordAccount);

router.put('/user/update', updateUser);

router.delete('/user/delete/:id', deleteUser);

module.exports = router;
