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
exports.paypalController = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const axios_1 = __importDefault(require("axios"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const generatePaypalToken_1 = require("../../utils/generatePaypalToken");
const config_1 = __importDefault(require("../../config"));
const getInvoice_1 = require("../../utils/getInvoice");
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const getToken = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, generatePaypalToken_1.getAccessToken)();
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: 'Token generated',
        data: result,
    });
}));
const createOrder = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { title, amount } = req.body;
    const token = yield (0, generatePaypalToken_1.getAccessToken)();
    const invoiceId = `INV-${Date.now()}`;
    const response = yield axios_1.default.post(`${config_1.default.send_box_url}/v2/checkout/orders`, {
        intent: 'CAPTURE',
        payment_source: {
            paypal: {
                experience_context: {
                    payment_method_preference: 'IMMEDIATE_PAYMENT_REQUIRED',
                    payment_method_selected: 'PAYPAL',
                    //   landing_page: 'LOGIN',
                    brand_name: 'Adaptify Loop',
                    shipping_preference: 'NO_SHIPPING',
                    user_action: 'PAY_NOW',
                    return_url: 'https://lo-op.netlify.app/complete-order',
                    cancel_url: 'https://lo-op.netlify.app/cancle-order',
                },
            },
        },
        purchase_units: [
            {
                invoice_id: invoiceId,
                amount: {
                    currency_code: 'USD',
                    value: amount,
                    breakdown: {
                        item_total: {
                            currency_code: 'USD',
                            value: amount,
                        },
                    },
                },
                items: [
                    {
                        name: title,
                        description: 'A high-quality ballpoint pen',
                        unit_amount: {
                            currency_code: 'USD',
                            value: amount,
                        },
                        quantity: '1',
                    },
                ],
            },
        ],
    }, {
        headers: {
            'Content-Type': 'application/json',
            //   'PayPal-Request-Id': 'unique-request-id-12345',
            Authorization: `Bearer ${token}`,
        },
    });
    const orderId = (_a = response === null || response === void 0 ? void 0 : response.data) === null || _a === void 0 ? void 0 : _a.id;
    res.json({ orderId, invoiceId });
}));
const capturePayment = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = yield (0, generatePaypalToken_1.getAccessToken)();
    const { paymentId } = req.params;
    console.log({ token, paymentId });
    const response = yield axios_1.default.post(`${config_1.default.send_box_url}/v2/checkout/orders/${paymentId}`, 
    // `${config.send_box_url}/v2/checkout/orders/${paymentId}/capture`,
    {}, // Empty body
    {
        headers: {
            'Content-Type': 'application/json',
            // 'PayPal-Request-Id': paymentId,
            Authorization: `Bearer ${token}`,
        },
    });
    console.log('Order Captured:', response.data);
    res.json({ token, paymentId, data: response === null || response === void 0 ? void 0 : response.data });
}));
const capturePayment2 = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    try {
        const token = yield (0, generatePaypalToken_1.getAccessToken)();
        const { paymentId } = req.params;
        // Get order details to check the invoice ID
        // const orderDetails = await axios.get(
        //   `${config.send_box_url}/v2/checkout/orders/${paymentId}`,
        //   {
        //     headers: {
        //       Authorization: `Bearer ${token}`,
        //     },
        //   },
        // );
        // const invoiceId = orderDetails.data?.purchase_units[0]?.invoice_id;
        // console.log('Invoice ID:', invoiceId);
        // if (!invoiceId) {
        //   return res.status(400).json({
        //     error: 'Invoice ID not found for the order.',
        //   });
        // }
        // Capture the payment
        const response = yield axios_1.default.post(`${config_1.default.send_box_url}/v2/checkout/orders/${paymentId}/capture`, {}, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });
        console.log('Order Captured:', response.data);
        const result = yield (0, getInvoice_1.createinvoice)(token, paymentId, response === null || response === void 0 ? void 0 : response.data);
        res.json({ token, paymentId, data: response === null || response === void 0 ? void 0 : response.data, result });
    }
    catch (error) {
        const err = ((_a = error.response) === null || _a === void 0 ? void 0 : _a.data) || error.message;
        console.error('Error:', err);
        if (((_c = (_b = err.details) === null || _b === void 0 ? void 0 : _b[0]) === null || _c === void 0 ? void 0 : _c.issue) === 'DUPLICATE_INVOICE_ID') {
            return res.status(422).json({
                error: 'Duplicate Invoice ID detected. Please use a unique invoice ID.',
            });
        }
        res.status(((_d = error.response) === null || _d === void 0 ? void 0 : _d.status) || 500).json({
            error: err,
        });
    }
});
const getInvoice = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { invoiceId } = req.params;
    const result = yield (0, getInvoice_1.getInvoicePDF)(invoiceId);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: 'f',
        data: result,
    });
}));
const getSingleInvoice = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { invoiceId } = req.params;
    const accessToken = yield (0, generatePaypalToken_1.getAccessToken)();
    console.log({ invoiceId, accessToken });
    const response = yield axios_1.default.get(`${config_1.default.send_box_url}/v2/invoicing/invoices/${invoiceId}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        },
    });
    console.log('oo', response.data);
    (0, sendResponse_1.default)(res, {
        success: true,
        message: 'Single invoice fetched',
        statusCode: 200,
        data: response.data,
    });
}));
const getAllInvoices = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const accessToken = yield (0, generatePaypalToken_1.getAccessToken)();
        const response = yield axios_1.default.get(`${config_1.default.send_box_url}/v2/invoicing/invoices?total_required=true`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
        });
        // console.log(response.data);
        (0, sendResponse_1.default)(res, {
            success: true,
            message: 'All invoices fetched',
            statusCode: 200,
            data: response.data,
        }); // Logs the invoice data
    }
    catch (error) {
        console.error('Error fetching invoices:', ((_a = error.response) === null || _a === void 0 ? void 0 : _a.data) || error.message);
        next(error);
    }
});
// const getSingleInvoice = async (req, res, next) => {
//   try {
//     const { invoiceId } = req.params;
//     const accessToken = await getAccessToken();
//     const response = await axios.get(
//       `${config.send_box_url}/v2/invoicing/invoices/${invoiceId}`,
//       {
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//           'Content-Type': 'application/json',
//         },
//       },
//     );
//     // console.log(response.data);
//     sendResponse(res, {
//       success: true,
//       message: 'invoice fetched',
//       statusCode: 200,
//       data: response.data,
//     }); // Logs the invoice data
//   } catch (error: any) {
//     console.error(
//       'Error fetching invoices:',
//       error.response?.data || error.message,
//     );
//     next(error);
//   }
// };
exports.paypalController = {
    createOrder,
    capturePayment,
    capturePayment2,
    getInvoice,
    getAllInvoices,
    getSingleInvoice,
    getToken,
};
