const router = require('express').Router();
const { auth } = require('@root/middlewares/auth');
const { createTenantAccount, createLandlordAccount } = require('./create');
const { getUser, getUsers, login } = require('./read');
const { updateUser, logout, logoutAll } = require('./update');
const { deleteUser } = require('./delete');

router.get('/users', getUsers);
router.get('/user/:id', auth, getUser);

router.post('/user/register/tenant', createTenantAccount);
router.post('/user/register/landlord', createLandlordAccount);
router.post('/user/login', login);

router.put('/user/update', updateUser);
router.put('/user/logout', auth, logout);
router.put('/user/logout-all', auth, logoutAll);

router.delete('/user/delete/:id', deleteUser);

module.exports = router;
