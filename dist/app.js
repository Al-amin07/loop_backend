"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.stripe = exports.upload = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./routes"));
const globalErrorHandler_1 = __importDefault(require("./middlewares/globalErrorHandler"));
const notFound_1 = __importDefault(require("./middlewares/notFound"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const stripe_1 = __importDefault(require("stripe"));
const config_1 = __importDefault(require("./config"));
const multer_1 = __importDefault(require("multer"));
exports.upload = (0, multer_1.default)({ storage: multer_1.default.memoryStorage() });
exports.stripe = new stripe_1.default(config_1.default.stript_secret);
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: ['http://localhost:5173', 'https://lo-op.netlify.app'],
    credentials: true,
}));
app.use((0, cookie_parser_1.default)());
app.get('/', (req, res) => {
    res.json({
        success: true,
        message: 'Hello World',
    });
});
app.use('/api', routes_1.default);
app.use(globalErrorHandler_1.default);
app.use(notFound_1.default);
exports.default = app;
