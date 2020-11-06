import express from 'express';

import states from './api/states/states.routes';
import project from './constants/project';

const router = express.Router();

router.use('/states', states);

router.get('/', (req, res) => {
  res.status(200).json({
    message: project.message
  });
});

export default router;
