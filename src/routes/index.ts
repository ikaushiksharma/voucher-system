import express from 'express';
import voucherRoute from './voucher';
import userRoute from './user';
import isAuthenticatedUser from '../middlewares/isAuthenticated';

const router = express.Router();

router.use('/user', userRoute);
router.use('/voucher', isAuthenticatedUser, voucherRoute);

export default router;
