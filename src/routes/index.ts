import express from 'express';
import authMiddleware from '../middlewares/isAuthenticated';
import voucherController from '../controllers/voucher';
import discountRoute from './discount';
import voucherRoute from './voucher';
export default function (app: express.Application) {
  const router = express.Router();
  app.use('/api', router);

  router.use('/discounts', discountRoute);
  router.use('/vouchers', voucherRoute);
}
