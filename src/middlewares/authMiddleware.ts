/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import { User } from '../modules/user/user.model';

const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<any> => {
  try {
    const token = req?.cookies?.accessToken;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'No token provided',
      });
    }

    const decoded = jwt.verify(token, config.access_secret as string);

    const user = await User.findOne({
      email: (decoded as JwtPayload)?.email,
    })
      .select('-password')
      .lean();

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'User not found',
      });
    }

    req.user = user;
    next();
  } catch (error: any) {
    return res.status(401).json({
      success: false,
      message: error?.message || 'Invalid token',
    });
  }
};

export default authMiddleware;
