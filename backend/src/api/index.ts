import express from 'express';

import states from './states/states.routes';

const router = express.Router();
router.use('/states', states);

export default router;
