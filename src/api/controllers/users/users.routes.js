const router = require('express').Router();
const { auth } = require('@root/middlewares/auth');
const { createTenantAccount, createLandlordAccount, createOwnerAccount } = require('./create');
const { updateUser, logout, logoutAll, deposit, withdraw, payRent } = require('./update');
const {
  getUser,
  getUsers,
  getUserBalanceById,
  getAllLandlords,
  getAllTenants,
  login,
} = require('./read');
const { deleteUser } = require('./delete');

router.get('/users', getUsers);
router.get('/user/:id', auth, getUser);
router.get('/user/balance/:id', getUserBalanceById);
router.get('/users/landlords', getAllLandlords);
router.get('/users/tenants', getAllTenants);

router.post('/user/register/tenant', createTenantAccount);
router.post('/user/register/landlord', createLandlordAccount);
router.post('/user/register/owner', createOwnerAccount);
router.post('/user/login', login);
router.post('/user/deposit', deposit);
router.post('/user/withdraw', withdraw);

router.post('/lease/pay', payRent);

router.put('/user/update', updateUser);
router.put('/user/logout', auth, logout);
router.put('/user/logout-all', auth, logoutAll);

router.delete('/user/delete/:id', deleteUser);

module.exports = router;
