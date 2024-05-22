import express from 'express';
import voucherController from '../controllers/voucher';
import authMiddleware from '../middlewares/auth';

export default function voucherRoute() {
  const router = express.Router();
  router.get('', authMiddleware, voucherController.list);
  // router.get('/:id', authMiddleware, voucherController.read);
  // router.post('', authMiddleware, voucherController.create);
  // router.put('/:id', authMiddleware, voucherController.update);
  // router.delete('/:id', authMiddleware, voucherController.delete);
}
