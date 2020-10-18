const { Router } = require('express');
// prettier-ignore
const { getUsers, getUser, registerUser, updateUser, deleteUser, getTotalSupply, getBalanceOf, getSmartContract, registerSmartContract, deleteSmartContract } = require('./controllers');

const router = Router();

router.get('/users', getUsers);
router.get('/user/:id', getUser);
router.post('/user/register', registerUser);
router.put('/user/update', updateUser);
router.delete('/user/delete/:id', deleteUser);

router.get('/totalSupply', getTotalSupply);
router.get('/balanceOf/:address', getBalanceOf);

router.get('/smart-contract/:erc', getSmartContract);
router.post('/smart-contract/register', registerSmartContract);
router.delete('/smart-contract/delete', deleteSmartContract);

module.exports = router;
