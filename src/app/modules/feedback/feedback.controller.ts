import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { feedbackServices } from './feedback.service';

const createFeedback = catchAsync(async (req, res) => {
  const payload = req.body;
  const result = await feedbackServices.createfeedbackIntoDB(payload);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Feedback created successfully',
    data: result,
  });
});
const getAllFeedback = catchAsync(async (req, res) => {
  const result = await feedbackServices.getFeedbackFromDB();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Feedbacks retrived successfully',
    data: result,
  });
});

export const feedbackControlles = {
  createFeedback,
  getAllFeedback,
};
