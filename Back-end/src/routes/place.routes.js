import express from 'express';
import PlaceValidate from '../modules/place-module/middleware/place.middleware';
import PlaceController from '../modules/place-module/controllers/place.controller';

const router = express.Router();

// POST
// create place
router.post('/place', PlaceValidate.createPlaceInput, PlaceValidate.reduceInput, PlaceController.create);

// GET
// get list place
router.get('/place', PlaceController.getPlaces);
// get one place with id
router.get('/place/:id', PlaceValidate.getPlaceInput, PlaceController.getPlace);
// get rating and comment of place
router.get('/place/rating-comment/:id', PlaceValidate.getRateCommentInput, PlaceController.getRateComment);

// PUT
router.put('/place/:id', PlaceValidate.updatePlaceInput, PlaceValidate.reduceInput, PlaceController.updatePlace);

// DELETE
router.delete('/place/:id', PlaceValidate.deletePlaceInput, PlaceController.deletePlace);

export default router;