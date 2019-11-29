import express from 'express';
import TripValidate from '../modules/trip-module/middleware/trip.middleware';
import TripController from '../modules/trip-module/controllers/trip.controller';

const router = express.Router();

router.post('/trip', TripValidate.createTripInput, TripController.createTrip);

router.post('/tripDetail', TripController.createTripDetail);

router.get('/tripDetail', TripController.getTripDetail);


export default router;