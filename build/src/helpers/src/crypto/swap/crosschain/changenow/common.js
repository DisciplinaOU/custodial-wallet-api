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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.transactionStatus = exports.listOfTransactions = exports.currencyInfo = exports.listAvailableCurrenciesForSpecificCurrency = exports.listAvailableCurrencies = void 0;
var _shared_1 = require("./_shared");
var listAvailableCurrencies = function (fixedRate) {
    if (fixedRate === void 0) { fixedRate = true; }
    return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, (0, _shared_1.request)({
                    url: "currencies?active=true&fixedRate=".concat(fixedRate),
                    method: 'get'
                })];
        });
    });
};
exports.listAvailableCurrencies = listAvailableCurrencies;
var listAvailableCurrenciesForSpecificCurrency = function (body) { return __awaiter(void 0, void 0, void 0, function () {
    var currency, _a, fixedRate;
    return __generator(this, function (_b) {
        currency = body.currency, _a = body.fixedRate, fixedRate = _a === void 0 ? true : _a;
        return [2 /*return*/, (0, _shared_1.request)({
                url: "currencies-to/".concat(currency, "?fixedRate=").concat(fixedRate),
                method: 'get'
            })];
    });
}); };
exports.listAvailableCurrenciesForSpecificCurrency = listAvailableCurrenciesForSpecificCurrency;
var currencyInfo = function (body) { return __awaiter(void 0, void 0, void 0, function () {
    var currency;
    return __generator(this, function (_a) {
        currency = body.currency;
        return [2 /*return*/, (0, _shared_1.request)({
                url: "currencies/".concat(currency),
                method: 'get'
            })];
    });
}); };
exports.currencyInfo = currencyInfo;
var listOfTransactions = function (body) { return __awaiter(void 0, void 0, void 0, function () {
    var from, to, status, _a, page, _b, pageSize, _c, dateFrom, _d, dateTo, url;
    return __generator(this, function (_e) {
        from = body.from, to = body.to, status = body.status, _a = body.page, page = _a === void 0 ? 1 : _a, _b = body.pageSize, pageSize = _b === void 0 ? 50 : _b, _c = body.dateFrom, dateFrom = _c === void 0 ? '' : _c, _d = body.dateTo, dateTo = _d === void 0 ? '' : _d;
        url = "transactions/".concat((0, _shared_1.getApiKey)(), "?from=").concat(from, "&to=").concat(to, "&") +
            "status=".concat(status, "&limit=").concat(pageSize, "&offset=").concat((page - 1) * pageSize);
        if (dateFrom)
            url += "&dateFrom=".concat(dateFrom);
        if (dateTo)
            url += "&dateTo=".concat(dateTo);
        return [2 /*return*/, (0, _shared_1.request)({
                url: url,
                method: 'get'
            })];
    });
}); };
exports.listOfTransactions = listOfTransactions;
var transactionStatus = function (body) { return __awaiter(void 0, void 0, void 0, function () {
    var transactionId;
    return __generator(this, function (_a) {
        transactionId = body.transactionId;
        return [2 /*return*/, (0, _shared_1.request)({
                url: "transactions/".concat(transactionId, "/").concat((0, _shared_1.getApiKey)()),
                method: 'get'
            })];
    });
}); };
exports.transactionStatus = transactionStatus;
