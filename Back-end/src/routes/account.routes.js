import express from 'express';
import AccountController from '../modules/account-module/controllers/account.controller';
import AccountValidate from '../modules/account-module/middleware/account.middleware';

const router = express.Router();

// Create use routers
// POST
router.post('/account', AccountValidate.createAccountInput, AccountController.create);
router.post('/account/login', AccountValidate.logInAccountInput, AccountController.login);
router.post('/account/login/facebook', AccountValidate.loginWithFacebookInput, AccountValidate.reduceInput, AccountController.loginWithFacebook);
router.post('/account/login/google', AccountValidate.loginWithGoogleInput, AccountValidate.reduceInput, AccountController.loginWithGoogle);

// GET
router.get('/account/me', AccountValidate.meInput, AccountController.me);
router.get('/accounts', AccountValidate.getAccountsInput, AccountController.getAccounts);
router.get('/account/:id', AccountValidate.getAccountInput, AccountController.getAccount);

// PUT
router.put('/account', AccountValidate.updateAccountInput, AccountValidate.reduceInput, AccountController.updateInfo);
router.put('/account/changepassword', AccountValidate.changePasswordInput, AccountController.changePassword);
router.put('/account/block-unblock/:id', AccountValidate.blockUnblockAccountInput, AccountController.blockUnblockAccount);

// DELETE
router.delete('/account/:id', AccountValidate.deleteAccountInput, AccountController.deleteAccount);

export default router;
