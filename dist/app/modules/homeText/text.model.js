"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Text = void 0;
const mongoose_1 = require("mongoose");
const textSchema = new mongoose_1.Schema({
    text: {
        type: String,
        required: true,
    },
}, { timestamps: true });
exports.Text = (0, mongoose_1.model)('Text', textSchema);
