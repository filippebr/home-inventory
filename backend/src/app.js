const express = require('express');
const morgan = require('morgan');
const compression = require('compression');
const helmet = require('helmet');

// import routes from './routes';

// import { notFound, errorHandler } from './middlewares';

const app = express();

app.use(morgan('tiny'));
app.use(compression());
app.use(helmet());
app.use(express.json());

// app.use(routes);

// const routes = express.Router();

app.get('/', (req, res) => {
  res.json({
    message: '🏡📦🥫 Home Inventory API 🥫📦🏡'
  });
});

// TODO: add body parser

// app.use(notFound);
// app.use(errorHandler);

module.exports = app;
