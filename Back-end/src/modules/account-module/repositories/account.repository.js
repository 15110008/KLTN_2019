import AccountSchema from '../models/account.model';
import { AccountStatus } from '../commons/account-status.common';

const isExistedEmail = async (email) => {
    const result = await AccountSchema.findOne({ email });
    return result;
};

const create = async (data) => {
    const result = await AccountSchema.create(data);
    return result;
};

const getAccountByEmail = async (email) => {
    const result = await AccountSchema.findOne({ email, status: AccountStatus.ACTIVE });
    return result;
};

const getPayloadJwtSchema = (account) => {
    return {
        accountId: account._id,
        role: account.role,
    };
};

const getAccountById = async (accountId) => {
    const result = await AccountSchema.findOne({ _id: accountId, status: AccountStatus.ACTIVE });
    return result;
};

const getAccounts = async () => {
    const result = await AccountSchema.find({ isDeleted: false });
    return result;
};

const updateInfo = async (accountId, data) => {
    const result = await AccountSchema.updateOne({
        _id: accountId,
        isDeleted: false,
        status: AccountStatus.ACTIVE
    },
        { ...data });
    if (result.n === result.nModified) return true;
    return false;
};
const isExistedAccount = async (accountId) => {
    const result = await AccountSchema.findOne({ _id: accountId, isDeleted: false });
    return result;
};
const changePassword = async (accountId, password) => {
    const account = await AccountSchema.findOne({ _id: accountId, isDeleted: false, status: AccountStatus.ACTIVE });
    account.password = password;
    const result = await account.save();
    return result;
};

const blockAccount = async (accountId, status) => {
    const result = await AccountSchema.updateOne({
        _id: accountId,
        isDeleted: false
    },
    { status });
    if (result.n === result.nModified) return true;
    return false;
};

const unblockAccount = async (accountId, status) => {
    const result = await AccountSchema.updateOne({
        _id: accountId,
        isDeleted: false
    },
    { status });
    if (result.n === result.nModified) return true;
    return false;
};

const getAccountAfterBlock = async (accountId) => {
    const result = await AccountSchema.findOne({ _id: accountId, isDeleted: false, });
    return result;
};

const deleteAccount = async (accountId) => {
    const result = await AccountSchema.updateOne({ _id: accountId },
        { isDeleted: true });
    if (result.n === result.nModified) return true;
    return false;
};
const isExistedFacebookId = async (facebookId) => {
    const result = await AccountSchema.findOne({ 'facebook.facebookId': facebookId });
    return result;
};
const isExistedGoogleId = async (googleId) => {
    const result = await AccountSchema.findOne({ 'google.googleId': googleId });
    return result;
};
const updateAccount = async (email, data) => {
    const result = await AccountSchema.updateOne({
        email,
    },
    { ...data });
    if (result.n !== 0) return true;
    return false;
};
const updateFacebookToken = async (facebookId, token) => {
    const result = await AccountSchema.updateOne({
        'facebook.facebookId': facebookId
    },
    { 'facebook.facebookToken': token });
    if (result.n !== 0) return true;
    return false;
};
const updateGoogleToken = async (googleId, token) => {
    const result = await AccountSchema.updateOne({
        'google.googleId': googleId
    },
    { 'google.googleToken': token });
    if (result.n !== 0) return true;
    return false;
};
export default {
    create,
    isExistedEmail,
    getAccountByEmail,
    getPayloadJwtSchema,
    getAccountById,
    getAccounts,
    updateInfo,
    isExistedAccount,
    changePassword,
    blockAccount,
    unblockAccount,
    getAccountAfterBlock,
    deleteAccount,
    isExistedFacebookId,
    isExistedGoogleId,
    updateAccount,
    updateFacebookToken,
    updateGoogleToken
};