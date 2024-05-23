import { NextFunction, Response } from 'express';
import { Request } from '../types';

export default (theFunc: Function) =>
  (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(theFunc(req, res, next)).catch(next);
  };
