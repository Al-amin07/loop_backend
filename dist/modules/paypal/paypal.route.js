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
exports.paypalRoute = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const express_1 = require("express");
const config_1 = __importDefault(require("../../config"));
const paypal_rest_sdk_1 = __importDefault(require("paypal-rest-sdk"));
const paypal_controller_1 = require("./paypal.controller");
paypal_rest_sdk_1.default.configure({
    mode: 'sandbox',
    client_id: config_1.default.paypal_client_id,
    client_secret: config_1.default.paypal_secret,
});
const route = (0, express_1.Router)();
route.post('/paypal', paypal_controller_1.paypalController.createOrder);
route.get('/capture-payment/:paymentId', paypal_controller_1.paypalController.capturePayment2);
route.get('/invoice/:invoiceId', paypal_controller_1.paypalController.getSingleInvoice);
route.get('/invoice', paypal_controller_1.paypalController.getAllInvoices);
route.get('/token', paypal_controller_1.paypalController.getToken);
route.post('/pay', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let data;
    try {
        const create_payment_json = {
            intent: 'sale',
            payer: {
                payment_method: 'paypal',
            },
            redirect_urls: {
                return_url: 'http://localhost:8000/success',
                cancel_url: 'http://localhost:8000/failed',
            },
            transactions: [
                {
                    item_list: {
                        items: [
                            {
                                name: 'item',
                                sku: 'item',
                                price: '1.00',
                                currency: 'USD',
                                quantity: 1,
                            },
                        ],
                    },
                    amount: {
                        currency: 'USD',
                        total: '1.00',
                    },
                    description: 'This is the payment description.',
                },
            ],
        };
        paypal_rest_sdk_1.default.payment.create(create_payment_json, function (error, payment) {
            if (error) {
                throw error;
            }
            else {
                console.log('Create Payment Response');
                // console.log(payment);
                data = payment;
                res.json(data);
            }
        });
    }
    catch (error) {
        console.log({ error });
    }
}));
exports.paypalRoute = route;
// route.get('/paypal', async (req, res) => {
//   try {
//     const token = await getAccessToken();
//     const response = await axios.post(
//       'https://api-m.sandbox.paypal.com/v2/checkout/orders',
//       {
//         intent: 'CAPTURE',
//         payment_source: {
//           paypal: {
//             experience_context: {
//               payment_method_preference: 'IMMEDIATE_PAYMENT_REQUIRED',
//               payment_method_selected: 'PAYPAL',
//               //   landing_page: 'LOGIN',
//               brand_name: 'Adaptify Loop',
//               shipping_preference: 'NO_SHIPPING',
//               user_action: 'PAY_NOW',
//               return_url: 'http://localhost:5173/completed',
//               cancel_url: 'http://localhost:5173/reject',
//             },
//           },
//         },
//         purchase_units: [
//           {
//             invoice_id: 'pen123',
//             amount: {
//               currency_code: 'USD',
//               value: '20.00',
//               breakdown: {
//                 item_total: {
//                   currency_code: 'USD',
//                   value: '20.00',
//                 },
//               },
//             },
//             items: [
//               {
//                 name: 'Pen',
//                 description: 'A high-quality ballpoint pen',
//                 unit_amount: {
//                   currency_code: 'USD',
//                   value: '20.00',
//                 },
//                 quantity: '1',
//               },
//             ],
//           },
//         ],
//       },
//       {
//         headers: {
//           'Content-Type': 'application/json',
//           //   'PayPal-Request-Id': 'unique-request-id-12345',
//           Authorization: `Bearer ${token}`,
//         },
//       },
//     );
//     const orderId = response?.data?.id;
//     console.log('Order Created:', { orderId }, response.data);
//     res.json({
//       orderId,
//     });
//   } catch (error: any) {
//     console.error(
//       'Error Creating Order:',
//       error.response ? error.response.data : error.message,
//     );
//     next(error);
//   }
// });
