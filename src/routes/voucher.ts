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

router.post('/create', isAdmin, createVoucher);
router.get('/all', listVouchers);
router.get('get-by-id/:id', getVoucherById);
router.get('get-by-slug/:slug', getVoucherBySlug);
router.put('/:id', isAdmin, updateVoucher);
router.delete('/:id', isAdmin, deleteVoucher);
router.get('/:voucherId/:cartId', applyVoucher);

export default router;
