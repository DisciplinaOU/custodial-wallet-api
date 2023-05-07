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
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.updateCertificate = exports.createCertificate = exports.getCertificate = exports.listCertificates = void 0;
var axios_1 = __importDefault(require("axios"));
var env_1 = require("../../configs/env");
var services_1 = require("../wallet/services");
var disciplina_1 = require("../../contracts/disciplina");
var certEndpoint = axios_1["default"].create({ baseURL: env_1.certgenApiUrl });
var proxyRequest = function (_a) { return __awaiter(void 0, void 0, void 0, function () {
    var headers, response;
    var method = _a.method, url = _a.url, authToken = _a.authToken, rest = __rest(_a, ["method", "url", "authToken"]);
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                headers = { "Authorization": "Bearer ".concat(authToken) };
                return [4 /*yield*/, certEndpoint.request(__assign({ method: method, url: url, headers: headers }, rest))];
            case 1:
                response = _b.sent();
                return [2 /*return*/, response.data];
        }
    });
}); };
var wrapProxyError = function (error, msgPrefix) {
    var data = {
        status: false,
        message: msgPrefix.concat(env_1.devEnv ? ": " + error : "")
    };
    if (error.response) {
        return {
            code: error.response.status,
            payload: data
        };
    }
    else {
        return data;
    }
};
var publishUnpublishedHeaders = function (userId, authToken, headers) { return __awaiter(void 0, void 0, void 0, function () {
    var wallet, curContract, updatedHeaders, _i, _a, fullHeader, header, headerHash, prevBlock, _b, root, transactionsNum, tx, waitResult, txId;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0: return [4 /*yield*/, (0, services_1.getWallet)({ userId: userId })];
            case 1:
                wallet = (_c.sent()).wallet;
                curContract = disciplina_1.disciplinaContract.connect(wallet);
                updatedHeaders = [];
                _i = 0, _a = headers.reverse();
                _c.label = 2;
            case 2:
                if (!(_i < _a.length)) return [3 /*break*/, 8];
                fullHeader = _a[_i];
                if (!fullHeader.pubTxId) return [3 /*break*/, 3];
                updatedHeaders.unshift(fullHeader);
                return [3 /*break*/, 7];
            case 3:
                header = fullHeader.header, headerHash = fullHeader.headerHash;
                prevBlock = header.prevBlock, _b = header.bodyProof, root = _b.root, transactionsNum = _b.transactionsNum;
                return [4 /*yield*/, curContract.submitHeader("0x".concat(prevBlock), "0x".concat(root), transactionsNum, {
                        gasLimit: 500000
                    })];
            case 4:
                tx = _c.sent();
                return [4 /*yield*/, tx.wait()];
            case 5:
                waitResult = _c.sent();
                console.log(waitResult);
                txId = tx.hash;
                return [4 /*yield*/, proxyRequest({
                        method: "PUT",
                        url: "/block/".concat(headerHash),
                        authToken: authToken,
                        params: { txId: txId }
                    })];
            case 6:
                _c.sent();
                updatedHeaders.unshift(__assign(__assign({}, fullHeader), { pubTxId: txId }));
                _c.label = 7;
            case 7:
                _i++;
                return [3 /*break*/, 2];
            case 8: return [2 /*return*/, updatedHeaders];
        }
    });
}); };
var listCertificates = function (params) { return __awaiter(void 0, void 0, void 0, function () {
    var authToken, data, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                authToken = params.authToken;
                delete params.authToken;
                return [4 /*yield*/, proxyRequest({
                        method: "GET",
                        url: "/certificates",
                        authToken: authToken,
                        params: params
                    })];
            case 1:
                data = _a.sent();
                return [2 /*return*/, {
                        status: true,
                        message: "Certificates listed",
                        data: data
                    }];
            case 2:
                error_1 = _a.sent();
                return [2 /*return*/, wrapProxyError(error_1, "Error trying to list certificates")];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.listCertificates = listCertificates;
var getCertificate = function (_a) {
    var authToken = _a.authToken, certificateId = _a.certificateId;
    return __awaiter(void 0, void 0, void 0, function () {
        var data, error_2;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, proxyRequest({
                            method: "GET",
                            url: "/certificates/".concat(certificateId),
                            authToken: authToken
                        })];
                case 1:
                    data = _b.sent();
                    return [2 /*return*/, {
                            status: true,
                            message: "Certificate fetched",
                            data: data
                        }];
                case 2:
                    error_2 = _b.sent();
                    return [2 /*return*/, wrapProxyError(error_2, "Error trying to fetch certificate")];
                case 3: return [2 /*return*/];
            }
        });
    });
};
exports.getCertificate = getCertificate;
var createCertificate = function (params) { return __awaiter(void 0, void 0, void 0, function () {
    var authToken, userId, data, headers, updatedHeaders, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                authToken = params.authToken, userId = params.userId;
                delete params.authToken;
                delete params.userId;
                return [4 /*yield*/, proxyRequest({
                        method: "POST",
                        url: "/certificate",
                        authToken: authToken,
                        data: params
                    })];
            case 1:
                data = _a.sent();
                headers = data.headers;
                updatedHeaders = publishUnpublishedHeaders(userId, authToken, headers);
                return [2 /*return*/, {
                        status: true,
                        message: "Certificate created",
                        data: __assign(__assign({}, data), { headers: updatedHeaders })
                    }];
            case 2:
                error_3 = _a.sent();
                return [2 /*return*/, wrapProxyError(error_3, "Error trying to create certificate")];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.createCertificate = createCertificate;
var updateCertificate = function (_a) {
    var authToken = _a.authToken, userId = _a.userId, certificateId = _a.certificateId, datas = _a.datas;
    return __awaiter(void 0, void 0, void 0, function () {
        var data, headers, updatedHeaders, error_4;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, proxyRequest({
                            method: "PUT",
                            url: "/certificate/".concat(certificateId),
                            authToken: authToken,
                            data: datas
                        })];
                case 1:
                    data = _b.sent();
                    headers = data.headers;
                    updatedHeaders = publishUnpublishedHeaders(userId, authToken, headers);
                    return [2 /*return*/, {
                            status: true,
                            message: "Certificate created",
                            data: __assign(__assign({}, data), { headers: updatedHeaders })
                        }];
                case 2:
                    error_4 = _b.sent();
                    return [2 /*return*/, wrapProxyError(error_4, "Error trying to update certificate")];
                case 3: return [2 /*return*/];
            }
        });
    });
};
exports.updateCertificate = updateCertificate;
