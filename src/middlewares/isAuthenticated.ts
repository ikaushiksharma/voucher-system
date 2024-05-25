import jwt, { JwtPayload } from 'jsonwebtoken';
import AsyncErrorHandler from '../utils/asyncErrorHandler';
import { NextFunction, Response } from 'express';
import { Request } from '../types/index';
import userService from '../services/user';
import catchAsyncError from './catchAsyncError';

const isAuthenticatedUser = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { token } = req.cookies;
    if (!token) {
      return next(
        new AsyncErrorHandler('Please Login to access this resource', 401)
      );
    }

    const decodedData = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload;
    const id = decodedData.id;

    req.user = await userService.getUserById(id);
    next();
  }
);
export default isAuthenticatedUser;
