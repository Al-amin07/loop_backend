"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_route_1 = require("../modules/auth/auth.route");
const user_route_1 = require("../modules/user/user.route");
const payment_route_1 = require("../modules/payment/payment.route");
const file_route_1 = require("../modules/file/file.route");
const route = (0, express_1.Router)();
const modules = [
    {
        path: '/auth',
        route: auth_route_1.authRoute,
    },
    {
        path: '/users',
        route: user_route_1.userRoute,
    },
    {
        path: '/payments',
        route: payment_route_1.paymentRoute,
    },
    {
        path: '/files',
        route: file_route_1.fileRoute,
    },
];
modules.map((el) => route.use(el.path, el.route));
exports.default = route;
