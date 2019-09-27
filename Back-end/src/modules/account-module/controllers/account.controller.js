import AccountRepository from '../repositories/account.repository'


const create = async (req, res) => {
    const {
        name, 
        email,
        phone,
        legacy,
        facebook,
        google
    } = req.body;
    try {
        const user = await AccountRepository.create({
            name,
            email,
            phone,
            legacy,
            facebook,
            google
        });
        return res.onSuccesS(user);
    } catch (error) {
        return res.onError(error);
    }
}

export default {
    create
}