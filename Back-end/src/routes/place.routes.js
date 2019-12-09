import express from 'express';
import multer from 'multer';
import PlaceValidate from '../modules/place-module/middleware/place.middleware';
import PlaceController from '../modules/place-module/controllers/place.controller';

const router = express.Router();

const storage = multer.diskStorage({
    destination(req, file, cb) {
        console.log(file);
        cb(null, './uploads');
    },
    filename(req, file, cb) {
        cb(null, file.originalname);
    }
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
// create place
router.post('/place', PlaceValidate.createPlaceInput, PlaceValidate.reduceInput, PlaceController.create);
// create rating and comment in place
router.post('/place/rate-comment', PlaceValidate.createRaComInput, PlaceValidate.reduceInput, PlaceController.createRaCom);
// insert single image
router.post('/place/insert-image', upload.single('images'), PlaceValidate.insertInput, PlaceController.insertImage);
// insert multi images
router.post('/place/insert-images', upload.array('images', 12), PlaceValidate.insertMulti, PlaceController.insertMulti);
// update single image
router.post('/place/update-image', upload.single('images'), PlaceValidate.updateSingle, PlaceController.updateSingle);
// update multi images
router.post('/place/update-images', upload.array('images', 12), PlaceValidate.updateImage, PlaceController.updateImage);

// GET
// get list place
router.get('/place', PlaceController.getPlaces);
// get one place with id
router.get('/place/:id', PlaceValidate.getPlaceInput, PlaceController.getPlace);
// get rating and comment of place
router.get('/place/comment/:id', PlaceValidate.getRateCommentInput, PlaceController.getComment);
// get places of destination
router.get('/place/destination/:id', PlaceController.getPlacesOfDes);

// PUT
router.put('/place/:id', PlaceValidate.updatePlaceInput, PlaceValidate.reduceInput, PlaceController.updatePlace);

// DELETE
router.delete('/place/:id', PlaceValidate.deletePlaceInput, PlaceController.deletePlace);

export default router;