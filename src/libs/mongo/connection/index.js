const mongoose = require('mongoose');
// eslint-disable-next-line camelcase
const { __mongo_uri__ } = require('../../../config');

mongoose.connect(__mongo_uri__, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: true,
});

module.exports = mongoose;
