import { Router } from 'express';
import { listVouchers } from '../controllers/voucher';
import isAuthenticatedUser from '../middlewares/isAuthenticated';
import isAdmin from '../middlewares/isAdmin';
import {
  deleteUser,
  getUserById,
  listAllUsers,
  loginUser,
  registerUser,
  updateUser,
} from '../controllers/user';

const router = Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/all', isAuthenticatedUser, isAdmin, listAllUsers);
router.get('/:id', isAuthenticatedUser, isAdmin, getUserById);
router.put('/:id', isAuthenticatedUser, isAdmin, updateUser);
router.delete('/:id', isAuthenticatedUser, isAdmin, deleteUser);

export default router;
