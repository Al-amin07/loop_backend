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
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentServices = void 0;
const app_1 = require("../../app");
const payment_model_1 = require("./payment.model");
const getClientSecret = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const paymentIntent = yield app_1.stripe.paymentIntents.create({
        amount: Math.round((payload === null || payload === void 0 ? void 0 : payload.amount) * 100), // Stripe expects amounts in cents
        currency: 'usd',
        metadata: {
            title: payload === null || payload === void 0 ? void 0 : payload.title,
            // user_id: payload?.user_id,
        },
    });
    // Save payment request to database
    // return result;
    console.log('cl ', paymentIntent.client_secret);
    return paymentIntent.client_secret;
});
const createpayment = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield payment_model_1.Payment.create(payload);
    return result;
});
const getAllPayment = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield payment_model_1.Payment.find({}).populate('user_id');
    return result;
});
const getUserAllPayment = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield payment_model_1.Payment.find({ user_id: id }).populate('user_id');
    return result;
});
const updatePayment = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield payment_model_1.Payment.findByIdAndUpdate(id, payload, { new: true });
    return result;
});
exports.paymentServices = {
    createpayment,
    getAllPayment,
    updatePayment,
    getUserAllPayment,
    getClientSecret,
};
