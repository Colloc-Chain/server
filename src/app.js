const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');
const routes = require('./routes');
const { notFound, errorHandler } = require('./middlewares');

const app = express();

app.use(morgan('common'));
app.use(helmet());
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());

app.use('/api', routes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
