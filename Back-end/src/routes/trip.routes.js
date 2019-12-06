import express from 'express';
import TripValidate from '../modules/trip-module/middleware/trip.middleware';
import TripController from '../modules/trip-module/controllers/trip.controller';

const router = express.Router();


// POST
// Tạo trip, một trip có nhiều trip detail
router.post('/trip', TripValidate.createTripInput, TripController.createTrip);
// Tạo tripDetail cho trip
router.post('/tripDetail', TripController.createTripDetail);


// GET
// Lấy danh sách trip đã được public hiển thị cho người dùng
router.get('/trip/Public', TripController.getTripPublic);
// Lấy danh sách trip của cá nhân người dùng đã tạo
router.get('/trip/UnPublic', TripController.getTripUnPublic);
// Xem thông tin chi tiết của trip (gồm trip và tripDetail)
router.get('/trip/:id', TripController.getTripDetail);
// get spot
router.get('/trip/Detail', TripController.updateTripDetail);

// PUT
// Người dùng share lịch trình mình đã tạo
router.put('/trip/:id', TripController.shareTrip);
// update tripDetail with listSpot (update listSpot)
router.put('/trip/DetailSpot/:id', TripController.updateListSpot);

// DELETE


export default router;