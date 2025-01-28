"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.join(process.cwd(), '.env') });
exports.default = {
    db_url: process.env.DB_URL,
    port: process.env.PORT,
    access_secret: process.env.ACCESS_SECRET,
    NODE_ENV: process.env.NODE_ENV,
    stript_secret: process.env.STRIPE_SECRET,
    paypal_secret: process.env.PAYPAL_SECERT_KEY,
    paypal_client_id: process.env.PAYPAL_CLIENT_ID,
    send_box_url: process.env.SEND_BOX_URL,
};
