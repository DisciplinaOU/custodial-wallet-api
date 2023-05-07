"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.create = void 0;
var bull_1 = __importDefault(require("bull"));
var create = function (_a) {
    var queueName = _a.queueName, _b = _a.options, options = _b === void 0 ? {} : _b;
    var _c = process.env.REDIS_URL, REDIS_URL = _c === void 0 ? null : _c;
    return new bull_1["default"](queueName, REDIS_URL, options);
};
exports.create = create;
