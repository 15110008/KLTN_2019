import express from 'express';
import DestinationController from '../modules/destination-module/controllers/destination.controller';
import DestinationValidate from '../modules/destination-module/middleware/destination.middleware';

const router = express.Router();

// POST
// Create destination
router.post('/destination', DestinationValidate.createDestinationInput, DestinationController.create);
// create like and commnet
router.post('/destination/like-comment', DestinationValidate.createLikeCommentInput, DestinationController.createLikeComment);

// GET
// get list destination
router.get('/destination', DestinationController.getDestinations);
// get one destination
router.get('/destination/:id', DestinationValidate.getDestinationInput, DestinationController.getDestination);
// get like and comment of destination with Id
router.get('/destination/like-comment/:id', DestinationValidate.getLikeAndCommentInput, DestinationController.getLikeAndComment);
// get like and comment of account in destination
router.get('/destination/account/:id', DestinationValidate.getAccountLikeCommentInput, DestinationController.getAccountLikeComment);

// PUT
// update destination info
router.put('/destination/:id', DestinationValidate.updateDestinationInput, DestinationValidate.reduceInput, DestinationController.updateDestinationInfo);

// DELETE
// delete one destination
router.delete('/destination/:id', DestinationValidate.deleteDestinationInput, DestinationController.deleteDestination);

export default router;