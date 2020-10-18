const router = require('express').Router();
const { getUser, getUsers } = require('./read');
const { registerUser, updateUser, deleteUser } = require('./update');

router.get('/users', getUsers);
router.get('/user/:id', getUser);
router.post('/user/register', registerUser);
router.put('/user/update', updateUser);
router.delete('/user/delete/:id', deleteUser);

module.exports = router;
