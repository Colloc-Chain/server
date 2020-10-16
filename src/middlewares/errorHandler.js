const { __prod__ } = require('../config');

// eslint-disable-next-line no-unused-vars
const errorHandler = (error, req, res, next) => {
  const { message, stack } = error;
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    message,
    stack: __prod__ ? '💥' : stack,
  });
};

module.exports = { errorHandler };
