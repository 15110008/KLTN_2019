import { VerifyToken } from '../../../utils/jwt.util';
import { AccountRole } from '../../account-module/commons/account-status.common';
import PlaceRepository from '../repositories/place.repository';
import NotImplementError from '../../../errors-handle/not-implemented.errors';
import NotFoundError from '../../../errors-handle/not-found.errors';
import Unauthorized from '../../../errors-handle/unauthorized.errors';
import AlreadyExistError from '../../../errors-handle/already-exist.errors';
import {
    CreatePlaceErrors,
    GetPlacesErrors,
    GetPlaceErrors,
    UpdatePlaceErrors,
    DeletePlaceErrors
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
const getPlaces = async (req, res) => {
    try {
        const places = await PlaceRepository.getPlaces();
        if (!places) throw new NotFoundError(GetPlacesErrors.GET_FAIL);
        const result = places.map((place) => {
            const placeInfo = {};
            placeInfo._id = place._id;
            placeInfo.name = place.name;
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
        return res.onSuccess({
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
        if (!update) throw new NotImplementError(UpdatePlaceErrors.UPDATE_FAIL);
        const place = await PlaceRepository.getPlace(placeId);
        if (!place) throw new NotFoundError(UpdatePlaceErrors.GET_FAIL);
        return res.onSuccess({
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
export default {
    create,
    getPlaces,
    getPlace,
    updatePlace,
    deletePlace
};