const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');
const routes = require('./routes');
const swagger = require('./swagger');
const { notFound, errorHandler } = require('./middlewares');
// eslint-disable-next-line camelcase
const { __cors_origin__ } = require('./config');

const app = express();

app.use(morgan('common'));
app.use(helmet());
app.use(cors({ origin: __cors_origin__ }));
app.use(express.json());

app.use('/api', routes);

swagger(app);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
