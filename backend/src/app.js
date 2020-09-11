import express from 'express';
import morgan from 'morgan';
import compression from 'compression';
import helmet from 'helmet';
import routes from './routes';

import { notFound, errorHandler } from './middlewares';

const app = express();

app.use(morgan('tiny'));
app.use(compression());
app.use(helmet());
app.use(express.json());

app.use(routes);

// TODO: add body parser

app.use(notFound);
app.use(errorHandler);

export default app;
