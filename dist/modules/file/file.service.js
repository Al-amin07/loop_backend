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
exports.fileServices = void 0;
const file_model_1 = require("./file.model");
const uploadFile = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield file_model_1.File.create(payload);
    return result;
});
const getAllFile = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield file_model_1.File.find({}).populate('user_id');
    return result;
});
const getUserAllFile = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield file_model_1.File.find({ user_id: id }).populate('user_id');
    return result;
});
const updateFile = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield file_model_1.File.findByIdAndUpdate(id, payload, {
        new: true,
    }).populate('user_id');
    return result;
});
exports.fileServices = {
    uploadFile,
    getAllFile,
    getUserAllFile,
    updateFile,
};
