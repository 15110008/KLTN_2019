import express from 'express';
import AccountRouter from './account.routes';
import DestinationRouter from './destination.routes';
import PlaceRouter from './place.routes';
import SpotRouter from './spot.routes';

const router = express.Router();

// API V1
router.use('/v1', AccountRouter);
router.use('/v1', DestinationRouter);
router.use('/v1', PlaceRouter);
router.use('/v1', SpotRouter);

export default router;
