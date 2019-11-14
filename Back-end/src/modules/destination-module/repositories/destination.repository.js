import DestinationSchema from '../models/destination.model';
import DestinationAccountSchema from '../models/destination-account.model';

const isExistedDestination = async (name) => {
    const result = await DestinationSchema.findOne({
        name,
        isDeleted: false
    });
    return result;
};
const create = async (data) => {
    const result = await DestinationSchema.create(data);
    return result;
};
const getDestinations = async () => {
    const result = await DestinationSchema.find({ isDeleted: false });
    return result;
};
const getDestination = async (destinationId) => {
    const result = await DestinationSchema.findOne({ _id: destinationId, isDeleted: false });
    return result;
};
const updateInfo = async (destinationId, data) => {
    const result = await DestinationSchema.updateOne({
        _id: destinationId,
        isDeleted: false
    },
        { ...data });
    if (result.n === result.nModified) return true;
    return false;
};
const deleteDestination = async (destinationId) => {
    const result = await DestinationSchema.updateOne(
    {
        _id: destinationId
    },
        { isDeleted: true }
);
    if (result.n === result.nModified) return true;
    return false;
};
const createLikeComment = async (data) => {
    const result = await DestinationAccountSchema.create(data);
    return result;
};
const getLikeAndComment = async (destinationId) => {
    const result = await DestinationAccountSchema.find(
        {
            destinationId,
            isDeleted: false
        }
);
    return result;
};
const getAccountLikeComment = async (destinationId, accountId) => {
    const result = await DestinationAccountSchema.find({
        destinationId,
        accountId,
        isDeleted: false
    });
    return result;
};
const uploadImage = async (destinationId, data) => {
    const result = await DestinationSchema.updateOne({
        _id: destinationId,
        isDeleted: false
    },
        { ...data });
    if (result.n === result.nModified) return true;
    return false;
};
const insertImage = async (destinationId, data) => {
    const result = await DestinationSchema.updateOne({
        _id: destinationId,
        isDeleted: false
    },
    { $push: { images: data } });
    if (result.n === result.nModified) return true;
    return false;
};
const updateImage = async (destinationId, string, data) => {
    const result = await DestinationSchema.updateOne({
        _id: destinationId,
        isDeleted: false,
        images: string
    },
    { $set: { 'images.$': data } });
    if (result.n === result.nModified) return true;
    return false;
};
export default {
    isExistedDestination,
    create,
    getDestinations,
    getDestination,
    updateInfo,
    deleteDestination,
    createLikeComment,
    getLikeAndComment,
    getAccountLikeComment,
    uploadImage,
    insertImage,
    updateImage
};