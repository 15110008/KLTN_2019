import ValidationError from '../../../errors-handle/validation.errors';
import {
    CreatePlaceErrors,
    CreateRatingCommentErrors,
    GetPlaceErrors,
    GetRateCommentErrors,
    UpdatePlaceErrors,
    DeletePlaceErrors,
    InsertImageErrors,
    UpdateImageErrors,
    UpdateSingleImageErrors,
    InsertMultiImageErrors
} from '../error-codes/place.error-codes';

const createPlaceInput = (req, res, next) => {
    const { jwt } = req.headers;
    const {
        name,
        category,
        location,
        phone,
        description,
        price,
        longitude,
        latitude,
        destinationId
    } = req.body;
    try {
        if (!jwt) throw CreatePlaceErrors.NO_TOKEN;
        if (!req.body) throw CreatePlaceErrors.NO_DATA;
        if (!name) throw CreatePlaceErrors.NO_NAME;
        if (!category) throw CreatePlaceErrors.NO_CATEGORY;
        if (!location) throw CreatePlaceErrors.NO_LOCATION;
        // if (!phone) throw CreatePlaceErrors.NO_PHONE;
        if (!description) throw CreatePlaceErrors.NO_DESCRIPTION;
        // if (!price) throw CreatePlaceErrors.NO_PRICE;
        if (!longitude) throw CreatePlaceErrors.NO_LONGITUDE;
        if (!latitude) throw CreatePlaceErrors.NO_LATITUDE;
        if (!destinationId) throw CreatePlaceErrors.NO_DESTINATION_ID;
        req.body = {
            name,
            category,
            location,
            phone,
            description,
            price,
            longitude,
            latitude,
            destinationId
        };
        return next();
    } catch (error) {
        return res.onError(new ValidationError(error));
    }
};
const createComInput = (req, res, next) => {
    const { jwt } = req.headers;
    const {
        placeId,
        comment
    } = req.body;
    try {
        if (!jwt) throw CreateRatingCommentErrors.NO_TOKEN;
        if (!placeId) throw CreateRatingCommentErrors.NO_PLACE_ID;
        if (!comment) throw CreateRatingCommentErrors.NO_DATA;
        return next();
    } catch (error) {
        return res.onError(new ValidationError(error));
    }
};
const getPlaceInput = (req, res, next) => {
    const placeId = req.params.id;
    try {
        if (!placeId) throw GetPlaceErrors.NO_PLACE_ID;
        return next();
    } catch (error) {
        return res.onError(new ValidationError(error));
    }
};
const getRateCommentInput = (req, res, next) => {
    const placeId = req.params.id;
    try {
        if (!placeId) throw GetRateCommentErrors.NO_PLACE_ID;
        return next();
    } catch (error) {
        return res.onError(new ValidationError(error));
    }
};
const updatePlaceInput = (req, res, next) => {
    const { jwt } = req.headers;
    const placeId = req.params.id;
    const {
        name,
        category,
        location,
        phone,
        description,
        price,
        longitude,
        latitude,
        destinationId
    } = req.body;
    try {
        if (!jwt) throw UpdatePlaceErrors.NO_TOKEN;
        if (!placeId) throw UpdatePlaceErrors.NO_PLACE_ID;
        if (!req.body) throw UpdatePlaceErrors.NO_DATA;
        req.body = {
            name,
            category,
            location,
            phone,
            description,
            price,
            longitude,
            latitude,
            destinationId
        };
        return next();
    } catch (error) {
        return res.onError(new ValidationError(error));
    }
};
const reduceInput = (req, res, next) => {
    const data = req.body;
    const inputData = Object.keys(data).reduce((result, key) => {
        if (data[key]) {
            result[key] = data[key];
        }
        return result;
    }, {});
    req.body = inputData;
    return next();
};
const deletePlaceInput = (req, res, next) => {
    const { jwt } = req.headers;
    const placeId = req.params.id;
    try {
        if (!jwt) throw DeletePlaceErrors.NO_TOKEN;
        if (!placeId) throw DeletePlaceErrors.NO_PLACE_ID;
        return next();
    } catch (error) {
        return res.onError(new ValidationError(error));
    }
};
const insertInput = (req, res, next) => {
    const { jwt } = req.headers;
    const placeId = req.body;
    const images = req.file.path;
    try {
        if (!jwt) throw InsertImageErrors.NO_TOKEN;
        if (!placeId) throw InsertImageErrors.NO_PLACE_ID;
        if (!images) throw InsertImageErrors.NO_IMAGE;
        return next();
    } catch (error) {
        return res.onError(new ValidationError(error));
    }
};
const updateImage = (req, res, next) => {
    const { jwt } = req.headers;
    const placeId = req.body;
    // const images = req.files;
    try {
        if (!jwt) throw UpdateImageErrors.NO_TOKEN;
        if (!placeId) throw UpdateImageErrors.NO_PLACE_ID;
        // if (!images) throw UpdateImageErrors.NO_IMAGE;
        return next();
    } catch (error) {
        return res.onError(new ValidationError(error));
    }
};
const updateSingle = (req, res, next) => {
    const { jwt } = req.headers;
    const { placeId, oldImage } = req.body;
    const images = req.file.path;
    try {
        if (!jwt) throw UpdateSingleImageErrors.NO_TOKEN;
        if (!placeId) throw UpdateSingleImageErrors.NO_PLACE_ID;
        if (!oldImage) throw UpdateSingleImageErrors.NO_OLD_IMAGE;
        if (!images) throw UpdateSingleImageErrors.NO_IMAGE;
        return next();
    } catch (error) {
        return res.onError(new ValidationError(error));
    }
};
const insertMulti = (req, res, next) => {
    const { jwt } = req.headers;
    const { placeId } = req.body;
    const images = req.files;
    try {
        if (!jwt) throw InsertMultiImageErrors.NO_TOKEN;
        if (!placeId) throw InsertMultiImageErrors.NO_PLACE_ID;
        if (!images) throw InsertMultiImageErrors.NO_IMAGE;
        return next();
    } catch (error) {
        return res.onError(new ValidationError(error));
    }
};
export default {
    createPlaceInput,
    createComInput,
    getPlaceInput,
    getRateCommentInput,
    updatePlaceInput,
    reduceInput,
    deletePlaceInput,
    insertInput,
    updateImage,
    updateSingle,
    insertMulti
};