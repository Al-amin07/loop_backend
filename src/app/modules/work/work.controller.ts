import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { workServices } from './work.service';

const createWork = catchAsync(async (req, res) => {
  const payload = req.body;
  const result = await workServices.createWorkIntoDB(payload);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Work create successfully',
    data: result,
  });
});
const getAllWork = catchAsync(async (req, res) => {
  const result = await workServices.getAllWorkFromDB();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Works retrived successfully',
    data: result,
  });
});

export const workControllers = {
  createWork,
  getAllWork,
};
