"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.updateCertificate = exports.createCertificate = exports.listCertificates = void 0;
var joi_1 = __importDefault(require("joi"));
exports.listCertificates = {
    onlyCount: joi_1["default"].bool().optional(),
    offset: joi_1["default"].number().optional(),
    limit: joi_1["default"].number().optional(),
    sortBy: joi_1["default"].string().optional()
};
exports.createCertificate = {
    datas: joi_1["default"].array().items(joi_1["default"].object()).required(),
    meta: joi_1["default"].object({
        issueDate: joi_1["default"].string().required(),
        title: joi_1["default"].string().required(),
        entity: joi_1["default"].number().required()
    })
};
exports.updateCertificate = {
    datas: joi_1["default"].array().items(joi_1["default"].object().required()).required()
};
