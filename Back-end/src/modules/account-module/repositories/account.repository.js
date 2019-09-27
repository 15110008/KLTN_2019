import AccountSchema from '../models/account.model';

const create = async (data) => {
    const result = await AccountSchema.create(data);
    return result;
}

export default {
    create,
}