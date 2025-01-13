import { ILogin, IUser } from '../user/user.interface';
import { User } from '../user/user.model';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import config from '../../config';
import AppError from '../../error/AppError';
import { StatusCodes } from 'http-status-codes';

const registerUser = async (payload: IUser) => {
  const password = await bcrypt.hash(payload.password, 10);

  const regex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
  const isValidEmail = regex.test(payload.email);
  if (!isValidEmail) {
    throw new AppError(StatusCodes.FORBIDDEN, 'Invalid email');
  }

  const isExist = await User.findOne({ email: payload.email });
  if (isExist) {
    throw new Error('This email is already used');
  }
  payload.password = password;
  const result = await User.create(payload);
  return result;
};
const loginUser = async (payload: ILogin) => {
  const isUserExist = await User.findOne({ email: payload.email });
  if (!isUserExist) {
    throw new Error('No user found');
  }
  const isPasswordSame = await bcrypt.compare(
    payload.password,
    isUserExist.password,
  );

  if (!isPasswordSame) {
    throw new Error('Incorrect password');
  }
  const jwtpayload = {
    email: isUserExist.email,
    role: isUserExist.role,
  };
  const accessToken = jwt.sign(jwtpayload, config.access_secret as string, {
    expiresIn: '10d',
  });
  const refreshToken = jwt.sign(jwtpayload, config.access_secret as string, {
    expiresIn: '100d',
  });
  return {
    accessToken,
    refreshToken,
    user: {
      _id: isUserExist?._id,
      email: isUserExist?.email,
      role: isUserExist?.role,
    },
  };
};

const getCurrentUser = async (user: Partial<IUser>) => {
  console.log({ user });
  const currentUser = await User.findById(user._id).select('-password').lean();

  if (!currentUser) {
    throw new AppError(StatusCodes.NOT_FOUND, 'User not found');
  }

  return currentUser;
};

export const authServices = {
  registerUser,
  loginUser,
  getCurrentUser,
};
