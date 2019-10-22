import express from 'express';
import AccountController from '../modules/account-module/controllers/account.controller';
import AccountValidate from '../modules/account-module/middleware/account.middleware';

const router = express.Router();

// Create use routers
// POST
// Create account
router.post('/account', AccountValidate.createAccountInput, AccountController.create);
// login account
router.post('/account/login', AccountValidate.logInAccountInput, AccountController.login);
//login with facebook
router.post('/account/login/facebook', AccountValidate.loginWithFacebookInput, AccountValidate.reduceInput, AccountController.loginWithFacebook);
//login with google
router.post('/account/login/google', AccountValidate.loginWithGoogleInput, AccountValidate.reduceInput, AccountController.loginWithGoogle);

// GET
//lấy thông tin của chính bản thân
router.get('/account/me', AccountValidate.meInput, AccountController.me);
//lấy danh sách account trong hệ thống (by admin)
router.get('/accounts', AccountValidate.getAccountsInput, AccountController.getAccounts);
//lấy thông tin của 1 account bất kì trong hệ thống
router.get('/account/:id', AccountValidate.getAccountInput, AccountController.getAccount);

// PUT
//thay đổi thông tin của account (name, phone)
router.put('/account', AccountValidate.updateAccountInput, AccountValidate.reduceInput, AccountController.updateInfo);
//thay đổi password của account khi đã đăng nhập vào
router.put('/account/changepassword', AccountValidate.changePasswordInput, AccountController.changePassword);
//block-unblock account đối với các bài viết (by admin)
router.put('/account/block-unblock/:id', AccountValidate.blockUnblockAccountInput, AccountController.blockUnblockAccount);

// DELETE
router.delete('/account/:id', AccountValidate.deleteAccountInput, AccountController.deleteAccount);

export default router;
