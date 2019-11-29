import SpotSchema from '../models/spot.model';

const create = async (data) => {
    const result = await SpotSchema.create(data);
    return result;
};
const getSpot = async (spotId) => {
    const result = await SpotSchema.findOne({ spotId });
    return result;
};
export default {
    create,
    getSpot
};