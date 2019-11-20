import { VerifyToken } from '../../../utils/jwt.util';
import {
    CreateDestinationErrors,
    GetDestinationsErrors,
    GetDestinationErrors,
    UpdateDestinationErrors,
    DeleteDestinationErrors,
    GetLikeAndCommentErrors,
    GetAccountLikeCommentErrors,
    CreateLikeCommentErrors,
    UploadImageErrors,
    InsertImageErrors,
    UpdateImageErrors
} from '../error-codes/destination.error-codes';
import { AccountRole } from '../../account-module/commons/account-status.common';
import NotImplementError from '../../../errors-handle/not-implemented.errors';
import NotFoundError from '../../../errors-handle/not-found.errors';
import Unauthorized from '../../../errors-handle/unauthorized.errors';
import AlreadyExistError from '../../../errors-handle/already-exist.errors';
import DestinationRepository from '../repositories/destination.repository';
import AccountRepository from '../../account-module/repositories/account.repository';

const create = async (req, res) => {
    const { jwt } = req.headers;
    const {
        name,
        description,
        longitude,
        latitude
    } = req.body;
    try {
        const authenData = VerifyToken(jwt);
        if (!authenData) throw new NotImplementError(CreateDestinationErrors.AUTH_FAIL);
        if (authenData.role !== AccountRole.MANAGER) throw new Unauthorized(CreateDestinationErrors.NO_RIGHT);
        const isExisted = await DestinationRepository.isExistedDestination(name);
        if (isExisted) throw new AlreadyExistError(CreateDestinationErrors.DESTINATION_ALREADY_EXIST);
        const destination = await DestinationRepository.create({
            name,
            description,
            longitude,
            latitude
        });
        if (!destination) throw new NotImplementError(CreateDestinationErrors.CREATE_FAIL);
        return res.onSuccess(destination);
    } catch (error) {
        return res.onError(error);
    }
};
const getDestinations = async (req, res) => {
    try {
        const destinations = await DestinationRepository.getDestinations();
        if (!destinations) throw new NotFoundError(GetDestinationsErrors.GET_FAIL);
        const result = destinations.map((destination) => {
            const destinationInfo = {};
            destinationInfo._id = destination._id;
            destinationInfo.name = destination.name;
            destinationInfo.avatar = destination.avatar;
            destinationInfo.images = destination.images;
            destinationInfo.description = destination.description;
            destinationInfo.longitude = destination.longitude;
            destinationInfo.latitude = destination.latitude;
            return destinationInfo;
        });
        return res.send({
            data: result,
            success: 'ok'
        });
    } catch (error) {
        return res.onError(error);
    }
};
const getDestination = async (req, res) => {
    const destinationId = req.params.id;
    try {
        const destination = await DestinationRepository.getDestination(destinationId);
        if (!destination) throw new NotFoundError(GetDestinationErrors.GET_FAIL);
        return res.onSuccess({
            _id: destination._id,
            name: destination.name,
            avatar: destination.avatar,
            images: destination.images,
            description: destination.description,
            longitude: destination.longitude,
            latitude: destination.latitude,
        });
    } catch (error) {
        return res.onError(error);
    }
};
const updateDestinationInfo = async (req, res) => {
    const { jwt } = req.headers;
    const destinationId = req.params.id;
    const data = req.body;
    try {
        const authenData = VerifyToken(jwt);
        if (!authenData) throw new NotImplementError(UpdateDestinationErrors.AUTH_FAIL);
        if (authenData.role !== AccountRole.MANAGER) throw new Unauthorized(UpdateDestinationErrors.NO_RIGHT);
        const isExisted = await DestinationRepository.getDestination(destinationId);
        if (!isExisted) throw new NotFoundError(UpdateDestinationErrors.DESTINATION_NEVER_EXIST);
        const update = await DestinationRepository.updateInfo(destinationId, data);
        if (!update) throw new NotImplementError(UpdateDestinationErrors.UPDATE_FAIL);
        const destination = await DestinationRepository.getDestination(destinationId);
        if (!destination) throw new NotFoundError(UpdateDestinationErrors.GET_FAIL);
        return res.onSuccess({
            _id: destination._id,
            name: destination.name,
            avatar: destination.avatar,
            images: destination.images,
            description: destination.description,
            longitude: destination.longitude,
            latitude: destination.latitude,
        });
    } catch (error) {
        return res.onError(error);
    }
};
const deleteDestination = async (req, res) => {
    const { jwt } = req.headers;
    const destinationId = req.params.id;
    try {
        const authenData = VerifyToken(jwt);
        if (!authenData) throw new NotImplementError(DeleteDestinationErrors.AUTH_FAIL);
        if (authenData.role !== AccountRole.MANAGER) throw new Unauthorized(DeleteDestinationErrors.NO_RIGHT);
        const isExisted = await DestinationRepository.getDestination(destinationId);
        if (!isExisted) throw new NotFoundError(DeleteDestinationErrors.DESTINATION_NEVER_EXIST);
        const result = await DestinationRepository.deleteDestination(destinationId);
        if (!result) throw new NotImplementError(DeleteDestinationErrors.DELETE_FAIL);
        return res.onSuccess({ message: result });
    } catch (error) {
        return res.onError(error);
    }
};
// create like and comment
const createLikeComment = async (req, res) => {
    const {
        jwt,
        destinationId,
        comment
    } = req.body;
    try {
        const authenData = VerifyToken(jwt);
        if (!authenData) throw new NotImplementError(CreateLikeCommentErrors.AUTH_FAIL);
        const { accountId } = authenData.accountId;
        const account = await AccountRepository.getAccountById(accountId);
        if (!account) throw new NotFoundError(CreateLikeCommentErrors.ACCOUNT_NEVER_EXIST);
        const destination = await DestinationRepository.getDestination(destinationId);
        if (!destination) throw new NotFoundError(CreateLikeCommentErrors.DESTINATION_NEVER_EXIST);
        const result = await DestinationRepository.createLikeComment({ destinationId, accountId, comment });
        if (!result) throw new NotImplementError(CreateLikeCommentErrors.CREATE_FAIL);
        return res.onSuccess(result);
    } catch (error) {
        return res.onError(error);
    }
};
// get like and comment of destination with desId
const getLikeAndComment = async (req, res) => {
    const destinationId = req.params.id;
    try {
        const destination = await DestinationRepository.getDestination(destinationId);
        if (!destination) throw new NotFoundError(GetLikeAndCommentErrors.DESTINATION_NEVER_EXIST);
        const result = await DestinationRepository.getLikeAndComment(destinationId);
        if (!result) throw new NotImplementError(GetLikeAndCommentErrors.GET_FAIL);
        return res.onSuccess(result);
    } catch (error) {
        return res.onError(error);
    }
};
// get like and comment of account in destination
const getAccountLikeComment = async (req, res) => {
    const { jwt } = req.headers;
    const destinationId = req.params.id;
    try {
        const authenData = VerifyToken(jwt);
        if (!authenData) throw new NotImplementError(GetAccountLikeCommentErrors.AUTH_FAIL);
        const account = await AccountRepository.getAccountById(authenData.accountId);
        if (!account) throw new NotFoundError(GetAccountLikeCommentErrors.ACCOUNT_NEVER_EXIST);
        const destination = await DestinationRepository.getDestination(destinationId);
        if (!destination) throw new NotFoundError(GetAccountLikeCommentErrors.DESTINATION_NEVER_EXIST);
        const result = await DestinationRepository.getAccountLikeComment(destinationId, authenData.accountId);
        if (!result) throw new NotImplementError(GetAccountLikeCommentErrors.GET_FAIL);
        return res.onSuccess(result);
    } catch (error) {
        return res.onError(error);
    }
};
const uploadImage = async (req, res) => {
    const { jwt } = req.headers;
    const { destinationId } = req.body.destinationId;
    const avatar = req.file.path;
    req.body = { avatar };
    try {
        const authenData = VerifyToken(jwt);
        if (!jwt) throw new NotImplementError(UploadImageErrors.AUTH_FAIL);
        if (authenData.role !== AccountRole.MANAGER) throw new Unauthorized(UploadImageErrors.NO_RIGHT);
        const destination = await DestinationRepository.getDestination(destinationId);
        if (!destination) throw new NotFoundError(UploadImageErrors.DESTINATION_NEVER_EXIST);
        const upload = await DestinationRepository.uploadImage(destinationId, req.body);
        if (!upload) throw new NotImplementError(UploadImageErrors.UPLOAD_FAILURE);
        const result = await DestinationRepository.getDestination(destinationId);
        if (!result) throw new NotImplementError(UploadImageErrors.GET_FAIL);
        return res.onSuccess(result);
    } catch (error) {
        return res.onError(error);
    }
};
const insertImage = async (req, res) => {
    const { jwt } = req.headers;
    const { destinationId } = req.body;
    const images = req.file.path;
    req.body = { images };
    // console.log(images);
    try {
        const authenData = VerifyToken(jwt);
        if (!jwt) throw new NotImplementError(InsertImageErrors.AUTH_FAIL);
        if (authenData.role !== AccountRole.MANAGER) throw new Unauthorized(InsertImageErrors.NO_RIGHT);
        const destination = await DestinationRepository.getDestination(destinationId);
        if (!destination) throw new NotFoundError(InsertImageErrors.DESTINATION_NEVER_EXIST);
        const arrays = destination.images;
        const array = arrays.map(async (arr) => {
            if (arr === req.body.images) throw new AlreadyExistError(InsertImageErrors.SAME_IMAGE);
        });
        await Promise.all(array);
        const upload = await DestinationRepository.insertImage(destinationId, req.body.images);
        if (!upload) throw new NotImplementError(InsertImageErrors.INSERT_FAILURE);
        const result = await DestinationRepository.getDestination(destinationId);
        if (!result) throw new NotImplementError(InsertImageErrors.GET_FAIL);
        return res.onSuccess(result);
    } catch (error) {
        return res.onError(error);
    }
};
const updateImage = async (req, res) => {
    const { jwt } = req.headers;
    const { destinationId } = req.body;
    const images = req.files;
    const image = images.map((i) => {
        return i.path;
    });
    await Promise.all(image);
    try {
        const authenData = VerifyToken(jwt);
        if (!jwt) throw new NotImplementError(UpdateImageErrors.AUTH_FAIL);
        if (authenData.role !== AccountRole.MANAGER) throw new Unauthorized(UpdateImageErrors.NO_RIGHT);
        const destination = await DestinationRepository.getDestination(destinationId);
        if (!destination) throw new NotFoundError(UpdateImageErrors.DESTINATION_NEVER_EXIST);
        // const arrays = destination.images;
        // const array = arrays.map(async (arr) => {
        //     if (arr === req.body.images) throw new AlreadyExistError(UpdateImageErrors.SAME_IMAGE);
        // });
        // await Promise.all(array);
        const upload = await DestinationRepository.updateImage(destinationId, image);
        if (!upload) throw new NotImplementError(UpdateImageErrors.UPDATE_FAILURE);
        const result = await DestinationRepository.getDestination(destinationId);
        if (!result) throw new NotImplementError(UpdateImageErrors.GET_FAIL);
        return res.onSuccess(result);
    } catch (error) {
        return res.onError(error);
    }
};
export default {
    create,
    getDestinations,
    getDestination,
    updateDestinationInfo,
    deleteDestination,
    createLikeComment,
    getLikeAndComment,
    getAccountLikeComment,
    uploadImage,
    insertImage,
    updateImage
};