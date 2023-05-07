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
exports.create = void 0;
var agenda_1 = __importDefault(require("agenda"));
var create = function (_a) {
    var queueName = _a.queueName, _b = _a.options, options = _b === void 0 ? {} : _b;
    var AGENDA_DB_URL = process.env.AGENDA_DB_URL;
    return new agenda_1["default"](__assign({ db: { address: AGENDA_DB_URL }, name: queueName }, options));
};
exports.create = create;
