import express from 'express';
import discountController from '../controllers/discount';
import authMiddleware from '../middlewares/isAuthenticated';

export default function discountRoute() {
  const router = express.Router();
  router.get('/', authMiddleware, discountController.list);
  // router.get('/:id', authMiddleware, discountController.read);
  // router.post('/', authMiddleware, discountController.create);
  // router.put('/:id', authMiddleware, discountController.update);
  // router.delete('/:id', authMiddleware, discountController.delete);
}
