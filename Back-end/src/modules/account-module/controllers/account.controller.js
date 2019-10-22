// Errors
import AlreadyExistError from '../../../errors-handle/already-exist.errors';
import NotFoundError from '../../../errors-handle/not-found.errors';
import ValidationError from '../../../errors-handle/validation.errors';
import AccountRepository from '../repositories/account.repository';
import NotImplementError from '../../../errors-handle/not-implemented.errors';
import Unauthorized from '../../../errors-handle/unauthorized.errors';
// Util
import { GenerateToken, VerifyToken } from '../../../utils/jwt.util';
// Commom - Code
import {
    CreateAccountErrors,
    AccountLoginErrors,
    MeAccountErrors,
    GetAccountsErrors,
    GetAccountErrors,
    UpdateAccountErrors,
    ChangePasswordErrors,
    BlockUnblockAccountErrors,
    DeleteAccountErrors,
    LoginWithFacebookErrors,
    LoginWithGoogleErrors
} from '../error-codes/account.error-codes';
import {
    AccountStatus,
    AccountRole,
    PasswordDefault
} from '../commons/account-status.common';
// import { PasswordDefault, } from '../commons/account-status.common';


const create = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const existed = await AccountRepository.isExistedEmail(email);
        if (existed) throw new AlreadyExistError(CreateAccountErrors.EMAIL_ALREADY_EXIST);
        const account = await AccountRepository.create({ name, email, password });
        if (!account) throw new NotImplementError(CreateAccountErrors.CREATE_FAIL);
        return res.onSuccess(account);
    } catch (error) {
        return res.onError(error);
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        // check account's exist
        const account = await AccountRepository.getAccountByEmail(email);
        if (!account) throw new NotFoundError(AccountLoginErrors.EMAIL_NEVER_EXIST);
        // compare password
        const isMatchPassword = await account.comparePassword(password);
        if (!isMatchPassword) throw new ValidationError(AccountLoginErrors.WRONG_PASSWORD);
        const jwt = GenerateToken(AccountRepository.getPayloadJwtSchema(account));
        return res.onSuccess({ jwt });
    } catch (error) {
        return res.onError(error);
    }
};

const loginWithFacebook = async (req, res) => {
    const { facebook } = req.body;
    try {
        let jwt;
        //console.log('aaaaaa');
        const isExistedFacebookId = await AccountRepository.isExistedFacebookId(facebook.facebookId);
        if (!isExistedFacebookId) { // first login with facebook
            const isExistedEmail = await AccountRepository.isExistedEmail(facebook.facebookEmail);
            if (!isExistedEmail) { // email never exist
                const password = PasswordDefault;
                const account = await AccountRepository.create({ // create new email in system
                    name: facebook.facebookName,
                    email: facebook.facebookEmail,
                    facebook,
                    password
                });
<<<<<<< HEAD
                //console.log('bbbbbbbb');
=======
                console.log('bbbbbbbb');
>>>>>>> 253e23236f10f944a4d7611b261ffd99dd5bfc56
                if (!account) throw new NotImplementError(LoginWithFacebookErrors.CREATE_FAIL_NEW_ACCOUNT);
                jwt = GenerateToken(AccountRepository.getPayloadJwtSchema(account));
                if (!jwt) throw new NotImplementError(LoginWithFacebookErrors.LOGIN_FAIL);
            } else { // email exist
                // update facebook info in system to check next login with facebook
                const updateAccount = await AccountRepository.updateAccount(facebook.facebookEmail, facebook);
                if (!updateAccount) throw new NotImplementError(LoginWithFacebookErrors.UPDATE_FACEBOOK_FAIL);
                jwt = GenerateToken(AccountRepository.getPayloadJwtSchema(isExistedEmail));
                if (!jwt) throw new NotImplementError(LoginWithFacebookErrors.LOGIN_FAIL);
            }
        } else { // login with facebook ago
            const updateAccount = await AccountRepository.updateFacebookToken(facebook.facebookId, facebook.facebookToken);
            if (!updateAccount) throw new NotImplementError(LoginWithFacebookErrors.UPDATE_FACEBOOK_TOKEN_FAIL);
            const isExistedEmail = await AccountRepository.isExistedEmail(facebook.facebookEmail);
            if (!isExistedEmail) throw new NotFoundError(LoginWithFacebookErrors.EMAIL_NEVER_EXIST);
            jwt = GenerateToken(AccountRepository.getPayloadJwtSchema(isExistedEmail));
            if (!jwt) throw new NotImplementError(LoginWithFacebookErrors.LOGIN_FAIL);
        }
        return res.onSuccess(jwt);
    } catch (error) {
        return res.onError(error);
    }
};

