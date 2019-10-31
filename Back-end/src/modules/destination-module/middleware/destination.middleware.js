import ValidationError from '../../../errors-handle/validation.errors';
import {
    CreateDestinationErrors,
    GetDestinationErrors,
    UpdateDestinationErrors,
    DeleteDestinationErrors,
    CreateLikeCommentErrors,
    GetLikeAndCommentErrors,
    GetAccountLikeCommentErrors
} from '../error-codes/destination.error-codes';

const createDestinationInput = (req, res, next) => {
    const { jwt } = req.headers;
    const {
        name,
        description,
        longitude,
        latitude
    } = req.body;
    try {
        if (!jwt) throw CreateDestinationErrors.NO_TOKEN;
        if (!name) throw CreateDestinationErrors.NO_NAME;
        if (!description) throw CreateDestinationErrors.NO_DESCRIPTION;
        if (!longitude) throw CreateDestinationErrors.NO_LONGITUDE;
        if (!latitude) throw CreateDestinationErrors.NO_LATITUDE;
        return next();
    } catch (error) {
        return res.onError(new ValidationError(error));
    }
};
const getDestinationInput = (req, res, next) => {
    const destinationId = req.params.id;
    try {
        if (!destinationId) throw GetDestinationErrors.NO_DESTINATION_ID;
        return next();
    } catch (error) {
        return res.onError(new ValidationError(error));
    }
};
const updateDestinationInput = (req, res, next) => {
    const { jwt } = req.headers;
    const destinationId = req.params.id;
    const {
        name,
        description,
        longitude,
        latitude
    } = req.body;
    try {
        if (!jwt) throw UpdateDestinationErrors.NO_TOKEN;
        if (!destinationId) throw UpdateDestinationErrors.NO_DESTINATION_ID;
        if (!req.body) throw UpdateDestinationErrors.NO_DATA;
        req.body = {
 name, description, longitude, latitude
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
const deleteDestinationInput = (req, res, next) => {
    const { jwt } = req.headers;
    const destinationId = req.params.id;
    try {
        if (!jwt) throw DeleteDestinationErrors.NO_TOKEN;
        if (!destinationId) throw DeleteDestinationErrors.NO_DESTINATION_ID;
        return next();
    } catch (error) {
        return res.onError(new ValidationError(error));
    }
};
// create like and comment
const createLikeCommentInput = (req, res, next) => {
    const {
        jwt,
        destinationId,
        comment
    } = req.body;
    try {
        if (!jwt) throw CreateLikeCommentErrors.NO_TOKEN;
        // if(!accountId) throw CreateLikeCommentErrors.NO_ACCOUNT_ID;
        if (!destinationId) throw CreateLikeCommentErrors.NO_DESTINATION_ID;
        if (!comment) throw CreateLikeCommentErrors.NO_COMMENT;
        return next();
    } catch (error) {
        return res.onError(new ValidationError(error));
    }
};
// get like and comment of destination with destinationId
const getLikeAndCommentInput = (req, res, next) => {
    const destinationId = req.params.id;
    try {
        if (!destinationId) throw GetLikeAndCommentErrors.NO_DESTINATION_ID;
        return next();
    } catch (error) {
        return res.onError(new ValidationError(error));
    }
};
// get like and comment of account in destination
const getAccountLikeCommentInput = (req, res, next) => {
    const { jwt } = req.headers;
    const destinationId = req.params.id;
    try {
        if (!jwt) throw GetAccountLikeCommentErrors.NO_TOKEN;
        if (!destinationId) throw GetAccountLikeCommentErrors.NO_DESTINATION_ID;
        return next();
    } catch (error) {
        return res.onError(new ValidationError(error));
    }
};
export default {
    createDestinationInput,
    getDestinationInput,
    updateDestinationInput,
    reduceInput,
    deleteDestinationInput,
    createLikeCommentInput,
    getLikeAndCommentInput,
    getAccountLikeCommentInput
};