import PlaceSchema from '../models/place.model';

const isExistPlace = async (name) => {
    const result = await PlaceSchema.findOne({ name });
    return result;
};
const create = async (data) => {
    const result = await PlaceSchema.create(data);
    return result;
};
const getPlaces = async () => {
    const result = await PlaceSchema.find({ isDeleted: false });
    return result;
};
const getPlace = async (placeId) => {
    const result = await PlaceSchema.findOne({ _id: placeId, isDeleted: false });
    return result;
};
const getRateComment = async (placeId) => {
    const result = await PlaceSchema.find(
        {
            placeId,
            isDeleted: false
        }
);
    return result;
};
const updatePlace = async (placeId, data) => {
    const result = await PlaceSchema.updateOne({
        _id: placeId,
        isDeleted: false
    },
        { ...data });
    if (result.n === result.nModified) return true;
    return false;
};
const deletePlace = async (placeId) => {
    const result = await PlaceSchema.updateOne(
        {
            _id: placeId
        },
            { isDeleted: true }
    );
        if (result.n === result.nModified) return true;
        return false;
};
export default {
    isExistPlace,
    create,
    getPlaces,
    getPlace,
    getRateComment,
    updatePlace,
    deletePlace
};