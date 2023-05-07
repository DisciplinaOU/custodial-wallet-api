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
exports.drainTRC20Token = exports.drainTrx = exports.toHex = exports.getTrc20Transactions = exports.getTransaction = exports.getTrxTransactions = exports.sendTRC20Token = exports.sendTrx = exports.getTRC20Balance = exports.getTrxBalance = exports.createTrxAddressFromHDKey = exports.createTrxAddressFromMnemonic = exports.importTrxAddress = exports.createTrxAddress = exports.sunToTrx = exports.parseTrx = void 0;
var tron_1 = __importDefault(require("@cobo/tron"));
var tronweb_1 = __importDefault(require("tronweb"));
var node_fetch_1 = __importDefault(require("node-fetch"));
var bignumber_js_1 = require("bignumber.js");
var getPath = function (index) { return "m/49'/194'/0'/0/".concat(index, "'"); };
var getTronGridLink = function (_a) {
    var _b = _a.network, network = _b === void 0 ? 'mainnet' : _b;
    var TRONGRID_API_KEY = process.env.TRONGRID_API_KEY;
    var subdomain = network === 'shasta' ?
        'api.shasta' :
        network === 'mainnet' ?
            'api' :
            network;
    if (!TRONGRID_API_KEY)
        throw new Error('Please provide TRONGRID_API_KEY');
    return "https://".concat(subdomain, ".trongrid.io");
};
var requestTronGrid = function (_a) {
    var network = _a.network, url = _a.url, _b = _a.method, method = _b === void 0 ? 'get' : _b, _c = _a.body, body = _c === void 0 ? null : _c;
    return __awaiter(void 0, void 0, void 0, function () {
        var TRONGRID_API_KEY, baseUrl, link, response;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    TRONGRID_API_KEY = process.env.TRONGRID_API_KEY;
                    baseUrl = getTronGridLink({ network: network });
                    link = "".concat(baseUrl, "/").concat(url);
                    body = body ? JSON.stringify(body) : null;
                    return [4 /*yield*/, (0, node_fetch_1["default"])(link, {
                            method: method,
                            body: body,
                            headers: {
                                'content-type': 'application/json',
                                'TRON-PRO-API-KEY': TRONGRID_API_KEY
                            }
                        })];
                case 1:
                    response = _d.sent();
                    return [2 /*return*/, response.json()];
            }
        });
    });
};
var getLatestBlock = function (_a) {
    var _b = _a.network, network = _b === void 0 ? 'mainnet' : _b;
    return __awaiter(void 0, void 0, void 0, function () {
        var _c, hash, _d, timestamp, number;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0: return [4 /*yield*/, requestTronGrid({
                        url: 'wallet/getnowblock',
                        network: network
                    })];
                case 1:
                    _c = _e.sent(), hash = _c.blockID, _d = _c.block_header.raw_data, timestamp = _d.timestamp, number = _d.number;
                    return [2 /*return*/, { hash: hash, timestamp: timestamp, number: number }];
            }
        });
    });
};
var broadcastTransaction = function (_a) {
    var _b = _a.network, network = _b === void 0 ? 'mainnet' : _b, transaction = _a.transaction;
    return __awaiter(void 0, void 0, void 0, function () {
        var hex;
        return __generator(this, function (_c) {
            hex = transaction.hex;
            return [2 /*return*/, requestTronGrid({
                    url: 'wallet/broadcasthex',
                    method: 'post',
                    network: network,
                    body: { transaction: hex }
                })];
        });
    });
};
var parseTrx = function (trx) {
    return (trx * Math.pow(10, 6)) | 0;
};
exports.parseTrx = parseTrx;
var sunToTrx = function (sun) {
    var trx = new bignumber_js_1.BigNumber(sun).div(new bignumber_js_1.BigNumber(Math.pow(10, 6))).toFixed();
    return parseFloat(trx);
};
exports.sunToTrx = sunToTrx;
var createTrxAddress = function () {
    var mnemonic = tron_1["default"].generateMnemonic();
    var wallet = tron_1["default"].fromMnemonic(mnemonic).derivePath(getPath(0));
    return {
        address: wallet.getAddress(),
        privateKey: wallet.getTronPrivateKey().toString()
    };
};
exports.createTrxAddress = createTrxAddress;
var importTrxAddress = function (_a) {
    var privateKey = _a.privateKey;
    var wallet = tron_1["default"].fromTronPrivateKey(privateKey);
    return {
        address: wallet.getAddress(),
        privateKey: wallet.getTronPrivateKey().toString()
    };
};
exports.importTrxAddress = importTrxAddress;
var createTrxAddressFromMnemonic = function (_a) {
    var mnemonic = _a.mnemonic, index = _a.index;
    var wallet = tron_1["default"].fromMnemonic(mnemonic).derivePath(getPath(index));
    return {
        address: wallet.getAddress(),
        privateKey: wallet.getTronPrivateKey().toString()
    };
};
exports.createTrxAddressFromMnemonic = createTrxAddressFromMnemonic;
var createTrxAddressFromHDKey = function (_a) {
    var hdkey = _a.hdkey, index = _a.index;
    var wallet = tron_1["default"].fromExtendedKey(hdkey).derivePath(getPath(index));
    return {
        address: wallet.getAddress(),
        privateKey: wallet.getTronPrivateKey().toString()
    };
};
exports.createTrxAddressFromHDKey = createTrxAddressFromHDKey;
var getTrxBalance = function (_a) {
    var address = _a.address, _b = _a.network, network = _b === void 0 ? 'mainnet' : _b;
    return __awaiter(void 0, void 0, void 0, function () {
        var data, sun, trx;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4 /*yield*/, requestTronGrid({
                        network: network,
                        url: "v1/accounts/".concat(address)
                    })];
                case 1:
                    data = (_c.sent()).data;
                    if (!data.length)
                        return [2 /*return*/, { sun: 0, trx: 0 }];
                    sun = data[0].balance;
                    trx = (0, exports.sunToTrx)(sun);
                    return [2 /*return*/, { sun: sun, trx: trx }];
            }
        });
    });
};
exports.getTrxBalance = getTrxBalance;
var getTRC20Balance = function (_a) {
    var address = _a.address, contractAddress = _a.contractAddress, _b = _a.network, network = _b === void 0 ? 'mainnet' : _b;
    return __awaiter(void 0, void 0, void 0, function () {
        var data, index, token, tokenContractAddress, sun, trx;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4 /*yield*/, requestTronGrid({
                        network: network,
                        url: "v1/accounts/".concat(address, "/transactions/trc20")
                    })];
                case 1:
                    data = (_c.sent()).data;
                    if (!data.length)
                        return [2 /*return*/, { sun: 0, trx: 0 }];
                    for (index = 0; index < data.length; index++) {
                        token = data[index];
                        tokenContractAddress = token.token_info.address;
                        if (tokenContractAddress === contractAddress) {
                            sun = parseInt(token.value);
                            trx = new bignumber_js_1.BigNumber(sun)
                                .div(new bignumber_js_1.BigNumber(Math.pow(10, 6)))
                                .toFixed();
                            trx = parseFloat(trx);
                            return [2 /*return*/, { sun: sun, trx: trx }];
                        }
                    }
                    return [2 /*return*/, { sun: 0, trx: 0 }];
            }
        });
    });
};
exports.getTRC20Balance = getTRC20Balance;
var sendTrx = function (_a) {
    var privateKey = _a.privateKey, to = _a.address, trx = _a.amount, _b = _a.network, network = _b === void 0 ? 'mainnet' : _b;
    return __awaiter(void 0, void 0, void 0, function () {
        var wallet, address, amount, latestBlock, balance, transaction;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    wallet = tron_1["default"].fromTronPrivateKey(privateKey);
                    address = wallet.getAddress();
                    amount = (0, exports.parseTrx)(trx);
                    return [4 /*yield*/, getLatestBlock({ network: network })];
                case 1:
                    latestBlock = _c.sent();
                    return [4 /*yield*/, (0, exports.getTrxBalance)({
                            address: address,
                            network: network
                        })];
                case 2:
                    balance = (_c.sent()).sun;
                    if (new bignumber_js_1.BigNumber(amount).gte(new bignumber_js_1.BigNumber(balance))) {
                        throw new Error('Insufficient balance');
                    }
                    transaction = wallet.generateTransaction(to, amount, 'TRX', latestBlock);
                    return [2 /*return*/, broadcastTransaction({ network: network, transaction: transaction })];
            }
        });
    });
};
exports.sendTrx = sendTrx;
var sendTRC20Token = function (_a) {
    var to = _a.address, contractAddress = _a.contractAddress, trx = _a.amount, privateKey = _a.privateKey, decimals = _a.decimals, _b = _a.network, network = _b === void 0 ? 'mainnet' : _b;
    return __awaiter(void 0, void 0, void 0, function () {
        var wallet, address, amount, latestBlock, balance, transaction;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    wallet = tron_1["default"].fromTronPrivateKey(privateKey);
                    address = wallet.getAddress();
                    amount = trx * Math.pow(10, decimals);
                    return [4 /*yield*/, getLatestBlock({ network: network })];
                case 1:
                    latestBlock = _c.sent();
                    return [4 /*yield*/, (0, exports.getTRC20Balance)({
                            address: address,
                            network: network,
                            contractAddress: contractAddress
                        })];
                case 2:
                    balance = (_c.sent()).sun;
                    if (new bignumber_js_1.BigNumber(amount).gte(new bignumber_js_1.BigNumber(balance))) {
                        throw new Error('Insufficient balance');
                    }
                    transaction = wallet.transferTRC20Token(contractAddress, to, amount, latestBlock);
                    return [2 /*return*/, broadcastTransaction({ network: network, transaction: transaction })];
            }
        });
    });
};
exports.sendTRC20Token = sendTRC20Token;
var getTrxTransactions = function (_a) {
    var address = _a.address, _b = _a.network, network = _b === void 0 ? 'mainnet' : _b;
    return __awaiter(void 0, void 0, void 0, function () {
        var url, _c, data, success, error;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    url = "v1/accounts/".concat(address, "/transactions");
                    return [4 /*yield*/, requestTronGrid({
                            url: url,
                            network: network
                        })];
                case 1:
                    _c = _d.sent(), data = _c.data, success = _c.success, error = _c.error;
                    if (!success)
                        throw new Error(error);
                    return [2 /*return*/, data];
            }
        });
    });
};
exports.getTrxTransactions = getTrxTransactions;
var getTransaction = function (_a) {
    var hash = _a.hash, _b = _a.network, network = _b === void 0 ? 'mainnet' : _b;
    return __awaiter(void 0, void 0, void 0, function () {
        var url, data;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    url = "wallet/gettransactionbyid";
                    return [4 /*yield*/, requestTronGrid({
                            url: url,
                            network: network,
                            body: { value: hash },
                            method: 'post'
                        })];
                case 1:
                    data = _c.sent();
                    if (!data.txID)
                        throw new Error('Transaction not found');
                    return [2 /*return*/, data];
            }
        });
    });
};
exports.getTransaction = getTransaction;
var getTrc20Transactions = function (_a) {
    var address = _a.address, _b = _a.network, network = _b === void 0 ? 'mainnet' : _b;
    return __awaiter(void 0, void 0, void 0, function () {
        var url, _c, data, success, error;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    url = "v1/accounts/".concat(address, "/transactions/trc20");
                    return [4 /*yield*/, requestTronGrid({
                            url: url,
                            network: network
                        })];
                case 1:
                    _c = _d.sent(), data = _c.data, success = _c.success, error = _c.error;
                    if (!success)
                        throw new Error(error);
                    return [2 /*return*/, data];
            }
        });
    });
};
exports.getTrc20Transactions = getTrc20Transactions;
var toHex = function (address) {
    return tronweb_1["default"].address.toHex(address);
};
exports.toHex = toHex;
var drainTrx = function (_a) {
    var privateKey = _a.privateKey, to = _a.address, _b = _a.network, network = _b === void 0 ? 'mainnet' : _b;
    return __awaiter(void 0, void 0, void 0, function () {
        var wallet, address, latestBlock, sun, amount, transaction, trx;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    wallet = tron_1["default"].fromTronPrivateKey(privateKey);
                    address = wallet.getAddress();
                    return [4 /*yield*/, getLatestBlock({ network: network })];
                case 1:
                    latestBlock = _c.sent();
                    return [4 /*yield*/, (0, exports.getTrxBalance)({
                            address: address,
                            network: network
                        })];
                case 2:
                    sun = (_c.sent()).sun;
                    amount = new bignumber_js_1.BigNumber(sun).minus(new bignumber_js_1.BigNumber(Math.pow(10, 6)));
                    transaction = wallet.generateTransaction(to, amount, 'TRX', latestBlock);
                    return [4 /*yield*/, broadcastTransaction({ network: network, transaction: transaction })];
                case 3:
                    trx = _c.sent();
                    return [2 /*return*/, __assign(__assign({}, trx), { amount: amount })];
            }
        });
    });
};
exports.drainTrx = drainTrx;
var drainTRC20Token = function (_a) {
    var to = _a.address, contractAddress = _a.contractAddress, privateKey = _a.privateKey, decimals = _a.decimals, _b = _a.network, network = _b === void 0 ? 'mainnet' : _b, _c = _a.backer, backer = _c === void 0 ? null : _c;
    return __awaiter(void 0, void 0, void 0, function () {
        var wallet, address, latestBlock, amount, address_1, transaction, trx;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    wallet = tron_1["default"].fromTronPrivateKey(privateKey);
                    address = wallet.getAddress();
                    return [4 /*yield*/, getLatestBlock({ network: network })];
                case 1:
                    latestBlock = _d.sent();
                    return [4 /*yield*/, (0, exports.getTRC20Balance)({
                            address: address,
                            network: network,
                            contractAddress: contractAddress
                        })];
                case 2:
                    amount = (_d.sent()).sun;
                    if (!backer) return [3 /*break*/, 4];
                    address_1 = (0, exports.importTrxAddress)({ privateKey: privateKey }).address;
                    return [4 /*yield*/, (0, exports.sendTrx)({
                            privateKey: backer,
                            amount: 1,
                            network: network,
                            address: address_1
                        })];
                case 3:
                    _d.sent();
                    _d.label = 4;
                case 4:
                    transaction = wallet.transferTRC20Token(contractAddress, to, amount, latestBlock);
                    return [4 /*yield*/, broadcastTransaction({ network: network, transaction: transaction })];
                case 5:
                    trx = _d.sent();
                    return [2 /*return*/, __assign(__assign({}, trx), { amount: amount })];
            }
        });
    });
};
exports.drainTRC20Token = drainTRC20Token;
