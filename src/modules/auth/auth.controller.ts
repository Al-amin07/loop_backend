import config from '../../config';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { authServices } from './auth.service';

const registerUser = catchAsync(async (req, res) => {
  const payload = req.body;
  console.log({ payload });
  const result = await authServices.registerUser(payload);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'User created successfully',
    data: result,
  });
});

const loginUser = catchAsync(async (req, res) => {
  const payload = req.body;
  const result = await authServices.loginUser(payload);
  res.cookie('accessToken', result.accessToken, {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
  });
  res.cookie('refreshToken', result.refreshToken, {
    secure: config.NODE_ENV === 'production',
    httpOnly: true,
  });
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: result?.accessToken as string,
    data: result.user,
  });
});

const logoutUser = catchAsync(async (req, res) => {
  res.clearCookie('accessToken');
  res.clearCookie('refreshToken');
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'User logged out successfully',
    data: '',
  });
});

const getCurrentUser = catchAsync(async (req, res) => {
  const result = await authServices.getCurrentUser(req.user);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'retrived current user',
    data: result,
  });
});

export const authControllers = {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUser,
};
