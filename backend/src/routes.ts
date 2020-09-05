import express from 'express';

const routes = express.Router();

routes.get('/', (req, res) => {
  res.json({
    message: '🏡🥫 Home Inventory API 🥫📦🏡'
  });
});

export default routes;
