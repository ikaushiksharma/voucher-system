import { Router } from 'express';
import { listVouchers } from '../controllers/voucher';
import isAuthenticatedUser from '../middlewares/isAuthenticated';

const router = Router();
router.get('/all', isAuthenticatedUser, listVouchers);
// router.get('/:id', authMiddleware, voucherController.read);
// router.post('', authMiddleware, voucherController.create);
// router.put('/:id', authMiddleware, voucherController.update);
// router.delete('/:id', authMiddleware, voucherController.delete);
export default router;
