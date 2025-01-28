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
exports.authServices = void 0;
const user_model_1 = require("../user/user.model");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = __importDefault(require("../../config"));
const AppError_1 = __importDefault(require("../../error/AppError"));
const http_status_codes_1 = require("http-status-codes");
const registerUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const password = yield bcrypt_1.default.hash(payload.password, 10);
    const regex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    const isValidEmail = regex.test(payload.email);
    if (!isValidEmail) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.FORBIDDEN, 'Invalid email');
    }
    const isExist = yield user_model_1.User.findOne({ email: payload.email });
    if (isExist) {
        throw new Error('This email is already used');
    }
    payload.password = password;
    const result = yield user_model_1.User.create(payload);
    return result;
});
const loginUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isUserExist = yield user_model_1.User.findOne({ email: payload.email });
    if (!isUserExist) {
        throw new Error('No user found');
    }
    const isPasswordSame = yield bcrypt_1.default.compare(payload.password, isUserExist.password);
    if (!isPasswordSame) {
        throw new Error('Incorrect password');
    }
    const jwtpayload = {
        _id: isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist._id,
        email: isUserExist.email,
        role: isUserExist.role,
    };
    const accessToken = jsonwebtoken_1.default.sign(jwtpayload, config_1.default.access_secret, {
        expiresIn: '10d',
    });
    const refreshToken = jsonwebtoken_1.default.sign(jwtpayload, config_1.default.access_secret, {
        expiresIn: '100d',
    });
    return {
        accessToken,
        refreshToken,
        user: {
            _id: isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist._id,
            email: isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist.email,
            role: isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist.role,
        },
    };
});
const getCurrentUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    console.log({ user });
    const currentUser = yield user_model_1.User.findById(user._id).select('-password').lean();
    if (!currentUser) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'User not found');
    }
    return currentUser;
});
exports.authServices = {
    registerUser,
    loginUser,
    getCurrentUser,
};
