import express from 'express';
import AccountController from '../modules/account-module/controllers/account.controller'

const router = express.Router();

router.post('/account', AccountController.create);

export default router;