const loginWithGoogle = async (req, res) => {
    const { google } = req.body;
    try {
        let jwt;
        const isExistedGoogleId = await AccountRepository.isExistedGoogleId(google.googleId);
        if (!isExistedGoogleId) { // first login with google
            const isExistedEmail = await AccountRepository.isExistedEmail(google.googleEmail);
            if (!isExistedEmail) { // email never exist
                const password = PasswordDefault;
                const account = await AccountRepository.create({ // create new email in system
                    name: google.googleName,
                    email: google.googleEmail,
                    google,
                    password
                });
                if (!account) throw new NotImplementError(LoginWithGoogleErrors.CREATE_FAIL_NEW_ACCOUNT);
                jwt = GenerateToken(AccountRepository.getPayloadJwtSchema(account));
                if (!jwt) throw new NotImplementError(LoginWithGoogleErrors.LOGIN_FAIL);
            } else { // email exist
                // update google info in system to check next login with google
                const updateAccount = await AccountRepository.updateAccount(google.googleEmail, google);
                if (!updateAccount) throw new NotImplementError(LoginWithGoogleErrors.UPDATE_GOOGLE_FAIL);
                jwt = GenerateToken(AccountRepository.getPayloadJwtSchema(isExistedEmail));
                if (!jwt) throw new NotImplementError(LoginWithGoogleErrors.LOGIN_FAIL);
            }
        } else { // login with google ago
            const updateAccount = await AccountRepository.updateFacebookToken(google.googleId, google.googleToken);
            if (!updateAccount) throw new NotImplementError(LoginWithGoogleErrors.UPDATE_GOOGLE_TOKEN_FAIL);
            const isExistedEmail = await AccountRepository.isExistedEmail(google.googleEmail);
            if (!isExistedEmail) throw new NotFoundError(LoginWithGoogleErrors.EMAIL_NEVER_EXIST);
            jwt = GenerateToken(AccountRepository.getPayloadJwtSchema(isExistedEmail));
            if (!jwt) throw new NotImplementError(LoginWithGoogleErrors.LOGIN_FAIL);
        }
        return res.onSuccess(jwt);
    } catch (error) {
        return res.onError(error);
    }
};

const me = async (req, res) => {
    const { jwt } = req.headers;
    try {
        const authenData = VerifyToken(jwt);
        const account = await AccountRepository.getAccountById(authenData.accountId);
        if (!account) throw new NotFoundError(MeAccountErrors.INVALID_ACCOUNT);
        return res.onSuccess(account);
    } catch (error) {
        return res.onError(error);
    }
};

const getAccounts = async (req, res) => {
    const { jwt } = req.headers;
    try {
        const authenData = VerifyToken(jwt);
        if (!authenData) throw new NotImplementError(GetAccountsErrors.AUTH_FAIL);//
        if (authenData.role !== AccountRole.MANAGER) throw new Unauthorized(GetAccountsErrors.NO_RIGHT);
        const accounts = await AccountRepository.getAccounts();
        if (!accounts) throw new NotFoundError(GetAccountsErrors.GET_FAIL);
        const result = accounts.map((account) => {
            const accountInfo = {};
            accountInfo._id = account._id;
            accountInfo.name = account.name;
            accountInfo.avatar = account.avatar;
            accountInfo.status = account.status;
            accountInfo.email = account.email;
            accountInfo.phone = account.phone;
            return accountInfo;
        });
        return res.send({
            data: result,
            success: 'ok'
        });
    } catch (error) {
        return res.onError(error);
    }
};

const getAccount = async (req, res) => {
    const { jwt } = req.headers;
    const accountId = req.params.id;
    try {
        const authenData = VerifyToken(jwt);
        if (!authenData) throw new NotImplementError(GetAccountErrors.AUTH_FAIL);
        if (authenData.role !== AccountRole.MANAGER) throw new Unauthorized(GetAccountErrors.NO_RIGHT);
        const accountInfo = await AccountRepository.getAccountById(accountId);
        if (!accountInfo) throw new NotFoundError(GetAccountErrors.GET_FAIL);
        return res.onSuccess({
            _id: accountInfo._id,
            name: accountInfo.name,
            avatar: accountInfo.avatar,
            status: accountInfo.status,
            email: accountInfo.email,
            phone: accountInfo.phone,
        });
    } catch (error) {
        return res.onError(error);
    }
};

