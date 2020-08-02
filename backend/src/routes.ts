import express from 'express';
import morgan from 'morgan';
import compression from 'compression';
import helmet from 'helmet';

const app = express();

app.use(morgan('tiny'));
app.use(compression());
app.use(helmet());

app.get('/', (req, res) => {
  res.json({
    message: '🏡📦🥫 Home Inventory API 🥫📦🏡'
  });
});

export default routes;