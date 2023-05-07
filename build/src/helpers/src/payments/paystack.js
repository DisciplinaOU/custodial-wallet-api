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
exports.resolveCardBin = exports.handleWebhook = exports.transfer = exports.resolveBank = exports.getBanks = void 0;
var crypto_1 = __importDefault(require("crypto"));
var node_fetch_1 = __importDefault(require("node-fetch"));
var baseURL = 'https://api.paystack.co';
var request = function (_a) {
    var url = _a.url, _b = _a.body, body = _b === void 0 ? {} : _b, _c = _a.method, method = _c === void 0 ? 'get' : _c;
    return __awaiter(void 0, void 0, void 0, function () {
        var PAYSTACK_SECRET_KEY, response, error_1;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;
                    _d.label = 1;
                case 1:
                    _d.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, (0, node_fetch_1["default"])("".concat(baseURL, "/").concat(url), {
                            body: Object.keys(body).length ? JSON.stringify(body) : undefined,
                            method: method,
                            headers: {
                                'authorization': "Bearer ".concat(PAYSTACK_SECRET_KEY),
                                'content-type': 'application/json'
                            }
                        })];
                case 2:
                    response = _d.sent();
                    return [4 /*yield*/, response.json()];
                case 3:
                    response = _d.sent();
                    return [2 /*return*/, response];
                case 4:
                    error_1 = _d.sent();
                    return [2 /*return*/, {
                            status: false,
                            message: 'An error occured calling paystack'
                        }];
                case 5: return [2 /*return*/];
            }
        });
    });
};
var getBanks = function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    return [2 /*return*/, request({ url: 'bank?country=nigeria' + '&use_cursor=false' })];
}); }); };
exports.getBanks = getBanks;
var resolveBank = function (_a) {
    var account_number = _a.account_number, bank_code = _a.bank_code;
    return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_b) {
            return [2 /*return*/, request({
                    url: "bank/resolve?account_number=".concat(account_number, "&bank_code=").concat(bank_code)
                })];
        });
    });
};
exports.resolveBank = resolveBank;
var transfer = function (_a) {
    var name = _a.name, account_number = _a.account_number, bank_code = _a.bank_code, amount = _a.amount, reason = _a.reason;
    return __awaiter(void 0, void 0, void 0, function () {
        var _b, trs, trm, trd, recipient, _c, status, message, data;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0: return [4 /*yield*/, request({
                        url: "transferrecipient",
                        body: {
                            type: 'nuban',
                            name: name,
                            account_number: account_number,
                            bank_code: bank_code,
                            currency: 'NGN'
                        },
                        method: 'post'
                    })];
                case 1:
                    _b = _d.sent(), trs = _b.status, trm = _b.message, trd = _b.data;
                    if (!trs)
                        return [2 /*return*/, { status: trs, message: trm }];
                    recipient = trd.recipient_code;
                    amount = amount * 1000;
                    return [4 /*yield*/, request({
                            url: "transfer",
                            body: {
                                source: 'balance',
                                reason: reason,
                                amount: amount,
                                recipient: recipient
                            },
                            method: 'post'
                        })];
                case 2:
                    _c = _d.sent(), status = _c.status, message = _c.message, data = _c.data;
                    return [2 /*return*/, { status: status, message: message, data: data }];
            }
        });
    });
};
exports.transfer = transfer;
var handleWebhook = function (params) {
    var PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;
    var headers = params.headers, body = params.body;
    var hash = crypto_1["default"]
        .createHmac('sha512', PAYSTACK_SECRET_KEY)
        .update(JSON.stringify(body))
        .digest('hex');
    if (hash !== headers['x-paystack-signature']) {
        return false;
    }
    var payload = body;
    return payload;
};
exports.handleWebhook = handleWebhook;
var resolveCardBin = function (_a) {
    var bin = _a.bin;
    return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_b) {
            return [2 /*return*/, request({
                    url: "decision/bin/".concat(bin),
                    method: 'get'
                })];
        });
    });
};
exports.resolveCardBin = resolveCardBin;
