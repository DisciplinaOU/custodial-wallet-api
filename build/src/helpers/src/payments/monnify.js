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
exports.transfer = exports.resolveBank = exports.getBanks = exports.deallocateAccount = exports.reserveAccount = void 0;
var node_fetch_1 = __importDefault(require("node-fetch"));
var uuid_1 = require("uuid");
var baseURL = 'https://sandbox.monnify.com/api';
var auth = function () { return __awaiter(void 0, void 0, void 0, function () {
    var _a, MONNIFY_API_KEY, MONNIFY_SECERET, response;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = process.env, MONNIFY_API_KEY = _a.MONNIFY_API_KEY, MONNIFY_SECERET = _a.MONNIFY_SECERET;
                return [4 /*yield*/, (0, node_fetch_1["default"])("".concat(baseURL, "/v1/auth/login"), {
                        headers: {
                            'authorization': "Basic ".concat(Buffer.from("".concat(MONNIFY_API_KEY, ":").concat(MONNIFY_SECERET)).toString('base64')),
                            'content-type': 'application/json'
                        },
                        method: 'post'
                    })];
            case 1:
                response = _b.sent();
                return [4 /*yield*/, response.json()];
            case 2:
                response = _b.sent();
                return [2 /*return*/, response];
        }
    });
}); };
var request = function (_a) {
    var url = _a.url, _b = _a.body, body = _b === void 0 ? {} : _b, _c = _a.method, method = _c === void 0 ? 'get' : _c;
    return __awaiter(void 0, void 0, void 0, function () {
        var r, requestSuccessful, accessToken, response, error_1;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    _d.trys.push([0, 5, , 6]);
                    return [4 /*yield*/, auth()];
                case 1:
                    r = _d.sent();
                    requestSuccessful = r.requestSuccessful;
                    if (!requestSuccessful) return [3 /*break*/, 4];
                    accessToken = r.responseBody.accessToken;
                    return [4 /*yield*/, (0, node_fetch_1["default"])("".concat(baseURL, "/").concat(url), {
                            method: method,
                            headers: {
                                'authorization': "Bearer ".concat(accessToken),
                                'content-type': 'application/json'
                            },
                            body: Object.keys(body).length ? JSON.stringify(body) : undefined
                        })];
                case 2:
                    response = _d.sent();
                    return [4 /*yield*/, response.json()];
                case 3:
                    response = _d.sent();
                    response.status = response.requestSuccessful;
                    response.data = response.responseBody;
                    response.message = response.responseMessage;
                    delete response.responseBody;
                    delete response.responseMessage;
                    delete response.requestSuccessful;
                    delete response.responseCode;
                    return [2 /*return*/, response];
                case 4: return [2 /*return*/, { status: false, message: 'Monnify request failed' }];
                case 5:
                    error_1 = _d.sent();
                    return [2 /*return*/, {
                            status: false,
                            message: 'An error occured calling monnify'
                        }];
                case 6: return [2 /*return*/];
            }
        });
    });
};
var reserveAccount = function (_a) {
    var name = _a.name, email = _a.email;
    return __awaiter(void 0, void 0, void 0, function () {
        var MONNIFY_CONTRACT_CODE;
        return __generator(this, function (_b) {
            MONNIFY_CONTRACT_CODE = process.env.MONNIFY_CONTRACT_CODE;
            return [2 /*return*/, request({
                    url: 'v2/bank-transfer/reserved-accounts',
                    body: {
                        accountReference: (0, uuid_1.v4)(),
                        accountName: "".concat(name, "'s Account"),
                        currencyCode: 'NGN',
                        contractCode: MONNIFY_CONTRACT_CODE,
                        customerEmail: email,
                        customerName: name,
                        getAllAvailableBanks: true
                    },
                    method: 'post'
                })];
        });
    });
};
exports.reserveAccount = reserveAccount;
var deallocateAccount = function (_a) {
    var reference = _a.reference;
    return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_b) {
            return [2 /*return*/, request({
                    url: "v1/bank-transfer/reserved-accounts/reference/".concat(reference),
                    method: 'delete'
                })];
        });
    });
};
exports.deallocateAccount = deallocateAccount;
var getBanks = function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    switch (_a.label) {
        case 0: return [4 /*yield*/, request({ url: 'v1/banks' })];
        case 1: return [2 /*return*/, _a.sent()];
    }
}); }); };
exports.getBanks = getBanks;
var resolveBank = function (_a) {
    var account_number = _a.account_number, bank_code = _a.bank_code;
    return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_b) {
            return [2 /*return*/, request({
                    url: "v1/disbursements/account/validate?accountNumber=".concat(account_number, "&") +
                        "bankCode=".concat(bank_code)
                })];
        });
    });
};
exports.resolveBank = resolveBank;
var transfer = function (_a) {
    var destinationAccountNumber = _a.account_number, destinationBankCode = _a.bank_code, amount = _a.amount, narration = _a.reason;
    return __awaiter(void 0, void 0, void 0, function () {
        var MONNIFY_WALLET_ACCOUNT_NUMBER;
        return __generator(this, function (_b) {
            MONNIFY_WALLET_ACCOUNT_NUMBER = process.env.MONNIFY_WALLET_ACCOUNT_NUMBER;
            return [2 /*return*/, request({
                    url: "v2/disbursements/single",
                    body: {
                        amount: amount,
                        reference: (0, uuid_1.v4)(),
                        narration: narration,
                        destinationBankCode: destinationBankCode,
                        destinationAccountNumber: destinationAccountNumber,
                        currency: 'NGN',
                        sourceAccountNumber: MONNIFY_WALLET_ACCOUNT_NUMBER
                    },
                    method: 'post'
                })];
        });
    });
};
exports.transfer = transfer;
