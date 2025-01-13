"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoute = void 0;
const express_1 = require("express");
const user_controller_1 = require("./user.controller");
const route = (0, express_1.Router)();
route.get('/', user_controller_1.userControllers.getAllUser);
exports.userRoute = route;
