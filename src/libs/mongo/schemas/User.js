const { Schema } = require('mongoose');

const UserSchema = new Schema(
  {
    _id: Schema.Types.ObjectId,
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
  },
);

module.exports = {
  UserSchema,
};
