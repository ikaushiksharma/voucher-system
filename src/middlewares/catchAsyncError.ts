import { NextFunction } from 'express';

export default (theFunc: Function) =>
  (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(theFunc(req, res, next)).catch(next);
  };
