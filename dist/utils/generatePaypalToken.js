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
exports.createOrder = exports.generatePaypalToken = void 0;
exports.getAccessToken = getAccessToken;
/* eslint-disable @typescript-eslint/no-explicit-any */
const axios_1 = __importDefault(require("axios"));
const config_1 = __importDefault(require("../config"));
const generatePaypalToken = () => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`${config_1.default.send_box_url}/v1/oauth2/token`);
    const { data: tokenData } = yield (0, axios_1.default)({
        url: `${config_1.default.send_box_url}/v1/oauth2/token`,
        method: 'POST',
        data: 'grant_type=client_credentials',
        auth: {
            username: config_1.default.paypal_client_id,
            password: config_1.default.paypal_secret,
        },
    });
    console.log(tokenData);
});
exports.generatePaypalToken = generatePaypalToken;
function getAccessToken() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // console.log(`${config.send_box_url}/v1/oauth2/token`);
            const { data } = yield axios_1.default.post(`${config_1.default.send_box_url}/v1/oauth2/token`, new URLSearchParams({ grant_type: 'client_credentials' }), {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                auth: {
                    username: config_1.default.paypal_client_id,
                    password: config_1.default.paypal_secret,
                },
            });
            return data === null || data === void 0 ? void 0 : data.access_token;
        }
        catch (error) {
            console.error('Error fetching access token:', error === null || error === void 0 ? void 0 : error.response.data);
            throw new Error('Could not fetch access token');
        }
    });
}
const createOrder = () => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const token = yield getAccessToken();
        const response = yield axios_1.default.post('https://api-m.sandbox.paypal.com/v2/checkout/orders', {
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
                        return_url: 'http://localhost:5173/complete-order',
                        cancel_url: 'http://localhost:5173/cancle-order',
                    },
                },
            },
            purchase_units: [
                {
                    invoice_id: 'pen123',
                    amount: {
                        currency_code: 'USD',
                        value: '20.00',
                        breakdown: {
                            item_total: {
                                currency_code: 'USD',
                                value: '20.00',
                            },
                        },
                    },
                    items: [
                        {
                            name: 'Pen',
                            description: 'A high-quality ballpoint pen',
                            unit_amount: {
                                currency_code: 'USD',
                                value: '20.00',
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
        console.log('Order Created:', { orderId }, response.data);
    }
    catch (error) {
        console.error('Error Creating Order:', error.response ? error.response.data : error.message);
    }
});
exports.createOrder = createOrder;
// createOrder();
