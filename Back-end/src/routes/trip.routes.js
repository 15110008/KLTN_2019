import express from 'express';
import TripValidate from '../modules/trip-module/middleware/trip.middleware';
import TripController from '../modules/trip-module/controllers/trip.controller';

const router = express.Router();


// POST
// Tạo trip, một trip có nhiều trip detail
router.post('/trip', TripValidate.createTripInput, TripController.createTrip);
// Tạo tripDetail cho trip
router.post('/tripDetail', TripController.createTripDetail);
// Create comment for trip
router.post('/trip/comment', TripController.createCom);
// Create rating for trip
router.post('/trip/rating', TripController.createRating);


// GET
// Lấy danh sách trip đã được public hiển thị cho người dùng
router.get('/trip/Public', TripController.getTripPublic);
// Lấy danh sách trip của cá nhân người dùng đã tạo
router.get('/trip/UnPublic', TripController.getTripUnPublic);
// Xem thông tin chi tiết của trip (gồm trip và tripDetail)
router.get('/trip/:id', TripController.getTripDetail);
// Get comment trip
router.get('/trip/comment/:id', TripController.getComment);
// Get rate trip
router.get('/trip/rate/:id', TripController.getRate);
//get trip with destination
router.get('/trip/destination', TripController.getTripWithDes);

// dùng để test và check kết quả k dùng cho view
// get all trip in db (admin)
router.get('/trip', TripController.getAllTrip);
// get all trip detail in db (admin)
router.get('/tripDetail', TripController.getAllTripDetail);


// PUT
// Người dùng share lịch trình mình đã tạo
router.put('/trip/:id', TripController.shareTrip);
// update tripDetail with listSpot (update listSpot)
router.put('/trip/DetailSpot/:id', TripController.updateListSpot);
// get spot
router.post('/trip/Detail', TripController.updateTripDetail);

// DELETE
router.delete('/trip/:id', TripController.deleteOne);

export default router;