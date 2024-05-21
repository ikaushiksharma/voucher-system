import express from 'express';
import discountController from '../controllers/discount';
import authMiddleware from '../middlewares/auth';

export default function discountRoute() {
  const router = express.Router();
  router.get('/api/discounts', authMiddleware, discountController.list);
  router.get('/api/discounts/:id', authMiddleware, discountController.read);
  router.post('/api/discounts', authMiddleware, discountController.create);
  router.put('/api/discounts/:id', authMiddleware, discountController.update);
  router.delete(
    '/api/discounts/:id',
    authMiddleware,
    discountController.delete
  );
}
