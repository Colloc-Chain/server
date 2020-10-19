const mongoose = require('../connection');
const { UserSchema } = require('../schemas');

const User = mongoose.model('User', UserSchema);

function getAllUsers() {
  return User.find({});
}

function getUserById(id) {
  return User.findById(id);
}

function registerOneUser(firstname, lastname, status, privateKey) {
  const user = new User({
    _id: mongoose.Types.ObjectId(),
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
  registerOneUser,
  updateOneUser,
  deleteOneUser,
};
