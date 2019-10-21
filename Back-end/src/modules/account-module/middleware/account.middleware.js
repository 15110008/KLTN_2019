import Validator from 'validator';
import ValidationError from '../../../errors-handle/validation.errors';
import {
    CreateAccountErrors,
    AccountLoginErrors,
    LoginWithFacebookErrors,
    LoginWithGoogleErrors,
    MeAccountErrors,
    GetAccountsErrors,
    GetAccountErrors,
    UpdateAccountErrors,
    ChangePasswordErrors,
    BlockUnblockAccountErrors,
    DeleteAccountErrors
} from '../error-codes/account.error-codes';

const createAccountInput = (req, res, next) => {
    const { email, password } = req.body;
    try {
        if (!req.body) throw CreateAccountErrors.NO_DATA;
        if (!email) throw CreateAccountErrors.NO_EMAIL;
        if (!password) throw CreateAccountErrors.NO_PASSWORD;
        if (!Validator.isEmail(email)) throw CreateAccountErrors.INVALID_EMAIL;
        return next();
    } catch (error) {
        return res.onError(new ValidationError(error));
    }
};

const logInAccountInput = (req, res, next) => {
    const { email, password } = req.body;
    try {
        console.log("TCL: logInAccountInput -> email", email)
        if (!req.body) throw AccountLoginErrors.NO_DATA;
        if (!email) throw AccountLoginErrors.NO_EMAIL;
        if (!password) throw AccountLoginErrors.NO_PASSWORD;
        if (!Validator.isEmail(email)) throw AccountLoginErrors.INVALID_EMAIL;
        return next();
    } catch (error) {
        console.log("TCL: logInAccountInput -> error", error)
        return res.onError(new ValidationError(error));
    }
};

const loginWithFacebookInput = (req, res, next) => {
    const {
        facebook
    } = req.body;
    try {
        if (!req.body) throw LoginWithFacebookErrors.NO_DATA;
        if (!facebook) throw LoginWithFacebookErrors.NO_FACEBOOK;
        if (!facebook.facebookId) throw LoginWithFacebookErrors.NO_FACEBOOK_ID;
        if (!facebook.facebookToken) throw LoginWithFacebookErrors.NO_FACEBOOK_TOKEN;
        if (!facebook.facebookName) throw LoginWithFacebookErrors.NO_FACEBOOK_NAME;
        if (!facebook.facebookEmail && !facebook.facebookPhone) throw LoginWithFacebookErrors.NO_EMAIL_AND_PHONE;
        if (facebook.facebookEmail) {
            if (!Validator.isEmail(facebook.facebookEmail)) throw LoginWithFacebookErrors.INVALID_EMAIL;
        }
        if (facebook.facebookPhone) {
            if (!Validator.isNumeric(facebook.facebookPhone)) throw LoginWithFacebookErrors.INVALID_PHONE;
        }
        req.body = {
            facebook
        };
        return next();
    } catch (error) {
        return res.onError(new ValidationError(error));
    }
};

const loginWithGoogleInput = (req, res, next) => {
    const {
        google
    } = req.body;
    try {
        if (!req.body) throw LoginWithGoogleErrors.NO_DATA;
        if (!google) throw LoginWithGoogleErrors.NO_GOOGLE;
        if (!google.googleId) throw LoginWithGoogleErrors.NO_GOOGLE_ID;
        if (!google.googleToken) throw LoginWithGoogleErrors.NO_GOOGLE_TOKEN;
        if (!google.googleName) throw LoginWithGoogleErrors.NO_GOOGLE_NAME;
        if (!google.googleEmail) throw LoginWithGoogleErrors.NO_EMAIL;
        if (google.googleEmail) {
            if (!Validator.isEmail(google.googleEmail)) throw LoginWithGoogleErrors.INVALID_EMAIL;
        }
        req.body = {
            google
        };
        return next();
    } catch (error) {
        return res.onError(new ValidationError(error));
    }
};

const meInput = (req, res, next) => {
    const { jwt } = req.headers;
    try {
        if (!jwt) throw MeAccountErrors.NO_DATA;
        return next();
    } catch (error) {
        return res.onError(new ValidationError(error));
    }
};

const getAccountsInput = (req, res, next) => {
    const { jwt } = req.headers;
    try {
        if (!jwt) throw GetAccountsErrors.NO_TOKEN;
        return next();
    } catch (error) {
        return res.onError(new ValidationError(error));
    }
};

const getAccountInput = (req, res, next) => {
    const { jwt } = req.headers;
    const accountId = req.params.id;
    try {
        if (!jwt) throw GetAccountErrors.NO_TOKEN;
        if (!accountId) throw GetAccountErrors.NO_ACCOUNT_ID;
        return next();
    } catch (error) {
        return res.onError(new ValidationError(error));
    }
};

const updateAccountInput = (req, res, next) => {
    const { jwt } = req.headers;
    const { name, avatar, phone } = req.body;
    try {
        if (!req.body) throw UpdateAccountErrors.NO_DATA;
        if (!jwt) throw MeAccountErrors.NO_TOKEN;
        req.body = { name, avatar, phone };
        return next();
    } catch (error) {
        return res.onError(new ValidationError(error));
    }
};
const reduceInput = (req, res, next) => {
    const data = req.body;
    const inputData = Object.keys(data).reduce((result, key) => {
        if (data[key]) {
            result[key] = data[key];
        }
        return result;
    }, {});
    req.body = inputData;
    return next();
};

const changePasswordInput = (req, res, next) => {
    const { oldPassword, newPassword } = req.body;
    const { jwt } = req.headers;
    try {
        if (!req.body) throw ChangePasswordErrors.NO_DATA;
        if (!jwt) throw ChangePasswordErrors.NO_TOKEN;
        if (!Validator.isJWT(jwt)) throw ChangePasswordErrors.INVALID_TOKEN;
        if (!oldPassword) throw ChangePasswordErrors.INVALID_OLD_PASSWORD;
        if (!newPassword) throw ChangePasswordErrors.INVALID_NEW_PASSWORD;
        if (!Validator.isByteLength(oldPassword, {
            min: 6,
            max: 15,
        })) throw ChangePasswordErrors.INVALID_PASSWORD;
        if (!Validator.isByteLength(newPassword, {
            min: 6,
            max: 15,
        })) throw ChangePasswordErrors.INVALID_PASSWORD;
        if (oldPassword === newPassword) throw ChangePasswordErrors.SIMILAR_PASSWORD;
        return next();
    } catch (error) {
        return res.onError(new ValidationError(error));
    }
};
const blockUnblockAccountInput = (req, res, next) => {
    const { jwt } = req.headers;
    try {
        if (!jwt) throw BlockUnblockAccountErrors.NO_TOKEN;
        if (!req.params.id) throw BlockUnblockAccountErrors.NO_ACCOUNT_ID;
        return next();
    } catch (error) {
        return res.onError(new ValidationError(error));
    }
};

const deleteAccountInput = (req, res, next) => {
    const { jwt } = req.headers;
    try {
        if (!jwt) throw DeleteAccountErrors.NO_TOKEN;
        if (!req.params.id) throw DeleteAccountErrors.NO_ACCOUNT_ID;
        return next();
    } catch (error) {
        return res.onError(new ValidationError(error));
    }
};
export default {
    createAccountInput,
    logInAccountInput,
    loginWithFacebookInput,
    loginWithGoogleInput,
    meInput,
    getAccountsInput,
    getAccountInput,
    updateAccountInput,
    reduceInput,
    changePasswordInput,
    blockUnblockAccountInput,
    deleteAccountInput
};