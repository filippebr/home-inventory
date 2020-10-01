import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json({
    message: '🏡📦🥫 Home Inventory API 🥫📦🏡'
  });
});

export default router;
