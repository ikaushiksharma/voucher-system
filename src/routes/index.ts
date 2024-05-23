import express from 'express';
import authMiddleware from '../middlewares/isAuthenticated';
import discountRoute from './discount';
import voucherRoute from './voucher';
import isAuthenticatedUser from '../middlewares/isAuthenticated';

const router = express.Router();
router.use('/discounts', discountRoute);
router.use('/vouchers', isAuthenticatedUser, voucherRoute);

export default router;
