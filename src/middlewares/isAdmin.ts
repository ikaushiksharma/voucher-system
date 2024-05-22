import { NextFunction, Request, Response } from 'express';
import ResponseHandler from '../utils/responseHandler';
import prisma from '../../lib/prisma';
import catchAsyncError from './catchAsyncError';

const isUserAdmin = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    if (req.body.userId) {
      const user = await prisma.user.findUnique({
        where: {
          id: req.body.userId,
        },
      });
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

export { isUserAdmin };
