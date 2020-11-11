import express from 'express';

// import queries from './states.queries';
const queries = require('./states.queries');

const router = express.Router();

router.get('/', async (req, res) => {
  const states = await queries.find();
  res.json(states);
});

export default router;
