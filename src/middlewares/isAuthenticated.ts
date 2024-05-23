import jwt from 'jsonwebtoken';
import AsyncErrorHandler from '../utils/asyncErrorHandler';
import catchAsyncError from './catchAsyncError';
import { NextFunction, Response } from 'express';
import { Request } from '../../types/index';
import { getUserById } from '../services/user';

const isAuthenticatedUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { token } = req.cookies;
  if (!token) {
    return next(
      new AsyncErrorHandler('Please Login to access this resource', 401)
    );
  }

  const decodedData = jwt.verify(token, process.env.JWT_SECRET);

  req.user = await getUserById(decodedData.id);

  next();
};

export default isAuthenticatedUser;
