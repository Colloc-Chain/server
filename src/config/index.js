/* eslint-disable no-underscore-dangle */
/* eslint-disable camelcase */

require('dotenv').config();

const __port__ = process.env.PORT || 5000;
const __prod__ = process.env.NODE_ENV === 'production';

module.exports = {
  __port__,
  __prod__,
};
