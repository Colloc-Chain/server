/* eslint-disable no-underscore-dangle */
/* eslint-disable camelcase */
require('dotenv').config();

const isProduction = process.env.NODE_ENV === 'production';

const __web3_uri__ = isProduction ? process.env.WEB3_URI_PROD : process.env.WEB3_URI_DEV;
const __mongo_uri__ = isProduction ? process.env.MONGO_URI : process.env.MONGO_URI_DEV;
const __node_private_key__ = process.env.NODE_PRIVATE_KEY;
const __eth_to_fund__ = process.env.ETH_TO_FUND;
const __jwt_secret__ = process.env.JWT_SECRET;

module.exports = {
  __web3_uri__,
  __mongo_uri__,
  __node_private_key__,
  __eth_to_fund__,
  __jwt_secret__,
};
