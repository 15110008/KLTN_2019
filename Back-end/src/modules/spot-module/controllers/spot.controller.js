import SpotRepository from '../repositories/spot.repository';
import NotImplementError from '../../../errors-handle/not-implemented.errors';
import Unauthorized from '../../../errors-handle/unauthorized.errors';
import { CreateSpotErrors } from '../error-codes/spot.error-codes';
import { VerifyToken } from '../../../utils/jwt.util';
import { AccountRole } from '../../account-module/commons/account-status.common';

const create = async (req, res) => {
    const { jwt } = req.header;
    const {
        placeId1,
        placeId2,
        length,
        time
    } = req.body;
    try {
        const authenData = VerifyToken(jwt);
        if (!authenData) throw new NotImplementError(CreateSpotErrors.AUTH_FAIL);
        if (authenData.role !== AccountRole.MANAGER) throw new Unauthorized(CreateSpotErrors.NO_RIGHT);
        const spot = await SpotRepository.create({
            placeId1,
            placeId2,
            length,
            time
        });
        if (!spot) throw new NotImplementError(CreateSpotErrors.CREATE_FAIL);
        return res.onSuccess(spot);
    } catch (error) {
        return res.onError(error);
    }
};

export default {
    create
};