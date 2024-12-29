import { NextFunction, Request, Response } from 'express';

const globalErrorHander = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
): any => {
  let statusCode = 500;
  let message = 'Something went wrong';
  res.status(statusCode).json({
    success: false,
    message,
    err,
  });
};

export default globalErrorHander;
