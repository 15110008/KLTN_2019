// import Validator from 'validator';
import ValidationError from '../../../errors-handle/validation.errors';
import {
    CreateDestinationErrors,
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

export default {
    createDestinationInput,
};