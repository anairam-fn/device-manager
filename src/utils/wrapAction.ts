import { Request, Response, NextFunction } from 'express';

const wrapAction = (action: any) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { statusCode, body } = await action(req);

    res.status(statusCode).send(body);
  } catch (error) {

    next(error);
  }
};

export { wrapAction };