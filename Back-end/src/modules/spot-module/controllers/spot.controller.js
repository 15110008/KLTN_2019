import SpotRepository from '../repositories/spot.repository';
import NotImplementError from '../../../errors-handle/not-implemented.errors';
// import Unauthorized from '../../../errors-handle/unauthorized.errors';
import { CreateSpotErrors } from '../error-codes/spot.error-codes';
// import { VerifyToken } from '../../../utils/jwt.util';
// import { AccountRole } from '../../account-module/commons/account-status.common';

const create = async (req, res) => {
    // const { jwt } = req.header;
    const {
        spotId,
        length,
        time
    } = req.body;
    try {
        // const authenData = VerifyToken(jwt);
        // if (!authenData) throw new NotImplementError(CreateSpotErrors.AUTH_FAIL);
        // if (authenData.role !== AccountRole.MANAGER) throw new Unauthorized(CreateSpotErrors.NO_RIGHT);
        const spot = await SpotRepository.create({
            spotId,
            length,
            time
        });
        if (!spot) throw new NotImplementError(CreateSpotErrors.CREATE_FAIL);
        return res.onSuccess(spot);
    } catch (error) {
        return res.onError(error);
    }
};
const getSpots = async (req, res) => {
    try {
        const spots = await SpotRepository.getSpots();
        const result = spots.map((spot) => {
            const spotInfo = {};
            spotInfo.spotId = spot.spotId;
            spotInfo.length = spot.length;
            spotInfo.time = spot.time;
            return spotInfo;
        });
        return res.onSuccess(result);
    } catch (error) {
        return res.onError(error);
    }
};

export default {
    create,
    getSpots
};