import TripSchema from '../models/trip.model';
import TripDetailSchema from '../models/tripDetail.model';

const createTrip = async (data) => {
    const result = await TripSchema.create(data);
    return result;
};
const createTripDetail = async (data) => {
    console.log(data);
    const result = await TripDetailSchema.create(data);
    return result;
};
const getTripDetail = async () => {
    const result = await TripDetailSchema.find({ isDeleted: false });
    return result;
};
export default {
    createTrip,
    createTripDetail,
    getTripDetail
};