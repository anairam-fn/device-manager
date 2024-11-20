import { Request, Response, NextFunction } from 'express';
import HttpError from '../exceptions/Http';

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof HttpError) {
    return res.status(err.code).json({ message: err.message });
  }

  res.status(500).json({ message: 'Internal Server Error' });
};
