const { auth } = require('./auth');
const { notFound } = require('./notFound');
const { errorHandler } = require('./errorHandler');

module.exports = {
  auth,
  notFound,
  errorHandler,
};
