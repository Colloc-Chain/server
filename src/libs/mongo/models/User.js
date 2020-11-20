/* eslint-disable camelcase */
/* eslint-disable no-underscore-dangle */
const jwt = require('jsonwebtoken');
const { mongoose } = require('@libs/mongo/connection');
const { __jwt_secret__ } = require('@libs/config');

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
    email: {
      type: String,
      trim: true,
      lowercase: true,
      required: true,
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        'email is not valid',
      ],
    },
    password: {
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
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    collection: 'users',
    timestamps: true,
  },
);

UserSchema.statics.findOwner = function (projection) {
  return this.findOne({ status: 'owner' }, { ...projection, __v: 0 });
};

UserSchema.methods.generateAuthToken = async function () {
  const user = this;
  const validDuration = 60 * 60;
  const token = jwt.sign({ _id: user._id }, __jwt_secret__, { expiresIn: validDuration });
  user.tokens = user.tokens.concat({ token });
  user.save();
  return token;
};

UserSchema.statics.findByCredentials = (email, password) => {
  // eslint-disable-next-line no-use-before-define
  return User.findOne({ email, password });
};

const User = mongoose.model('User', UserSchema);

module.exports = { User };
