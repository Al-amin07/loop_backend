import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { paymentServices } from './payment.service';

const createPayment = catchAsync(async (req, res) => {
  const result = await paymentServices.createpayment(req?.body);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'payment created successfully',
    data: result,
  });
});
const getAllPayment = catchAsync(async (req, res) => {
  const result = await paymentServices.getAllPayment();
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'payments retrived successfully',
    data: result,
  });
});
const getUserAllPayment = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await paymentServices.getUserAllPayment(id);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'payments retrived successfully',
    data: result,
  });
});
const getClientSecret = catchAsync(async (req, res) => {
  const payload = req.body;
  const result = await paymentServices.getClientSecret(payload);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'client sceret retrived successfully',
    data: result,
  });
});
const updatePayment = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await paymentServices.updatePayment(id, req?.body);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'payment updated successfully',
    data: result,
  });
});

export const paymentControllers = {
  createPayment,
  getAllPayment,
  updatePayment,
  getUserAllPayment,
  getClientSecret,
};
