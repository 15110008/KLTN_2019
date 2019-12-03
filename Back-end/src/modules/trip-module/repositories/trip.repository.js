import TripSchema from '../models/trip.model';
import TripDetailSchema from '../models/tripDetail.model';

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


// TripDetail
const createTripDetail = async (data) => {
    const result = await TripDetailSchema.create(data);
    return result;
};
const getTripDetail = async (tripId) => {
    const result = await TripDetailSchema.find({ tripId, isDeleted: false });
    return result;
};

export default {
    createTrip,
    getTripById,
    getTripPublic,
    getTripUnPublic,
    shareTrip,
    createTripDetail,
    getTripDetail
};