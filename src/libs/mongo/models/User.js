const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ['owner', 'landlord', 'tenant'],
    },
    privateKey: {
      type: String,
      required: true,
    },
  },
  {
    collection: 'users',
    timestamps: true,
  },
);

const User = mongoose.model('User', UserSchema);

module.exports = { User };
