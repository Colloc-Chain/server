const swaggerUI = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

module.exports = app => {
  app.use('/api/documentation', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
};
