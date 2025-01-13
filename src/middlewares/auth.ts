import jwt, { JwtPayload } from 'jsonwebtoken';

import catchAsync from '../utils/catchAsync';
import config from '../config';
import { NextFunction, Request, Response } from 'express';
import AppError from '../error/AppError';

type TUserRole = 'admin' | 'user';

const auth = (role: TUserRole) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req?.cookies?.accessToken;

    if (!token) {
      throw new AppError(403, 'You are not authorize');
    }
    const decoded = jwt.verify(token, config.access_secret as string);
    req.user = decoded as JwtPayload;
    if (role !== (decoded as JwtPayload).role) {
      throw new AppError(403, 'Unauthorize access!!!');
    }

    next();
  });
};

export default auth;
