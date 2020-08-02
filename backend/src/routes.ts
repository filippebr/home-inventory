import express from 'express';
import morgan from 'morgan';
import compression from 'compression';
import helmet from 'helmet';

const routes = express();

routes.use(morgan('tiny'));
routes.use(compression());
routes.use(helmet());

routes.get('/', (req, res) => {
  res.json({
    message: '🏡📦🥫 Home Inventory API 🥫📦🏡'
  });
});

export default routes;