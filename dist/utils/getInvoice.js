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
exports.createinvoice = exports.getInvoicePDF = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const axios_1 = __importDefault(require("axios"));
const generatePaypalToken_1 = require("./generatePaypalToken");
const config_1 = __importDefault(require("../config"));
const getInvoicePDF = (invoiceId) => __awaiter(void 0, void 0, void 0, function* () {
    const token = yield (0, generatePaypalToken_1.getAccessToken)();
    console.log({ token, invoiceId });
    const { data } = yield axios_1.default.get(`${config_1.default.send_box_url}/v2/invoicing/invoices/${invoiceId}/generate-pdf`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        responseType: 'arraybuffer',
    });
    console.log('PDF saved successfully!', data);
    return data;
});
exports.getInvoicePDF = getInvoicePDF;
const createinvoice = (token, paymentId, data) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
    const invoiceData = {
        detail: {
            invoice_number: `INV-SUJON-${Date.now()}`,
            currency_code: 'USD',
            note: 'Thank you for your payment!',
            terms_and_conditions: 'No refunds after 30 days.',
        },
        invoicer: {
            name: { given_name: 'Adaptify Loop' },
            email_address: 'contact@adaptifyloop.com',
        },
        primary_recipients: [
            {
                billing_info: {
                    name: {
                        given_name: (_b = (_a = data === null || data === void 0 ? void 0 : data.payer) === null || _a === void 0 ? void 0 : _a.name) === null || _b === void 0 ? void 0 : _b.given_name,
                        surname: (_d = (_c = data === null || data === void 0 ? void 0 : data.payer) === null || _c === void 0 ? void 0 : _c.name) === null || _d === void 0 ? void 0 : _d.surname,
                    },
                    email_address: (_e = data === null || data === void 0 ? void 0 : data.payer) === null || _e === void 0 ? void 0 : _e.email_address,
                },
            },
        ],
        items: (_g = (_f = data === null || data === void 0 ? void 0 : data.purchase_units[0]) === null || _f === void 0 ? void 0 : _f.items) === null || _g === void 0 ? void 0 : _g.map((item) => ({
            name: item === null || item === void 0 ? void 0 : item.name,
            description: (item === null || item === void 0 ? void 0 : item.description) || 'No description provided',
            quantity: item === null || item === void 0 ? void 0 : item.quantity,
            unit_amount: {
                currency_code: 'USD',
                value: item === null || item === void 0 ? void 0 : item.unit_amount.value,
            },
        })),
        amount: {
            currency_code: 'USD',
            value: (_j = (_h = data === null || data === void 0 ? void 0 : data.purchase_units[0]) === null || _h === void 0 ? void 0 : _h.amount) === null || _j === void 0 ? void 0 : _j.value,
        },
    };
    // Create the invoice
    const response = yield axios_1.default.post(`${config_1.default.send_box_url}/v2/invoicing/invoices`, invoiceData, {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    });
    const invoiceId = (_m = (_l = (_k = data === null || data === void 0 ? void 0 : data.purchase_units[0]) === null || _k === void 0 ? void 0 : _k.payments) === null || _l === void 0 ? void 0 : _l.captures[0]) === null || _m === void 0 ? void 0 : _m.invoice_id;
    console.log({ invoiceId });
    // // Send the invoice
    // const { data: sendData } = await axios.post(
    //   `https://api-m.sandbox.paypal.com/v2/invoicing/invoices/${invoiceId}/send`,
    //   {},
    //   {
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //       'Content-Type': 'application/json',
    //     },
    //   },
    // );
    // console.log({ sendData });
    return response.data;
});
exports.createinvoice = createinvoice;
