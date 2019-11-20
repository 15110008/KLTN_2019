import express from 'express';
import multer from 'multer';
import DestinationController from '../modules/destination-module/controllers/destination.controller';
import DestinationValidate from '../modules/destination-module/middleware/destination.middleware';

const router = express.Router();

const storage = multer.diskStorage({
    destination(req, file, cb) {
        // console.log(file);
        cb(null, './uploads');
    },
    filename(req, file, cb) {
        cb(null, file.originalname);
    },
});
const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      cb(null, true);
    } else {
      cb(null, false);
    }
};
const upload = multer({
    storage,
    limits: {
      fileSize: 1024 * 1024 * 5
    },
    fileFilter
  });

// POST
// Create destination
router.post('/destination', DestinationValidate.createDestinationInput, DestinationController.create);
// create like and commnet
router.post('/destination/like-comment', DestinationValidate.createLikeCommentInput, DestinationController.createLikeComment);
// upload avatar
router.post('/destination/avatar', upload.single('avatar'), DestinationValidate.upload, DestinationController.uploadImage);
// insert image
router.post('/destination/insert-image', upload.single('images'), DestinationValidate.insertInput, DestinationController.insertImage);
// update image
router.post('/destination/update-image', upload.array('images', 12), DestinationValidate.updateImage, DestinationController.updateImage);

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