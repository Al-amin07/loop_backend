import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { textServices } from './text.service';

const createText = catchAsync(async (req, res) => {
  const payload = req.body;
  const result = await textServices.createTextIntoDB(payload);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Text created successfully',
    data: result,
  });
});
const getAllText = catchAsync(async (req, res) => {
  const result = await textServices.getAllTextFromDB();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Texts retrived successfully',
    data: result,
  });
});
const updateText = catchAsync(async (req, res) => {
  const payload = req.body;
  const { id } = req.params;
  const result = await textServices.updateTextFromDB(id, payload);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Text updated successfully',
    data: result,
  });
});

export const textControllers = {
  createText,
  updateText,
  getAllText,
};
