"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.updateReset = exports.verifyReset = exports.initiateReset = exports.verify = exports.signUp = exports.signIn = void 0;
var joi_1 = __importDefault(require("joi"));
var joi_password_complexity_1 = __importDefault(require("joi-password-complexity"));
var JoiPhone = joi_1["default"].extend(require("joi-phone-number"));
exports.signIn = {
    email: joi_1["default"].string().email().required(),
    password: joi_1["default"].string().required()
};
exports.signUp = {
    email: joi_1["default"].string().email().required(),
    phone: JoiPhone.string()
        .phoneNumber({
        defaultCountry: "NG",
        format: "e164"
    })
        .required(),
    firstname: joi_1["default"].string(),
    lastname: joi_1["default"].string(),
    password: (0, joi_password_complexity_1["default"])()
};
exports.verify = {
    token: joi_1["default"].string()["default"](null),
    email: joi_1["default"].string()
        .email()
        .when("token", { is: null, then: joi_1["default"].string().email().required() })
        .when("token", { not: null, then: joi_1["default"].forbidden() })
};
exports.initiateReset = {
    email: joi_1["default"].string().email().required()
};
exports.verifyReset = {
    token: joi_1["default"].string().required()
};
exports.updateReset = {
    token: joi_1["default"].string().required(),
    password: (0, joi_password_complexity_1["default"])(),
    logOtherDevicesOut: joi_1["default"].boolean()["default"](false)
};
