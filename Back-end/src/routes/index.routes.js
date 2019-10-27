import express from 'express';
import AccountRouter from './account.routes';
import DestinationRouter from './destination.routes';

const router = express.Router();

// API V1
router.use('/v1', AccountRouter);
router.use('/v1', DestinationRouter);

export default router;
