import { NextFunction, Request, Response } from 'express';
import ResponseHandler from '../utils/responseHandler';
import catchAsyncError from './catchAsyncError';
import userService from '../services/user';

const isAdmin = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    if (req.body.userId) {
      const user = await userService.getUserById(req.body.userId);
      if (user.role === 'ADMIN') {
        next();
      } else {
        res
          .status(403)
          .json(
            new ResponseHandler(403, null, 'Unauthorized access. Admin only.')
          );
      }
    } else {
      res
        .status(403)
        .json(
          new ResponseHandler(403, null, 'Unauthorized access. Admin only.')
        );
    }
  }
);

export default isAdmin;
