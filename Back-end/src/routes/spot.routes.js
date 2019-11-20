import express from 'express';
import SpotValidate from '../modules/spot-module/middleware/spot.middleware';
import SpotController from '../modules/spot-module/controllers/spot.controller';

const router = express.Router();

router.post('/spot', SpotValidate.createInput, SpotController.create);


export default router;