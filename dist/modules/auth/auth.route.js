"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoute = void 0;
const express_1 = require("express");
const auth_controller_1 = require("./auth.controller");
const authMiddleware_1 = __importDefault(require("../../middlewares/authMiddleware"));
// import refreshToken from '../../middlewares/generateRefreshToken';
const route = (0, express_1.Router)();
route.post('/register', auth_controller_1.authControllers.registerUser);
route.post('/login', auth_controller_1.authControllers.loginUser);
route.post('/logout', auth_controller_1.authControllers.logoutUser);
route.get('/me', authMiddleware_1.default, auth_controller_1.authControllers.getCurrentUser);
exports.authRoute = route;
