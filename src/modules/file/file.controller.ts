/* eslint-disable @typescript-eslint/no-explicit-any */

import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { fileServices } from './file.service';
// import { IFile } from './file.interface';

const uploadFile = catchAsync(async (req, res) => {
  const { user_id, fileName, contentType, fileType } = req.body;
  const file = req.file;
  console.log({ file, user_id, fileName, fileType, contentType });
  if (!file) {
    return sendResponse(res, {
      success: false,
      statusCode: 400,
      message: 'No file provided',
      data: null,
    });
  }

  // Validate file type
  const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
  if (!allowedTypes.includes(contentType)) {
    return sendResponse(res, {
      success: false,
      statusCode: 400,
      message: 'Invalid file type. Only PDF, JPG, and PNG files are allowed.',
      data: null,
    });
  }

  try {
    const fileData: any = {
      user_id,
      fileName,
      fileType,
      contentType,
      data: file.buffer,
    };

    const result = await fileServices.uploadFile(fileData);

    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: 'File uploaded successfully',
      data: result,
    });
  } catch (error: any) {
    sendResponse(res, {
      success: false,
      statusCode: 500,
      message: error.message || 'Failed to upload file',
      data: null,
    });
  }
});

const getAllFile = catchAsync(async (req, res) => {
  const result = await fileServices.getAllFile();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Files retrived successfully',
    data: result,
  });
});
const getHeaderFile = catchAsync(async (req, res) => {
  console.log(req.header);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Files retrived successfully',
    data: 'sf',
  });
});
const getUserAllFile = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await fileServices.getUserAllFile(id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Files retrived successfully',
    data: result,
  });
});
const updateFile = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await fileServices.updateFile(id, req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Files updated successfully',
    data: result,
  });
});

export const fileControllers = {
  uploadFile,
  getUserAllFile,
  getAllFile,
  updateFile,
  getHeaderFile,
};
