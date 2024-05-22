import jwt from 'jsonwebtoken';
import AsyncErrorHandler from '../utils/asyncErrorHandler';
import catchAsyncError from './catchAsyncError';
import prisma from '../../lib/prisma';
import { NextFunction, Response } from 'express';
import { Request } from '../../types/index';

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

  req.user = await prisma.user.findUnique({
    where: {
      id: decodedData.id,
    },
  });

  next();
};

export default isAuthenticatedUser;
