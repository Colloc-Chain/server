/* eslint-disable no-underscore-dangle */
/* eslint-disable camelcase */

require('dotenv').config();

const isProduction = process.env.NODE_ENV === 'production';

const __web3_uri__ = process.env.WEB3_URI;
const __mongo_uri__ = isProduction ? process.env.MONGO_URI : process.env.MONGO_URI_DEV;
const __master_key__ = 'c87509a1c067bbde78beb793e6fa76530b6382a4c0241e5e4a9ec0a0f44dc0d3';

module.exports = {
  __web3_uri__,
  __mongo_uri__,
  __master_key__,
};
