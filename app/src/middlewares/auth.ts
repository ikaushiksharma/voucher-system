import { NextFunction, Request, Response } from 'express';
import { env } from '../../constants';

export default function authMiddleware() {
  return function (req: Request, res: Response, next: NextFunction) {
    if (env.API_PASSWORD && req.query.password === process.env.API_PASSWORD) {
      return next();
    } else {
      return res.status(401).json({
        message: 'Unauthorized access',
      });
    }
  };
}
