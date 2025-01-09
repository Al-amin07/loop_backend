"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.feedbackRoute = void 0;
const express_1 = require("express");
const feedback_controller_1 = require("./feedback.controller");
const route = (0, express_1.Router)();
route.post('/', feedback_controller_1.feedbackControlles.createFeedback);
route.get('/', feedback_controller_1.feedbackControlles.getAllFeedback);
exports.feedbackRoute = route;
