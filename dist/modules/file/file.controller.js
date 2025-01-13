"use strict";
/* eslint-disable @typescript-eslint/no-explicit-any */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileControllers = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const file_service_1 = require("./file.service");
const uploadFile = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user_id, fileName, contentType, fileType } = req.body;
    const file = req.file;
    console.log({ file, user_id, fileName, fileType, contentType });
    if (!file) {
        return (0, sendResponse_1.default)(res, {
            success: false,
            statusCode: 400,
            message: 'No file provided',
            data: null,
        });
    }
    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
    if (!allowedTypes.includes(contentType)) {
        return (0, sendResponse_1.default)(res, {
            success: false,
            statusCode: 400,
            message: 'Invalid file type. Only PDF, JPG, and PNG files are allowed.',
            data: null,
        });
    }
    try {
        const fileData = {
            user_id,
            fileName,
            fileType,
            contentType,
            data: file.buffer,
        };
        const result = yield file_service_1.fileServices.uploadFile(fileData);
        (0, sendResponse_1.default)(res, {
            success: true,
            statusCode: 200,
            message: 'File uploaded successfully',
            data: result,
        });
    }
    catch (error) {
        (0, sendResponse_1.default)(res, {
            success: false,
            statusCode: 500,
            message: error.message || 'Failed to upload file',
            data: null,
        });
    }
}));
const getAllFile = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield file_service_1.fileServices.getAllFile();
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Files retrived successfully',
        data: result,
    });
}));
const getUserAllFile = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield file_service_1.fileServices.getUserAllFile(id);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Files retrived successfully',
        data: result,
    });
}));
const updateFile = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield file_service_1.fileServices.updateFile(id, req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Files updated successfully',
        data: result,
    });
}));
exports.fileControllers = {
    uploadFile,
    getUserAllFile,
    getAllFile,
    updateFile,
};
