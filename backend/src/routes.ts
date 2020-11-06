import express from 'express';

import states from './api/states/states.routes';

const router = express.Router();

router.use('/states', states);

router.get('/', (req, res) => {
  res.status(200).json({
    message: '🏡📦🥫 Home Inventory API 🥫📦🏡'
  });
});

export default router;
