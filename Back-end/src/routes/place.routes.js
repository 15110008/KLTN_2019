import express from 'express';
import PlaceValidate from '../modules/place-module/middleware/place.middleware';
import PlaceController from '../modules/place-module/controllers/place.controller';

const router = express.Router();

// POST
// create place
router.post('/place', PlaceValidate.createPlaceInput, PlaceValidate.reduceInput, PlaceController.create);
// create comment in place
router.post('/place/rate-comment', PlaceValidate.createRaComInput, PlaceValidate.reduceInput, PlaceController.createRaCom);
// create rating in place

// GET
// get list place
router.get('/place', PlaceController.getPlaces);
// get one place with id
router.get('/place/:id', PlaceValidate.getPlaceInput, PlaceController.getPlace);
// get rating and comment of place
router.get('/place/comment/:id', PlaceValidate.getRateCommentInput, PlaceController.getComment);

// PUT
router.put('/place/:id', PlaceValidate.updatePlaceInput, PlaceValidate.reduceInput, PlaceController.updatePlace);

// DELETE
router.delete('/place/:id', PlaceValidate.deletePlaceInput, PlaceController.deletePlace);

export default router;