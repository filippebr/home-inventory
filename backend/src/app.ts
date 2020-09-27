import express from 'express';
import morgan from 'morgan';
import compression from 'compression';
import helmet from 'helmet';
import indexRouter from './routes';
import api from './api';

import { notFound, errorHandler } from './middlewares';

const app = express();

app.use(morgan('tiny'));
app.use(compression());
app.use(helmet());
app.use(express.json());

app.use(indexRouter);
app.use('api/v1', api);
// TODO: add body parser

app.use(notFound);
app.use(errorHandler);

export default app;
