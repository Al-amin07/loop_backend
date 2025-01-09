"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.workRoute = void 0;
const express_1 = require("express");
const work_controller_1 = require("./work.controller");
const route = (0, express_1.Router)();
route.post('/', work_controller_1.workControllers.createWork);
route.get('/', work_controller_1.workControllers.getAllWork);
exports.workRoute = route;