const updateInfo = async (req, res) => {
    const { jwt } = req.headers;
    const data = req.body;
    try {
        // Get more confiditons if has
        const authenData = VerifyToken(jwt);
        if (!authenData) throw new NotImplementError(UpdateAccountErrors.AUTH_FAIL);
        const updated = await AccountRepository.updateInfo(authenData.accountId, data);
        if (!updated) throw new NotImplementError(UpdateAccountErrors.UPDATED_FAILURE);
        const account = await AccountRepository.getAccountById(authenData.accountId);
        if (!account) throw new NotFoundError(UpdateAccountErrors.GET_FAIL);
        return res.onSuccess({
            _id: account._id,
            name: account.name,
            avatar: account.avatar,
            status: account.status,
            email: account.email,
            phone: account.phone,
        });
    } catch (error) {
        return res.onError(error);
    }
};

const changePassword = async (req, res) => {
    const { oldPassword, newPassword } = req.body;
    const { jwt } = req.headers;
    let existed;
    try {
        const authenData = VerifyToken(jwt);
        if (!authenData) throw new NotImplementError(ChangePasswordErrors.AUTH_FAIL);
        existed = await AccountRepository.isExistedAccount(authenData.accountId);
        if (!existed) throw new NotFoundError(ChangePasswordErrors.ACCOUNT_NEVER_EXIST);
        const isMatchPassword = await existed.comparePassword(oldPassword);
        if (!isMatchPassword) throw new ValidationError(ChangePasswordErrors.WRONG_PASSWORD);
        const result = await AccountRepository.changePassword(existed._id, newPassword);
        if (!result) throw new NotImplementError(ChangePasswordErrors.CHANGE_FAIL);
        const newJwt = GenerateToken(AccountRepository.getPayloadJwtSchema(existed));
        if (!newJwt) throw new NotImplementError(AccountLoginErrors.CREATE_TOKEN_FAIL);
        return res.onSuccess({ newJwt });
    } catch (error) {
        return res.onError(error);
    }
};

const blockUnblockAccount = async (req, res) => {
    const { jwt } = req.headers;
    const accountId = req.params.id;
    try {
        const authenData = VerifyToken(jwt);
        if (!authenData) throw new NotImplementError(BlockUnblockAccountErrors.AUTH_FAIL);
        if (authenData.role !== AccountRole.MANAGER) throw new Unauthorized(BlockUnblockAccountErrors.NO_RIGHT);
        const account = await AccountRepository.isExistedAccount(accountId);
        if (!account) throw new NotFoundError(BlockUnblockAccountErrors.NO_ACCOUNT);
        if (account.status === AccountStatus.ACTIVE) {
            const isBlock = await AccountRepository.blockAccount(accountId, AccountStatus.BLOCKED);
            if (!isBlock) throw new NotImplementError(BlockUnblockAccountErrors.BLOCK_FAIL);
        }
        if (account.status === AccountStatus.BLOCKED) {
            const isUnblock = await AccountRepository.unblockAccount(accountId, AccountStatus.ACTIVE);
            if (!isUnblock) throw new NotImplementError(BlockUnblockAccountErrors.UNBLOCK_FAIL);
        }
        const result = await AccountRepository.getAccountAfterBlock(accountId);
        if (!result) throw new NotFoundError(BlockUnblockAccountErrors.GET_FAIL);
        return res.onSuccess({
            _id: result._id,
            name: result.name,
            avatar: result.avatar,
            status: result.status,
            email: result.email,
            phone: result.phone,
        });
    } catch (error) {
        return res.onError(error);
    }
};

const deleteAccount = async (req, res) => {
    const { jwt } = req.headers;
    const accountId = req.params.id;
    try {
        const authenData = VerifyToken(jwt);
        if (!authenData) throw new NotImplementError(DeleteAccountErrors.AUTH_FAIL);
        if (authenData.role !== AccountRole.MANAGER) throw new Unauthorized(DeleteAccountErrors.NO_RIGHT);
        const result = await AccountRepository.deleteAccount(accountId);
        if (!result) throw new NotImplementError(DeleteAccountErrors.DELETE_FAIL);
        return res.onSuccess({ message: result });
    } catch (error) {
        return res.onError(error);
    }
};
export default {
    create,
    login,
    loginWithFacebook,
    loginWithGoogle,
    me,
    getAccounts,
    getAccount,
    updateInfo,
    changePassword,
    blockUnblockAccount,
    deleteAccount
};