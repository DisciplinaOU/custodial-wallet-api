"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.updatePassword = exports.updateProfile = void 0;
var joi_1 = __importDefault(require("joi"));
var joi_password_complexity_1 = __importDefault(require("joi-password-complexity"));
exports.updateProfile = {
    firstname: joi_1["default"].string(),
    lastname: joi_1["default"].string(),
    avatar: joi_1["default"].string().uri()
};
exports.updatePassword = {
    password: joi_1["default"].string(),
    newPassword: (0, joi_password_complexity_1["default"])(),
    logOtherDevicesOut: joi_1["default"].boolean()["default"](false)
};
