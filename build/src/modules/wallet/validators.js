"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.sendEth = exports.sendErc20 = exports.accountInfo = void 0;
var joi_1 = __importDefault(require("joi"));
exports.accountInfo = {};
exports.sendErc20 = {
    amount: joi_1["default"].number()
        .greater(1 / Math.pow(10, 18))
        .required(),
    currency: joi_1["default"].string().required(),
    to: joi_1["default"].string().required(),
    chargeFromAmount: joi_1["default"].boolean()["default"](false)
};
exports.sendEth = {
    amount: joi_1["default"].number()
        .greater(1 / Math.pow(10, 18))
        .required(),
    to: joi_1["default"].string().required()
};
