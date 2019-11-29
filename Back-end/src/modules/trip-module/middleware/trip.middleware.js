import { CreateTripErrors } from '../error-codes/trip.error-codes';
import ValidationError from '../../../errors-handle/validation.errors';


const createTripInput = (req, res, next) => {
    const { jwt } = req.headers;
    const {
        fromDes,
        toDes,
        totalDate,
        destinationId
    } = req.body;
    try {
        if (!jwt) throw CreateTripErrors.NO_TOKEN;
        if (!fromDes) throw CreateTripErrors.NO_FROM_PLACE;
        if (!toDes) throw CreateTripErrors.NO_TO_PLACE;
        if (!totalDate) throw CreateTripErrors.NO_TOTAL_DATE;
        if (!destinationId) throw CreateTripErrors.NO_DESTINATION_ID;
        return next();
    } catch (error) {
        return res.onError(new ValidationError(error));
    }
};

export default {
    createTripInput
};