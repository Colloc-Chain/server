require('dotenv').config();

/* eslint-disable no-underscore-dangle */
/* eslint-disable camelcase */
const { ERC721_ABI, ERC20_ABI } = require('./ABIs');

const WEB3_ENDPOINT = 'http://localhost:8545';

const ERC20_ADDRESS = '8273e4B8ED6c78e252a9fCa5563Adfcc75C91b2A';
const ERC721_ADDRESS = 'cfeD223fAb2A41b5a5a5F9AaAe2D1e882cb6Fe2D';

const MASTER_KEY = 'c87509a1c067bbde78beb793e6fa76530b6382a4c0241e5e4a9ec0a0f44dc0d3';

const __port__ = process.env.PORT || 3000;
const __prod__ = process.env.NODE_ENV === 'production';

module.exports = {
  WEB3_ENDPOINT,
  ERC20_ABI,
  ERC721_ABI,
  ERC20_ADDRESS,
  ERC721_ADDRESS,
  MASTER_KEY,
  __port__,
  __prod__,
};
