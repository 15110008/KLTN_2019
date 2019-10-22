import express from 'express';
import DestinationController from '../modules/destination-module/controllers/destination.controller';
import DestinationValidate from '../modules/destination-module/middleware/destination.middleware';

const router = express.Router();

//POST
//Create destination
router.post('/destination', DestinationValidate.createDestinationInput, DestinationController.create);