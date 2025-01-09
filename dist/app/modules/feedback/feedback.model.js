"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Feedback = void 0;
const mongoose_1 = require("mongoose");
const feedbackSchema = new mongoose_1.Schema({
    description: {
        type: String,
        required: true,
    },
    workCompany: {
        type: String,
        required: true,
    },
    logoImage: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
}, { timestamps: true });
exports.Feedback = (0, mongoose_1.model)('feedback', feedbackSchema);
