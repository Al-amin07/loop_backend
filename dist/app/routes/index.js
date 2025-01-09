"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const work_route_1 = require("../modules/work/work.route");
const feedback_route_1 = require("../modules/feedback/feedback.route");
const text_route_1 = require("../modules/homeText/text.route");
const route = (0, express_1.Router)();
const modules = [
    {
        path: '/work',
        route: work_route_1.workRoute,
    },
    {
        path: '/feedback',
        route: feedback_route_1.feedbackRoute,
    },
    {
        path: '/text',
        route: text_route_1.textRoute,
    },
];
modules.map((el) => route.use(el.path, el.route));
exports.default = route;
