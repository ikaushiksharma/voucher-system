import express from 'express';
import discountController from '../controllers/discount';
import authMiddleware from '../middlewares/auth';

export default function voucherRoute() {
  const router = express.Router();
  router.get('/vouchers', authMiddleware, voucherController.list);
  router.get('/vouchers/:id', authMiddleware, voucherController.read);
  router.post('/vouchers', authMiddleware, voucherController.create);
  router.put('/vouchers/:id', authMiddleware, voucherController.update);
  router.delete('/vouchers/:id', authMiddleware, voucherController.delete);
}
