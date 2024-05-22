import express from 'express';
import authMiddleware from '../middlewares/isAuthenticated';
import discountRoute from './discount';
import voucherRoute from './voucher';

const router = express.Router();
router.use('/discounts', discountRoute);
router.use('/vouchers', voucherRoute);

export default router;
