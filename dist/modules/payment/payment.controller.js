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
exports.paymentControllers = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const payment_service_1 = require("./payment.service");
const createPayment = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield payment_service_1.paymentServices.createpayment(req === null || req === void 0 ? void 0 : req.body);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: 'payment created successfully',
        data: result,
    });
}));
const getAllPayment = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield payment_service_1.paymentServices.getAllPayment();
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: 'payments retrived successfully',
        data: result,
    });
}));
const getUserAllPayment = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield payment_service_1.paymentServices.getUserAllPayment(id);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: 'payments retrived successfully',
        data: result,
    });
}));
const getClientSecret = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = req.body;
    const result = yield payment_service_1.paymentServices.getClientSecret(payload);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: 'client sceret retrived successfully',
        data: result,
    });
}));
const updatePayment = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield payment_service_1.paymentServices.updatePayment(id, req === null || req === void 0 ? void 0 : req.body);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: 'payment updated successfully',
        data: result,
    });
}));
exports.paymentControllers = {
    createPayment,
    getAllPayment,
    updatePayment,
    getUserAllPayment,
    getClientSecret,
};
