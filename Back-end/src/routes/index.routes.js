import express from 'express';
import AccountRouter from './account.routes'

const router = express.Router();

router.use('/v1', AccountRouter);

export default router;