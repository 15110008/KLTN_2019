import { VerifyToken } from "../../../utils/jwt.util";
import { CreateDestinationErrors } from "../error-codes/destination.error-codes";
import { AccountRole } from "../../account-module/commons/account-status.common";
import NotImplementError from '../../../errors-handle/not-implemented.errors';
import UnauthorizedError from '../../../errors-handle/unauthorized.errors';
import DestinationRepository from '../repositories/destination.repository';


const create = async (req, res) => {
    const {jwt} = req.headers;
    const {
        name,
        description,
        longitude,
        latitude
    } = req.body;
    try {
        const authenDate = VerifyToken(jwt);
        if(!authenDate) throw new NotImplementError(CreateDestinationErrors.AUTH_FAIL);
        if(authenDate.role !== AccountRole.MANAGER) throw new UnauthorizedError(CreateDestinationErrors.NO_RIGHT);
        const destination = await DestinationRepository.create({
            name,
            description,
            longitude, 
            latitude
        });
        if(!destination) throw new NotImplementError(CreateDestinationErrors.CREATE_FAILURE);
        return res.onSuccess(destination);
    } catch (error) {
        return res.onError(error);
    }
};

export default {
    create,
    
}