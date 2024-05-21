import express from 'express';
import authController from '../controllers/auth';
import voucherController from '../controllers/voucher';
import discountController from '../controllers/discount';

export default function (app: express.Application) {
  const router = express.Router();
  app.use('/', router);

  router.get(
    '/api/vouchers',
    authController.isAuthenticated,
    voucherController.list
  );
  router.get(
    '/api/vouchers/:id',
    authController.isAuthenticated,
    voucherController.read
  );
  router.post(
    '/api/vouchers',
    authController.isAuthenticated,
    voucherController.create
  );
  router.put(
    '/api/vouchers/:id',
    authController.isAuthenticated,
    voucherController.update
  );
  router.delete(
    '/api/vouchers/:id',
    authController.isAuthenticated,
    voucherController.delete
  );

  router.get(
    '/api/discounts',
    authController.isAuthenticated,
    discountController.list
  );
  router.get(
    '/api/discounts/:id',
    authController.isAuthenticated,
    discountController.read
  );
  router.post(
    '/api/discounts',
    authController.isAuthenticated,
    discountController.create
  );
  router.put(
    '/api/discounts/:id',
    authController.isAuthenticated,
    discountController.update
  );
  router.delete(
    '/api/discounts/:id',
    authController.isAuthenticated,
    discountController.delete
  );
}
