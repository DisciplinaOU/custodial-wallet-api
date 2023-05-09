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
exports.directProxy = void 0;
var axios_1 = __importDefault(require("axios"));
var http_proxy_middleware_1 = require("http-proxy-middleware");
var env_1 = require("../../configs/env");
var services_1 = require("../wallet/services");
var disciplina_1 = require("../../contracts/disciplina");
var certEndpoint = axios_1["default"].create({ baseURL: env_1.certgenApiUrl });
var directProxy = function (pathSuffix) {
    var _a;
    if (pathSuffix === void 0) { pathSuffix = ""; }
    return (0, http_proxy_middleware_1.createProxyMiddleware)({
        target: env_1.certgenApiUrl + pathSuffix,
        changeOrigin: true,
        pathRewrite: (_a = {}, _a["^/.*/certgen".concat(pathSuffix)] = '', _a),
        selfHandleResponse: true,
        onProxyReq: function (proxyReq, req, res) {
            if (req.body) {
                var bodyData = JSON.stringify(req.body);
                // incase if content-type is application/x-www-form-urlencoded -> we need to change to application/json
                proxyReq.setHeader('Content-Type', 'application/json');
                proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData));
                // stream the content
                proxyReq.write(bodyData);
            }
        },
        onProxyRes: (0, http_proxy_middleware_1.responseInterceptor)(interceptAndPublishHeaders),
        logLevel: "debug"
    });
};
exports.directProxy = directProxy;
var proxyRequest = function (_a) { return __awaiter(void 0, void 0, void 0, function () {
    var headers, response;
    var method = _a.method, url = _a.url, authToken = _a.authToken, _b = _a.additionalHeaders, additionalHeaders = _b === void 0 ? {} : _b, rest = __rest(_a, ["method", "url", "authToken", "additionalHeaders"]);
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                headers = __assign({ "Authorization": "Bearer ".concat(authToken) }, additionalHeaders);
                return [4 /*yield*/, certEndpoint.request(__assign({ method: method, url: url, headers: headers }, rest))];
            case 1:
                response = _c.sent();
                return [2 /*return*/, response.data];
        }
    });
}); };
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
var interceptAndPublishHeaders = function (responseBuffer, proxyRes, req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, userId, authToken, response, headers, updatedHeaders, updatedResponse, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                if (!(["POST", "PUT"].includes(req.method) && [200, 201].includes(proxyRes.statusCode))) return [3 /*break*/, 4];
                _a = req.form, userId = _a.userId, authToken = _a.authToken;
                response = JSON.parse(responseBuffer.toString());
                headers = response.headers;
                if (!headers) return [3 /*break*/, 4];
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, publishUnpublishedHeaders(userId, authToken, headers)];
            case 2:
                updatedHeaders = _b.sent();
                updatedResponse = __assign(__assign({}, response), { headers: updatedHeaders });
                console.log('Updated response: ', updatedResponse);
                return [2 /*return*/, JSON.stringify(updatedResponse)];
            case 3:
                error_1 = _b.sent();
                res.statusCode = 500;
                return [2 /*return*/, JSON.stringify({ error: error_1.message })];
            case 4: return [2 /*return*/, responseBuffer];
        }
    });
}); };
// export const listCertificates = async (
//   params: certgen.ListCertificatesRequest
// ) => {
//   try {
//     const { authToken } = params;
//     delete params.authToken;
//     const data = await proxyRequest({
//       method: "GET",
//       url: "/certificates",
//       authToken,
//       params,
//     });
//     return {
//       status: true,
//       message: "Certificates listed",
//       data,
//     };
//   } catch (error) {
//     return wrapProxyError(error, "Error trying to list certificates");
//   }
// }
// export const createCertificate = async (
//   params: certgen.CreateCertificateRequest,
// ) => {
//   try {
//     const { authToken, userId } = params;
//     delete params.authToken;
//     delete params.userId;
//     const data = await proxyRequest({
//       method: "POST",
//       url: "/certificate",
//       authToken,
//       data: params,
//     });
//     const { headers } = data;
//     const updatedHeaders = publishUnpublishedHeaders(userId, authToken, headers);
//     console.log(updatedHeaders);
//     return {
//       status: true,
//       message: "Certificate created",
//       data: { ...data, headers: updatedHeaders },
//     }
//   } catch (error) {
//     return wrapProxyError(error, "Error trying to create certificate")
//   }
// }
// export const updateCertificate = async ({
//   authToken,
//   userId,
//   certificateId,
//   datas,
// }: certgen.UpdateCertificateRequest) => {
//   try {
//     const data = await proxyRequest({
//       method: "PUT",
//       url: `/certificate/${certificateId}`,
//       authToken,
//       data: datas,
//     });
//     const { headers } = data;
//     const updatedHeaders = publishUnpublishedHeaders(userId, authToken, headers);
//     return {
//       status: true,
//       message: "Certificate created",
//       data: { ...data, headers: updatedHeaders },
//     }
//   } catch (error) {
//     return wrapProxyError(error, "Error trying to update certificate");
//   }
// }
