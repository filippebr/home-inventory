import express from 'express';

// import queries from './states.queries';

const router = express.Router();

router.get('/', async (req, res) => {
  res.json([]);
});

export default router;
