import express from 'express';
import morgan from 'morgan';
import compression from 'compression';
import helmet from 'helmet';
import indexRouter from './routes';

// const morgan = require('morgan');
// const compression = require('compression');
// const helmet = require('helmet');

// const { notFound, errorHandler } = require('./middlewares');
import { notFound, errorHandler } from './middlewares';

const app = express();

app.use(morgan('tiny'));
app.use(compression());
app.use(helmet());
app.use(express.json());

app.use(indexRouter);

// TODO: add body parser

app.use(notFound);
app.use(errorHandler);

export default app;
