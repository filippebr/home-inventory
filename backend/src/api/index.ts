import express from 'express';

import project from '../constants/project';
import states from './states/states.routes';

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: project.message
  });
});

router.use('/states', states);

export default router;
