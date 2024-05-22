import jwt from 'jsonwebtoken';
import AsyncErrorHandler from '../utils/asyncErrorHandler';
import catchAsyncError from './catchAsyncError';
import prisma from '../../lib/prisma';

export const isAuthenticatedUser = catchAsyncError(async (req, res, next) => {
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
});
