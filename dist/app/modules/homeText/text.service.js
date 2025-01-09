"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.textServices = void 0;
const text_model_1 = require("./text.model");
const createTextIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield text_model_1.Text.create(payload);
    return result;
});
const getAllTextFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield text_model_1.Text.find({});
    return result;
});
const updateTextFromDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield text_model_1.Text.findByIdAndUpdate(id, payload, { new: true });
    return result;
});
exports.textServices = {
    createTextIntoDB,
    updateTextFromDB,
    getAllTextFromDB,
};
