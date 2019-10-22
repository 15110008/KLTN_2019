import DestinationSchema from '../models/destination.model';

const create = async (data) => {
    const result = await DestinationSchema.create(data);
    return result;
};

export default {
    create,

};