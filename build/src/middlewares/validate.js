"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.validate = void 0;
var joi_1 = __importDefault(require("joi"));
var utils_1 = require("../utils");
var validate = function (fields) {
    return function (req, res, next) {
        var schema = joi_1["default"].object().keys(fields).required().unknown(false);
        var value = req.method == "GET" ? req.query : req.body;
        var _a = schema.validate(value), error = _a.error, vars = _a.value;
        if (error)
            return (0, utils_1.response)(res, { status: false, message: error.message }, 400);
        req.form = req.form || {};
        req.form = __assign(__assign({}, req.form), vars);
        next();
    };
};
exports.validate = validate;
