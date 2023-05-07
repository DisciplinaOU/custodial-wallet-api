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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.generateTronAddress = exports.generateEthereumAddress = exports.generateBitcoinAddress = exports.customers = exports.wallet = exports.transactions = exports.wallets = exports.assetBalance = exports.assetsBalances = void 0;
var node_fetch_1 = __importDefault(require("node-fetch"));
var url_1 = require("url");
var baseURL = 'https://keeway-link.herokuapp.com/api/v1/blockchain';
var request = function (_a) {
    var url = _a.url, _b = _a.body, body = _b === void 0 ? {} : _b, _c = _a.method, method = _c === void 0 ? 'get' : _c;
    return __awaiter(void 0, void 0, void 0, function () {
        var KEEWAY_SECRET_KEY, response, error_1;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    KEEWAY_SECRET_KEY = process.env.KEEWAY_SECRET_KEY;
                    _d.label = 1;
                case 1:
                    _d.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, (0, node_fetch_1["default"])("".concat(baseURL, "/").concat(url), {
                            body: Object.keys(body).length ? JSON.stringify(body) : undefined,
                            method: method,
                            headers: {
                                'authorization': "Bearer ".concat(KEEWAY_SECRET_KEY),
                                'content-type': 'application/json'
                            }
                        })];
                case 2:
                    response = _d.sent();
                    return [2 /*return*/, response.json()];
                case 3:
                    error_1 = _d.sent();
                    return [2 /*return*/, {
                            status: false,
                            message: 'An error occured calling keeway'
                        }];
                case 4: return [2 /*return*/];
            }
        });
    });
};
var assetsBalances = function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    return [2 /*return*/, request({ url: "assets-balances", method: 'get' })];
}); }); };
exports.assetsBalances = assetsBalances;
var assetBalance = function (_a) {
    var asset = _a.asset, blockchain = _a.blockchain, network = _a.network;
    return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_b) {
            return [2 /*return*/, request({
                    url: "asset-balance?".concat(new url_1.URLSearchParams({
                        asset: asset,
                        blockchain: blockchain,
                        network: network
                    }).toString()),
                    method: 'get'
                })];
        });
    });
};
exports.assetBalance = assetBalance;
var wallets = function (_a) {
    var asset = _a.asset, blockchain = _a.blockchain, network = _a.network, _b = _a.page, page = _b === void 0 ? 1 : _b, _c = _a.pageSize, pageSize = _c === void 0 ? 10 : _c;
    return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_d) {
            return [2 /*return*/, request({
                    url: "wallets?".concat(new url_1.URLSearchParams(JSON.parse(JSON.stringify({
                        asset: asset,
                        blockchain: blockchain,
                        network: network,
                        page: page,
                        pageSize: pageSize
                    }))).toString()),
                    method: 'get'
                })];
        });
    });
};
exports.wallets = wallets;
var transactions = function (_a) {
    var asset = _a.asset, blockchain = _a.blockchain, network = _a.network, type = _a.type, _b = _a.page, page = _b === void 0 ? 1 : _b, _c = _a.pageSize, pageSize = _c === void 0 ? 10 : _c;
    return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_d) {
            return [2 /*return*/, request({
                    url: "transactionss?".concat(new url_1.URLSearchParams(JSON.parse(JSON.stringify({
                        asset: asset,
                        blockchain: blockchain,
                        network: network,
                        type: type,
                        page: page,
                        pageSize: pageSize
                    }))).toString()),
                    method: 'get'
                })];
        });
    });
};
exports.transactions = transactions;
var wallet = function (_a) {
    var walletId = _a.walletId;
    return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_b) {
            return [2 /*return*/, request({
                    url: "wallet?".concat(new url_1.URLSearchParams(JSON.parse(JSON.stringify({ walletId: walletId }))).toString()),
                    method: 'get'
                })];
        });
    });
};
exports.wallet = wallet;
var customers = function (_a) {
    var _b = _a.page, page = _b === void 0 ? 1 : _b, _c = _a.pageSize, pageSize = _c === void 0 ? 10 : _c;
    return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_d) {
            return [2 /*return*/, request({
                    url: "customers?".concat(new url_1.URLSearchParams(JSON.parse(JSON.stringify({ page: page, pageSize: pageSize }))).toString()),
                    method: 'get'
                })];
        });
    });
};
exports.customers = customers;
var generateBitcoinAddress = function (_a) {
    var amount = _a.amount, contactEmail = _a.contactEmail, expiryInMinutes = _a.expiryInMinutes, network = _a.network, contactName = _a.contactName, contactPhone = _a.contactPhone;
    return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_b) {
            return [2 /*return*/, request({
                    url: "bitcoin/generate-address?".concat(new url_1.URLSearchParams(JSON.parse(JSON.stringify({
                        amount: amount,
                        contactEmail: contactEmail,
                        expiryInMinutes: expiryInMinutes,
                        network: network,
                        contactName: contactName,
                        contactPhone: contactPhone
                    }))).toString()),
                    method: 'get'
                })];
        });
    });
};
exports.generateBitcoinAddress = generateBitcoinAddress;
var generateEthereumAddress = function (_a) {
    var amount = _a.amount, contactEmail = _a.contactEmail, expiryInMinutes = _a.expiryInMinutes, network = _a.network, contactName = _a.contactName, contactPhone = _a.contactPhone, asset = _a.asset;
    return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_b) {
            return [2 /*return*/, request({
                    url: "ethereum/generate-address?".concat(new url_1.URLSearchParams(JSON.parse(JSON.stringify({
                        amount: amount,
                        contactEmail: contactEmail,
                        expiryInMinutes: expiryInMinutes,
                        network: network,
                        contactName: contactName,
                        contactPhone: contactPhone,
                        asset: asset
                    }))).toString()),
                    method: 'get'
                })];
        });
    });
};
exports.generateEthereumAddress = generateEthereumAddress;
var generateTronAddress = function (_a) {
    var amount = _a.amount, contactEmail = _a.contactEmail, expiryInMinutes = _a.expiryInMinutes, network = _a.network, contactName = _a.contactName, contactPhone = _a.contactPhone, asset = _a.asset;
    return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_b) {
            return [2 /*return*/, request({
                    url: "tron/generate-address?".concat(new url_1.URLSearchParams(JSON.parse(JSON.stringify({
                        amount: amount,
                        contactEmail: contactEmail,
                        expiryInMinutes: expiryInMinutes,
                        network: network,
                        contactName: contactName,
                        contactPhone: contactPhone,
                        asset: asset
                    }))).toString()),
                    method: 'get'
                })];
        });
    });
};
exports.generateTronAddress = generateTronAddress;
