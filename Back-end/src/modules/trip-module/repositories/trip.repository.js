import TripSchema from '../models/trip.model';
import TripDetailSchema from '../models/tripDetail.model';
import TripAccountSchema from '../models/trip-account.model';

// Trip
const createTrip = async (data) => {
    const result = await TripSchema.create(data);
    return result;
};
const getTripById = async (tripId) => {
    const result = await TripSchema.findOne({ _id: tripId, isDeleted: false });
    return result;
};
const getTripPublic = async () => {
    const result = await TripSchema.find({ public: true, isDeleted: false });
    return result;
};
const getTripUnPublic = async (accountId) => {
    const result = await TripSchema.find({ accountId, isDeleted: false });
    return result;
};
const shareTrip = async (tripId) => {
    const result = await TripSchema.updateOne({
        _id: tripId,
        isDeleted: false
    },
    { public: true });
    return result;
};
const getAll = async () => {
    const result = await TripSchema.find({ isDeleted: false });
    return result;
};
// delete trip
const deleteOne = async (tripId) => {
    const result = await TripSchema.deleteOne({
        _id: tripId,
    });
    return result;
};


// TripDetail
const createTripDetail = async (data) => {
    const result = await TripDetailSchema.create(data);
    return result;
};
// get danh sách trip detail của 1 cái trip
const getTripsDetail = async (tripId) => {
    const result = await TripDetailSchema.find({ tripId, isDeleted: false });
    return result;
};
// get 1 trip detail
const getTripDetail = async (tripDetailId) => {
    const result = await TripDetailSchema.findOne({
        _id: tripDetailId,
        isDeleted: false
    });
    return result;
};
// update totalPlaces in trip detail
const updateTotalPlaces = async (tripDetailId, data) => {
    const result = await TripDetailSchema.updateOne({
        _id: tripDetailId,
        isDeleted: false
    },
    { ...data });
    return result;
};
// update listSpot
const updateListSpot = async (tripDetailId, data) => {
    const result = await TripDetailSchema.updateOne({
        _id: tripDetailId,
        isDeleted: false
    },
    { ...data });
    return result;
};
// delete trip detail
const deleteDetail = async (tripId) => {
    const result = await TripDetailSchema.deleteMany({
        tripId
    });
    return result;
};
// get all trip detail, for check, not use
const getAllTripDetail = async () => {
    const result = await TripDetailSchema.find({ isDeleted: false });
    return result;
};


// Trip account
const createCom = async (data) => {
    const result = await TripAccountSchema.create(data);
    return result;
};
const existed = async (tripId, accountId) => {
    const result = await TripAccountSchema.findOne({
        tripId,
        accountId,
        isDeleted: false
    });
    return result;
};
const createRating = async (data) => {
    const result = await TripAccountSchema.create(data);
    return result;
};
const updateRating = async (tripId, accountId, rating) => {
    const result = await TripAccountSchema.updateOne({
        tripId,
        accountId,
        isDeleted: false
    },
    { rating });
    return result;
};
const sumRating = async () => {
    const result = await TripAccountSchema.aggregate([
        { $match: { rating: { $ne: null } } },
        {
 $group: {
            _id: '$_id',
            totalValue: {
                $sum: '$rating'
            }
        }
}
    ]);
    return result;
};
const countRating = async () => {
    const result = await TripAccountSchema.find(
        {
            rating: { $ne: null },
            isDeleted: false
        }
    ).count();
    return result;
};
const updateRate = async (tripId, rate) => {
    const result = await TripSchema.updateOne({
        _id: tripId,
        isDeleted: false
    },
    { rate });
    return result;
};
const getComment = async (tripId) => {
    const result = await TripAccountSchema.find({
        tripId,
        comment: { $ne: null },
        isDeleted: false
    }).populate({ path: 'accountId', select: 'name -_id' });
    return result;
};
const getRate = async (tripId) => {
    const result = await TripSchema.findOne({
        _id: tripId,
        isDeleted: false,
        rate: { $ne: null }
    });
    return result;
};
export default {
    getRate,
    getComment,
    updateRate,
    countRating,
    sumRating,
    updateRating,
    createRating,
    existed,
    createCom,
    createTrip,
    getTripById,
    getTripPublic,
    getTripUnPublic,
    shareTrip,
    createTripDetail,
    getTripsDetail,
    getTripDetail,
    updateTotalPlaces,
    updateListSpot,
    getAll,
    deleteOne,
    deleteDetail,
    getAllTripDetail
};