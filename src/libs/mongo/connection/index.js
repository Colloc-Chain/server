/* eslint-disable camelcase */
const mongoose = require('mongoose');
const { __mongo_uri__ } = require('@libs/config');

mongoose.connect(__mongo_uri__, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: true,
});

module.exports = { mongoose };
