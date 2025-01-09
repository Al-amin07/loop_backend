"use strict";
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
exports.textControllers = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const text_service_1 = require("./text.service");
const createText = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = req.body;
    const result = yield text_service_1.textServices.createTextIntoDB(payload);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Text created successfully',
        data: result,
    });
}));
const getAllText = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield text_service_1.textServices.getAllTextFromDB();
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Texts retrived successfully',
        data: result,
    });
}));
const updateText = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = req.body;
    const { id } = req.params;
    const result = yield text_service_1.textServices.updateTextFromDB(id, payload);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Text updated successfully',
        data: result,
    });
}));
exports.textControllers = {
    createText,
    updateText,
    getAllText,
};
