"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.File = void 0;
const mongoose_1 = require("mongoose");
const fileSchema = new mongoose_1.Schema({
    fileName: {
        type: String,
        required: true,
    },
    fileType: {
        type: String,
        required: true,
    },
    contentType: {
        type: String,
        required: true,
        enum: ['image/jpeg', 'image/png', 'application/pdf'],
    },
    data: {
        type: Buffer,
        required: true,
    },
    user_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending',
    },
    comment: {
        type: String,
    },
}, { timestamps: true });
exports.File = (0, mongoose_1.model)('File', fileSchema);
