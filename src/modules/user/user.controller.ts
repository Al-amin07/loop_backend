import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { userServices } from './user.service';

const getAllUser = catchAsync(async (req, res) => {
  const result = await userServices.getAllUser();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Retrived all user',
    data: result,
  });
});

export const userControllers = {
  getAllUser,
};
