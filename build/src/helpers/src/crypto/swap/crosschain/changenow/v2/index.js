"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.fiat = exports.exchanges = exports.marketEstimateFiatCryptoToCrypto = exports.estimatedExchangeNetworkFee = exports.userAddresses = exports.addressValidation = exports.transactionStatus = exports.createExchangeTransaction = exports.estimatedExchangeAmount = exports.exchangeRange = exports.listAllAvailablePairs = exports.minimalExchangeAmount = exports.listAvailableCurrencies = void 0;
var _shared_1 = require("../_shared");
var listAvailableCurrencies = function (body) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, buy, _b, sell;
    return __generator(this, function (_c) {
        _a = body.buy, buy = _a === void 0 ? null : _a, _b = body.sell, sell = _b === void 0 ? null : _b;
        return [2 /*return*/, (0, _shared_1.request)({
                url: "exchange/currencies?active=&flow=standard" +
                    "&buy=".concat(buy || '', "&sell=").concat(sell || ''),
                method: 'get',
                prefix: '/v2'
            })];
    });
}); };
exports.listAvailableCurrencies = listAvailableCurrencies;
var minimalExchangeAmount = function (body) { return __awaiter(void 0, void 0, void 0, function () {
    var from, to, fromNetwork, toNetwork, _a, flow;
    return __generator(this, function (_b) {
        from = body.from, to = body.to, fromNetwork = body.fromNetwork, toNetwork = body.toNetwork, _a = body.flow, flow = _a === void 0 ? 'standard' : _a;
        return [2 /*return*/, (0, _shared_1.request)({
                url: "exchange/min-amount?fromCurrency=".concat(from, "&toCurrency=").concat(to) +
                    "&fromNetwork=".concat(fromNetwork, "&toNetwork=").concat(toNetwork, "&flow=").concat(flow),
                method: 'get',
                prefix: '/v2'
            })];
    });
}); };
exports.minimalExchangeAmount = minimalExchangeAmount;
var listAllAvailablePairs = function (body) { return __awaiter(void 0, void 0, void 0, function () {
    var from, to, fromNetwork, toNetwork, _a, flow;
    return __generator(this, function (_b) {
        from = body.from, to = body.to, fromNetwork = body.fromNetwork, toNetwork = body.toNetwork, _a = body.flow, flow = _a === void 0 ? 'standard' : _a;
        return [2 /*return*/, (0, _shared_1.request)({
                url: "exchange/available-pairs?fromCurrency=".concat(from, "&toCurrency=").concat(to) +
                    "&fromNetwork=".concat(fromNetwork, "&toNetwork=").concat(toNetwork, "&flow=").concat(flow),
                method: 'get',
                prefix: '/v2'
            })];
    });
}); };
exports.listAllAvailablePairs = listAllAvailablePairs;
var exchangeRange = function (body) { return __awaiter(void 0, void 0, void 0, function () {
    var from, to, fromNetwork, toNetwork, _a, flow;
    return __generator(this, function (_b) {
        from = body.from, to = body.to, fromNetwork = body.fromNetwork, toNetwork = body.toNetwork, _a = body.flow, flow = _a === void 0 ? 'standard' : _a;
        return [2 /*return*/, (0, _shared_1.request)({
                url: "exchange/range?fromCurrency=".concat(from, "&toCurrency=").concat(to, "&") +
                    "fromNetwork=".concat(fromNetwork, "&toNetwork=").concat(toNetwork, "&flow=").concat(flow),
                method: 'get',
                prefix: '/v2'
            })];
    });
}); };
exports.exchangeRange = exchangeRange;
var estimatedExchangeAmount = function (body) { return __awaiter(void 0, void 0, void 0, function () {
    var from, to, fromAmount, toAmount, _a, fromNetwork, _b, toNetwork, _c, flow, _d, type, useRateId;
    return __generator(this, function (_e) {
        from = body.from, to = body.to, fromAmount = body.fromAmount, toAmount = body.toAmount, _a = body.fromNetwork, fromNetwork = _a === void 0 ? '' : _a, _b = body.toNetwork, toNetwork = _b === void 0 ? '' : _b, _c = body.flow, flow = _c === void 0 ? 'standard' : _c, _d = body.type, type = _d === void 0 ? 'direct' : _d, useRateId = body.useRateId;
        return [2 /*return*/, (0, _shared_1.request)({
                url: "exchange/estimated-amount?fromCurrency=".concat(from, "&") +
                    "toCurrency=".concat(to, "&fromAmount=").concat(fromAmount, "&toAmount=").concat(toAmount, "&") +
                    "fromNetwork=".concat(fromNetwork, "&toNetwork=").concat(toNetwork, "&flow=").concat(flow, "&") +
                    "type=".concat(type, "&useRateId=").concat(useRateId),
                method: 'get',
                prefix: '/v2'
            })];
    });
}); };
exports.estimatedExchangeAmount = estimatedExchangeAmount;
var createExchangeTransaction = function (body) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, (0, _shared_1.request)({
                url: "exchange",
                method: 'post',
                prefix: '/v2',
                body: body
            })];
    });
}); };
exports.createExchangeTransaction = createExchangeTransaction;
var transactionStatus = function (body) { return __awaiter(void 0, void 0, void 0, function () {
    var id;
    return __generator(this, function (_a) {
        id = body.id;
        return [2 /*return*/, (0, _shared_1.request)({
                url: "exchange/by-id?id=".concat(id),
                method: 'get',
                prefix: '/v2',
                body: body
            })];
    });
}); };
exports.transactionStatus = transactionStatus;
var addressValidation = function (body) { return __awaiter(void 0, void 0, void 0, function () {
    var currency, address;
    return __generator(this, function (_a) {
        currency = body.currency, address = body.address;
        return [2 /*return*/, (0, _shared_1.request)({
                url: "validate/address?currency=".concat(currency, "&address=").concat(address),
                method: 'get',
                prefix: '/v2',
                body: body
            })];
    });
}); };
exports.addressValidation = addressValidation;
var userAddresses = function (body) { return __awaiter(void 0, void 0, void 0, function () {
    var name;
    return __generator(this, function (_a) {
        name = body.name;
        return [2 /*return*/, (0, _shared_1.request)({
                url: "addresses-by-name?name=".concat(name),
                method: 'get',
                prefix: '/v2',
                body: body
            })];
    });
}); };
exports.userAddresses = userAddresses;
var estimatedExchangeNetworkFee = function (body) { return __awaiter(void 0, void 0, void 0, function () {
    var fromCurrency, toCurrency, fromAmount, _a, fromNetwork, _b, toNetwork, _c, convertedCurrency, _d, convertedNetwork;
    return __generator(this, function (_e) {
        fromCurrency = body.fromCurrency, toCurrency = body.toCurrency, fromAmount = body.fromAmount, _a = body.fromNetwork, fromNetwork = _a === void 0 ? '' : _a, _b = body.toNetwork, toNetwork = _b === void 0 ? '' : _b, _c = body.convertedCurrency, convertedCurrency = _c === void 0 ? '' : _c, _d = body.convertedNetwork, convertedNetwork = _d === void 0 ? '' : _d;
        return [2 /*return*/, (0, _shared_1.request)({
                url: "exchange/network-fee?fromCurrency=".concat(fromCurrency) +
                    "&toCurrency=".concat(toCurrency, "&fromNetwork=").concat(fromNetwork) +
                    "&toNetwork=".concat(toNetwork, "&fromAmount=").concat(fromAmount) +
                    "&convertedCurrency=".concat(convertedCurrency) +
                    "&convertedNetwork=".concat(convertedNetwork),
                method: 'get',
                prefix: '/v2',
                body: body
            })];
    });
}); };
exports.estimatedExchangeNetworkFee = estimatedExchangeNetworkFee;
var marketEstimateFiatCryptoToCrypto = function (body) { return __awaiter(void 0, void 0, void 0, function () {
    var fromCurrency, toCurrency, _a, fromAmount, _b, toAmount, _c, type;
    return __generator(this, function (_d) {
        fromCurrency = body.fromCurrency, toCurrency = body.toCurrency, _a = body.fromAmount, fromAmount = _a === void 0 ? 0 : _a, _b = body.toAmount, toAmount = _b === void 0 ? 0 : _b, _c = body.type, type = _c === void 0 ? 'direct' : _c;
        return [2 /*return*/, (0, _shared_1.request)({
                url: "markets/estimate?fromCurrency=".concat(fromCurrency) +
                    "&toCurrency=".concat(toCurrency) +
                    "&fromAmount=".concat(fromAmount || '') +
                    "&toAmount=".concat(toAmount || '', "&type=").concat(type),
                method: 'get',
                prefix: '/v2',
                body: body
            })];
    });
}); };
exports.marketEstimateFiatCryptoToCrypto = marketEstimateFiatCryptoToCrypto;
var exchanges = function (body) { return __awaiter(void 0, void 0, void 0, function () {
    var limit, offset, sortDirection, sortField, dateField, dateFrom, dateTo, requestId;
    return __generator(this, function (_a) {
        limit = body.limit, offset = body.offset, sortDirection = body.sortDirection, sortField = body.sortField, dateField = body.dateField, dateFrom = body.dateFrom, dateTo = body.dateTo, requestId = body.requestId;
        return [2 /*return*/, (0, _shared_1.request)({
                url: "exchanges?limit=".concat(limit, "&offset=").concat(offset) +
                    "&sortDirection=".concat(sortDirection, "&sortField=").concat(sortField) +
                    "&dateField=".concat(dateField, "&dateFrom=").concat(dateFrom, "&dateTo=").concat(dateTo) +
                    "&requestId=".concat(requestId),
                method: 'get',
                prefix: '/v2',
                body: body
            })];
    });
}); };
exports.exchanges = exchanges;
exports.fiat = __importStar(require("./fiat"));
