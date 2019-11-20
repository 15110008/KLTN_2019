import SpotSchema from '../models/spot.model';

const create = async (data) => {
    const result = await SpotSchema.create(data);
    return result;
};

export default {
    create
};