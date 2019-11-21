import ValidationError from '../../../errors-handle/validation.errors';
import { CreateSpotErrors } from '../error-codes/spot.error-codes';

const createInput = (req, res, next) => {
    // const { jwt } = req.headers;
    const {
        spotId,
        length,
        time
    } = req.body;
    try {
        // if (!jwt) throw CreateSpotErrors.NO_TOKEN;
        if (!req.body) throw CreateSpotErrors.NO_DATA;
        if (!spotId) throw CreateSpotErrors.NO_PLACE_ID;
        if (!length) throw CreateSpotErrors.NO_LENGTH;
        if (!time) throw CreateSpotErrors.NO_TIME;
        req.body = {
            spotId,
            length,
            time
        };
        return next();
    } catch (error) {
        return res.onError(new ValidationError(error));
    }
};

export default {
    createInput
};