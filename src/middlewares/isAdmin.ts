import { NextFunction, Response } from 'express';
import { Request } from '../types';
import catchAsyncError from './catchAsyncError';
import AsyncErrorHandler from '../utils/asyncErrorHandler';
import { getUserById } from '../controllers/user';
import userService from '../services/user';

const isAdmin = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await userService.getUserById(req.user.id);
    if (user.role !== 'ADMIN') {
      return next(
        new AsyncErrorHandler('Unauthorized access. Admin only.', 403)
      );
    }
    next();
  }
);

export default isAdmin;
