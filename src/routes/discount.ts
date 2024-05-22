import { Router } from 'express';
import isAuthenticatedUser from '../middlewares/isAuthenticated';
import discountController from '../controllers/discount';

const router = Router();
router.get('/all', isAuthenticatedUser, discountController.list);
// router.get('/:id', authMiddleware, voucherController.read);
// router.post('', authMiddleware, voucherController.create);
// router.put('/:id', authMiddleware, voucherController.update);
// router.delete('/:id', authMiddleware, voucherController.delete);
export default router;
