"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const notFound = (req, res) => {
    return res.status(404).json({
        success: false,
        message: 'API not found',
        error: '',
    });
};
exports.default = notFound;
