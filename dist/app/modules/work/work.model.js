"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkModel = void 0;
const mongoose_1 = require("mongoose");
const workSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    tags: {
        type: [String],
        required: true,
    },
}, { timestamps: true });
exports.WorkModel = (0, mongoose_1.model)('Work', workSchema);
