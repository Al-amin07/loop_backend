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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const user_model_1 = require("../modules/user/user.model");
const authMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const token = (_a = req === null || req === void 0 ? void 0 : req.cookies) === null || _a === void 0 ? void 0 : _a.accessToken;
        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'No token provided',
            });
        }
        const decoded = jsonwebtoken_1.default.verify(token, config_1.default.access_secret);
        const user = yield user_model_1.User.findOne({
            email: decoded === null || decoded === void 0 ? void 0 : decoded.email,
        })
            .select('-password')
            .lean();
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'User not found',
            });
        }
        req.user = user;
        next();
    }
    catch (error) {
        return res.status(401).json({
            success: false,
            message: (error === null || error === void 0 ? void 0 : error.message) || 'Invalid token',
        });
    }
});
exports.default = authMiddleware;
