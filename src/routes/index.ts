import express from 'express';
import voucherRoute from './voucher';
import userRoute from './user';
import isAuthenticatedUser from '../middlewares/isAuthenticated';

const router = express.Router();

router.use('/user', userRoute);
router.use('/vouchers', isAuthenticatedUser, voucherRoute);

export default router;
