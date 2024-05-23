import { Router } from 'express';
import {
  listVouchers,
  getVoucherById,
  getVoucherBySlug,
  createVoucher,
  updateVoucher,
  deleteVoucher,
  applyVoucher,
} from '../controllers/voucher';
import isAdmin from '../middlewares/isAdmin';

const router = Router();

router.get('/all', listVouchers);
router.get('/:id', getVoucherById);
router.post('/:slug', getVoucherBySlug);
router.post('/', isAdmin, createVoucher);
router.put('/:id', isAdmin, updateVoucher);
router.delete('/:id', isAdmin, deleteVoucher);
router.get('/:voucherId/:cartId', applyVoucher);

export default router;
