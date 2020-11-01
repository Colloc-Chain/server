const { Types } = require('mongoose');
const { User } = require('../models');

function getAllUsers() {
  return User.find({});
}

function getUserById(id) {
  return User.findById(id);
}

function getOwner() {
  return User.findOwner();
}

function registerOneUser(firstname, lastname, status, privateKey) {
  const user = new User({
    _id: Types.ObjectId(),
    firstname,
    lastname,
    status,
    privateKey,
  });

  return user.save();
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
  getOwner,
  registerOneUser,
  updateOneUser,
  deleteOneUser,
};
