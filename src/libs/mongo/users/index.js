const { Types } = require('mongoose');
const { User } = require('@libs/mongo/models');

function getOwner() {
  return User.findOwner();
}

function getAllUsers() {
  return User.find({});
}

async function getUserById(id) {
  const user = await User.findById(id);

  if (!user) {
    throw new Error('User non-existent');
  }

  return user;
}

function getUserByJwt(id, token) {
  return User.findOne({ _id: id, 'tokens.token': token });
}

async function login(email, password) {
  const user = await User.findByCredentials(email, password);
  const token = await user?.generateAuthToken();

  if (!token) {
    throw new Error('Error: cannot generate jwt token');
  }

  return { user, token };
}

async function registerOneUser(firstname, lastname, email, password, status, privateKey) {
  const user = new User({
    _id: Types.ObjectId(),
    firstname,
    lastname,
    email,
    password,
    status,
    privateKey,
  });

  const token = await user.generateAuthToken();

  return { user, token };
}

function updateOneUser(filter, values) {
  return User.updateOne(filter, values);
}

function deleteOneUser(id) {
  return User.deleteOne({ _id: id });
}

module.exports = {
  getAllUsers,
  getUserById,
  getUserByJwt,
  login,
  getOwner,
  registerOneUser,
  updateOneUser,
  deleteOneUser,
};
