import express from 'express';

const routes = express.Router();

routes.get('/', (req, res) => {
  res.json({
    message: '🏡🥫 Home Inventory API 🥫📦🏡'
  });
});

// TODO: add error handling

export default routes;