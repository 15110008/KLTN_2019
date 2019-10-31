import ValidationError from '../../../errors-handle/validation.errors';
import {
    CreatePlaceErrors,
    GetPlaceErrors,
    GetRateCommentErrors,
    UpdatePlaceErrors,
    DeletePlaceErrors
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
        if (!phone) throw CreatePlaceErrors.NO_PHONE;
        if (!description) throw CreatePlaceErrors.NO_DESCRIPTION;
        if (!price) throw CreatePlaceErrors.NO_PRICE;
        if (!longitude) throw CreatePlaceErrors.NO_LONGITUDE;
        if (!latitude) throw CreatePlaceErrors.NO_LATITUDE;
        if (!destinationId) throw CreatePlaceErrors.NO_DESTINATION_ID;
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
export default {
    createPlaceInput,
    getPlaceInput,
    getRateCommentInput,
    updatePlaceInput,
    reduceInput,
    deletePlaceInput
};