import { VerifyToken } from '../../../utils/jwt.util';
import { AccountRole } from '../../account-module/commons/account-status.common';
import PlaceRepository from '../repositories/place.repository';
import NotImplementError from '../../../errors-handle/not-implemented.errors';
import NotFoundError from '../../../errors-handle/not-found.errors';
import Unauthorized from '../../../errors-handle/unauthorized.errors';
import AlreadyExistError from '../../../errors-handle/already-exist.errors';
import AccountRepository from '../../account-module/repositories/account.repository';
import {
    CreatePlaceErrors,
    CreateRatingCommentErrors,
    GetPlacesErrors,
    GetPlaceErrors,
    GetRateCommentErrors,
    UpdatePlaceErrors,
    DeletePlaceErrors,
    InsertImageErrors,
    UpdateImageErrors,
    UpdateSingleImageErrors,
    InsertMultiImageErrors,
    GetPlacesOfDesErrors,
    GetPlaces3Errors,
    GetPlaces2Errors,
    CreateRatingErrors,
    GetRateErrors
} from '../error-codes/place.error-codes';

const create = async (req, res) => {
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
        const authenData = VerifyToken(jwt);
        if (!authenData) throw new NotImplementError(CreatePlaceErrors.AUTH_FAIL);
        if (authenData.role !== AccountRole.MANAGER) throw new Unauthorized(CreatePlaceErrors.NO_RIGHT);
        const isExist = await PlaceRepository.isExistPlace(name);
        if (isExist) throw new AlreadyExistError(CreatePlaceErrors.PLACE_ALREADY_EXIST);
        const place = await PlaceRepository.create({
            name,
            category,
            location,
            phone,
            description,
            price,
            longitude,
            latitude,
            destinationId
        });
        if (!place) throw new NotImplementError(CreatePlaceErrors.CREATE_FAIL);
        return res.onSuccess(place);
    } catch (error) {
        return res.onError(error);
    }
};
const createCom = async (req, res) => {
    const { jwt } = req.headers;
    const {
        placeId,
        comment
    } = req.body;
    try {
        const authenData = VerifyToken(jwt);
        if (!authenData) throw new NotImplementError(CreateRatingCommentErrors.AUTH_FAIL);
        const { accountId } = authenData;
        req.body = {
            placeId,
            accountId,
            comment
        };
        const account = await AccountRepository.getAccountById(req.body.accountId);
        if (!account) throw new NotFoundError(CreateRatingCommentErrors.ACCOUNT_NEVER_EXIST);
        const place = await PlaceRepository.getPlace(placeId);
        if (!place) throw new NotFoundError(CreateRatingCommentErrors.PLACE_NEVER_EXIST);
        // const existed = await PlaceRepository.existed(placeId, accountId);
        const result = await PlaceRepository.createCom(req.body);
        return res.onSuccess(result);
    } catch (error) {
        return res.onError(error);
    }
};
const createRating = async (req, res) => {
    const { jwt } = req.headers;
    const {
        placeId,
        rating
    } = req.body;
    try {
        const authenData = VerifyToken(jwt);
        if (!authenData) throw new NotImplementError(CreateRatingErrors.AUTH_FAIL);
        const { accountId } = authenData;
        req.body = {
            placeId,
            accountId,
            rating
        };
        const account = await AccountRepository.getAccountById(req.body.accountId);
        if (!account) throw new NotFoundError(CreateRatingErrors.ACCOUNT_NEVER_EXIST);
        const place = await PlaceRepository.getPlace(placeId);
        if (!place) throw new NotFoundError(CreateRatingErrors.PLACE_NEVER_EXIST);
        const existed = await PlaceRepository.existed(req.body.placeId, req.body.accountId);
        if (!existed) {
            const result = await PlaceRepository.createRating(req.body);
            if (!result) throw new NotImplementError(CreateRatingErrors.CREATE_RATING_FAIL);
        } else {
            const result = await PlaceRepository.updateRating(req.body.placeId, req.body.accountId, req.body.rating);
            if (!result) throw new NotImplementError(CreateRatingErrors.UPDATE_RATING_FAIL);
        }
        const ra = await PlaceRepository.existed(req.body.placeId, req.body.accountId);
        const sum = await PlaceRepository.sumRating(placeId);
        /* eslint-enable no-await-in-loop */
        const total = sum.map((su) => {
            const { totalValue } = su;
            return totalValue;
        });
        const sumRa = await Promise.all(total);
        let sumRating = 0;
        for (let i = 0; i < sumRa.length; i += 1) {
            sumRating += sumRa[i];
        }
        /* eslint-enable no-await-in-loop */
        const count = await PlaceRepository.countRating(placeId);
        const rate = sumRating / count;
        const update = await PlaceRepository.updateRate(placeId, rate);
        if (!update) throw new NotImplementError(CreateRatingErrors.UPDATE_RATE_FAIL);
        return res.onSuccess(ra, rate);
    } catch (error) {
        return res.onError(error);
    }
};
const getPlaces = async (req, res) => {
    try {
        const places = await PlaceRepository.getPlaces();
        if (!places) throw new NotFoundError(GetPlacesErrors.GET_FAIL);
        const result = places.map((place) => {
            const placeInfo = {};
            placeInfo._id = place._id;
            placeInfo.name = place.name;
            placeInfo.rate = place.rate;
            placeInfo.category = place.category;
            placeInfo.location = place.location;
            placeInfo.phone = place.phone;
            placeInfo.description = place.description;
            placeInfo.price = place.price;
            placeInfo.images = place.images;
            placeInfo.longitude = place.longitude;
            placeInfo.latitude = place.latitude;
            placeInfo.destinationId = place.destinationId;
            return placeInfo;
        });
        return res.send({
            data: result,
            success: 'ok'
        });
    } catch (error) {
        return res.onError(error);
    }
};
const getPlace = async (req, res) => {
    const placeId = req.params.id;
    try {
        const place = await PlaceRepository.getPlace(placeId);
        if (!place) throw new NotFoundError(GetPlaceErrors.GET_FAIL);
        const count = await PlaceRepository.countRating(placeId);
        const count1 = await PlaceRepository.countRating1(placeId);
        const count2 = await PlaceRepository.countRating2(placeId);
        const count3 = await PlaceRepository.countRating3(placeId);
        const count4 = await PlaceRepository.countRating4(placeId);
        const count5 = await PlaceRepository.countRating5(placeId);
        const result = {
            count,
            count1,
            count2,
            count3,
            count4,
            count5
        };
        return res.onSuccess({
            _id: place._id,
            name: place.name,
            rate: place.rate,
            category: place.category,
            location: place.location,
            phone: place.phone,
            description: place.description,
            price: place.price,
            images: place.images,
            longitude: place.longitude,
            latitude: place.latitude,
            destinationId: place.destinationId,
        }, result);
    } catch (error) {
        return res.onError(error);
    }
};
const getComment = async (req, res) => {
    const placeId = req.params.id;
    try {
        const place = await PlaceRepository.getPlace(placeId);
        if (!place) throw new NotFoundError(GetRateCommentErrors.PLACE_NEVER_EXIST);
        const result = await PlaceRepository.getComment(placeId);
        if (!result) throw new NotImplementError(GetRateCommentErrors.GET_FAIL);
        return res.onSuccess({
            accountId: result.accountId,
            comment: result.comment,
        });
    } catch (error) {
        return res.onError(error);
    }
};
const updatePlace = async (req, res) => {
    const { jwt } = req.headers;
    const placeId = req.params.id;
    const data = req.body;
    try {
        const authenData = VerifyToken(jwt);
        if (!authenData) throw new NotImplementError(UpdatePlaceErrors.AUTH_FAIL);
        if (authenData.role !== AccountRole.MANAGER) throw new Unauthorized(UpdatePlaceErrors.NO_RIGHT);
        const isExisted = await PlaceRepository.getPlace(placeId);
        if (!isExisted) throw new NotFoundError(UpdatePlaceErrors.PLACE_NEVER_EXIST);
        const update = await PlaceRepository.updatePlace(placeId, data);
        // if (!update) throw new NotImplementError(UpdatePlaceErrors.UPDATE_FAIL);
        const place = await PlaceRepository.getPlace(placeId);
        if (!place) throw new NotFoundError(UpdatePlaceErrors.GET_FAIL);
        return res.onSuccess(update, {
            _id: place._id,
            name: place.name,
            category: place.category,
            location: place.location,
            phone: place.phone,
            description: place.description,
            price: place.price,
            longitude: place.longitude,
            latitude: place.latitude,
            destinationId: place.destinationId,
        });
    } catch (error) {
        return res.onError(error);
    }
};
const deletePlace = async (req, res) => {
    const { jwt } = req.headers;
    const placeId = req.params.id;
    try {
        const authenData = VerifyToken(jwt);
        if (!authenData) throw new NotImplementError(DeletePlaceErrors.AUTH_FAIL);
        if (authenData.role !== AccountRole.MANAGER) throw new Unauthorized(DeletePlaceErrors.NO_RIGHT);
        const isExisted = await PlaceRepository.getPlace(placeId);
        if (!isExisted) throw new NotFoundError(DeletePlaceErrors.PLACE_NEVER_EXIST);
        const result = await PlaceRepository.deletePlace(placeId);
        if (!result) throw new NotImplementError(DeletePlaceErrors.DELETE_FAIL);
        return res.onSuccess({ message: result });
    } catch (error) {
        return res.onError(error);
    }
};
const insertImage = async (req, res) => {
    const { jwt } = req.headers;
    const { placeId } = req.body;
    const images = req.file.path;
    req.body = { images };
    // console.log(images);
    try {
        const authenData = VerifyToken(jwt);
        if (!jwt) throw new NotImplementError(InsertImageErrors.AUTH_FAIL);
        if (authenData.role !== AccountRole.MANAGER) throw new Unauthorized(InsertImageErrors.NO_RIGHT);
        const place = await PlaceRepository.getPlace(placeId);
        if (!place) throw new NotFoundError(InsertImageErrors.PLACE_NEVER_EXIST);
        const arrays = place.images;
        const array = arrays.map(async (arr) => {
            if (arr === req.body.images) throw new AlreadyExistError(InsertImageErrors.SAME_IMAGE);
        });
        await Promise.all(array);
        const upload = await PlaceRepository.insertImage(placeId, req.body.images);
        if (!upload) throw new NotImplementError(InsertImageErrors.INSERT_FAILURE);
        const result = await PlaceRepository.getPlace(placeId);
        if (!result) throw new NotImplementError(InsertImageErrors.GET_FAIL);
        return res.onSuccess(result);
    } catch (error) {
        return res.onError(error);
    }
};
const updateImage = async (req, res) => {
    const { jwt } = req.headers;
    const { placeId } = req.body;
    const images = req.files;
    const image = images.map((i) => {
        return i.path;
    });
    await Promise.all(image);
    try {
        const authenData = VerifyToken(jwt);
        if (!jwt) throw new NotImplementError(UpdateImageErrors.AUTH_FAIL);
        if (authenData.role !== AccountRole.MANAGER) throw new Unauthorized(UpdateImageErrors.NO_RIGHT);
        const place = await PlaceRepository.getPlace(placeId);
        if (!place) throw new NotFoundError(UpdateImageErrors.PLACE_NEVER_EXIST);
        // const arrays = place.images;
        // const array = arrays.map(async (arr) => {
        //     if (arr === req.body.images) throw new AlreadyExistError(UpdateImageErrors.SAME_IMAGE);
        // });
        // await Promise.all(array);
        const upload = await PlaceRepository.updateImage(placeId, image);
        if (!upload) throw new NotImplementError(UpdateImageErrors.UPDATE_FAILURE);
        const result = await PlaceRepository.getPlace(placeId);
        if (!result) throw new NotImplementError(UpdateImageErrors.GET_FAIL);
        return res.onSuccess(result);
    } catch (error) {
        return res.onError(error);
    }
};
const updateSingle = async (req, res) => {
    const { jwt } = req.headers;
    const { placeId, oldImage } = req.body;
    const images = req.file.path;
    req.body = { oldImage, images };
    try {
        const authenData = VerifyToken(jwt);
        if (!jwt) throw new NotImplementError(UpdateSingleImageErrors.AUTH_FAIL);
        if (authenData.role !== AccountRole.MANAGER) throw new Unauthorized(UpdateSingleImageErrors.NO_RIGHT);
        const place = await PlaceRepository.getPlace(placeId);
        if (!place) throw new NotFoundError(UpdateSingleImageErrors.PLACE_NEVER_EXIST);
        const arrays = place.images;
        const array = arrays.map(async (arr) => {
            if (arr === req.body.images) throw new AlreadyExistError(UpdateSingleImageErrors.SAME_IMAGE);
        });
        await Promise.all(array);
        const upload = await PlaceRepository.updateSingle(placeId, req.body.oldImage, req.body.images);
        if (!upload) throw new NotImplementError(UpdateSingleImageErrors.UPDATE_FAILURE);
        const result = await PlaceRepository.getPlace(placeId);
        if (!result) throw new NotImplementError(UpdateSingleImageErrors.GET_FAIL);
        return res.onSuccess(result);
    } catch (error) {
        return res.onError(error);
    }
};
const insertMulti = async (req, res) => {
    const { jwt } = req.headers;
    const { placeId } = req.body;
    const images = req.files;
    const image = images.map((i) => {
        return i.path;
    });
    await Promise.all(image);
    try {
        const authenData = VerifyToken(jwt);
        if (!jwt) throw new NotImplementError(InsertMultiImageErrors.AUTH_FAIL);
        if (authenData.role !== AccountRole.MANAGER) throw new Unauthorized(InsertMultiImageErrors.NO_RIGHT);
        const place = await PlaceRepository.getPlace(placeId);
        if (!place) throw new NotFoundError(InsertMultiImageErrors.PLACE_NEVER_EXIST);
        // const arrays = place.images;
        // const array = arrays.map(async (arr) => {
        //     if (arr === req.body.images) throw new AlreadyExistError(InsertMultiImageErrors.SAME_IMAGE);
        // });
        // await Promise.all(array);
        const names = images.map((i) => {
            const name = i.filename;
            const url = 'localhost:3000/uploads';
            const y = { name, url };
            return y;
        });
        await Promise.all(names);
        const upload = await PlaceRepository.insertMulti(placeId, image);
        if (!upload) throw new NotImplementError(InsertMultiImageErrors.UPDATE_FAILURE);
        const result = await PlaceRepository.getPlace(placeId);
        if (!result) throw new NotImplementError(InsertMultiImageErrors.GET_FAIL);
        return res.onSuccess(names);
    } catch (error) {
        return res.onError(error);
    }
};
const getPlacesOfDes = async (req, res) => {
    const destinationId = req.params.id;
    try {
        const places = await PlaceRepository.getPlacesOfDes(destinationId);
        if (!places) throw new NotFoundError(GetPlacesOfDesErrors.GET_FAILURE);
        const result = places.map((place) => {
            const placeInfo = {};
            placeInfo._id = place._id;
            placeInfo.name = place.name;
            placeInfo.rate = place.rate;
            placeInfo.category = place.category;
            placeInfo.location = place.location;
            placeInfo.phone = place.phone;
            placeInfo.description = place.description;
            placeInfo.price = place.price;
            placeInfo.images = place.images;
            placeInfo.longitude = place.longitude;
            placeInfo.latitude = place.latitude;
            placeInfo.destinationId = place.destinationId;
            return placeInfo;
        });
        return res.onSuccess(result);
    } catch (error) {
        return res.onError(error);
    }
};
const getPlaces3 = async (req, res) => {
    const destinationId = req.params.id;
    try {
        const places3 = await PlaceRepository.getPlaces3(destinationId);
        if (!places3) throw new NotFoundError(GetPlaces3Errors.GET_FAIL);
        const result = places3.map((place) => {
            const placeInfo = {};
            placeInfo._id = place._id;
            placeInfo.name = place.name;
            placeInfo.rate = place.rate;
            placeInfo.category = place.category;
            placeInfo.location = place.location;
            placeInfo.phone = place.phone;
            placeInfo.description = place.description;
            placeInfo.price = place.price;
            placeInfo.images = place.images;
            placeInfo.longitude = place.longitude;
            placeInfo.latitude = place.latitude;
            placeInfo.destinationId = place.destinationId;
            return placeInfo;
        });
        return res.onSuccess(result);
    } catch (error) {
        return res.onError(error);
    }
};
const getPlaces2 = async (req, res) => {
    const destinationId = req.params.id;
    try {
        const places2 = await PlaceRepository.getPlaces2(destinationId);
        if (!places2) throw new NotFoundError(GetPlaces2Errors.GET_FAIL);
        const result = places2.map((place) => {
            const placeInfo = {};
            placeInfo._id = place._id;
            placeInfo.name = place.name;
            placeInfo.rate = place.rate;
            placeInfo.category = place.category;
            placeInfo.location = place.location;
            placeInfo.phone = place.phone;
            placeInfo.description = place.description;
            placeInfo.price = place.price;
            placeInfo.images = place.images;
            placeInfo.longitude = place.longitude;
            placeInfo.latitude = place.latitude;
            placeInfo.destinationId = place.destinationId;
            return placeInfo;
        });
        return res.onSuccess(result);
    } catch (error) {
        return res.onError(error);
    }
};
const getRate = async (req, res) => {
    const placeId = req.params.id;
    try {
        const place = await PlaceRepository.getPlace(placeId);
        if (!place) throw new NotFoundError(GetRateErrors.PLACE_NEVER_EXIST);
        const result = await PlaceRepository.getRate(placeId);
        if (!result) throw new NotImplementError(GetRateErrors.GET_FAIL);
        return res.onSuccess({
            name: result.name,
            rate: result.rate,
        });
    } catch (error) {
        return res.onError(error);
    }
};
export default {
    getRate,
    create,
    createCom,
    getPlaces,
    getPlace,
    getComment,
    updatePlace,
    deletePlace,
    insertImage,
    updateImage,
    updateSingle,
    insertMulti,
    getPlacesOfDes,
    getPlaces3,
    getPlaces2,
    createRating
};