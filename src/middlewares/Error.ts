import { NextFunction, Response } from 'express';
import AsyncErrorHandler from '../utils/asyncErrorHandler';
import { Request } from '../../types';
const errorMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || 'Internal Server Error';

  // Wrong JWT error
  if (err.name === 'JsonWebTokenError') {
    const message = `Json Web Token is invalid, Try again `;
    err = new AsyncErrorHandler(message, 400);
  }

  // JWT EXPIRE error
  if (err.name === 'TokenExpiredError') {
    const message = `Json Web Token is Expired, Try again `;
    err = new AsyncErrorHandler(message, 400);
  }
  res.status(err.statusCode).json({
    success: false,
    error: err.message,
  });
};

export default errorMiddleware;
