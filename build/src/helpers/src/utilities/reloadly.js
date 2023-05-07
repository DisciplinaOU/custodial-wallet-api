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
exports.request = void 0;
var node_fetch_1 = __importDefault(require("node-fetch"));
var auth = function () { return __awaiter(void 0, void 0, void 0, function () {
    var _a, RELOADLY_CLIENT_ID, RELOADLY_CLIENT_SECRET, response;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = process.env, RELOADLY_CLIENT_ID = _a.RELOADLY_CLIENT_ID, RELOADLY_CLIENT_SECRET = _a.RELOADLY_CLIENT_SECRET;
                return [4 /*yield*/, (0, node_fetch_1["default"])('https://auth.reloadly.com/oauth/token', {
                        method: 'post',
                        headers: { 'content-type': 'application/json' },
                        body: JSON.stringify({
                            client_id: RELOADLY_CLIENT_ID,
                            client_secret: RELOADLY_CLIENT_SECRET,
                            grant_type: 'client_credentials',
                            audience: 'https://topups.reloadly.com'
                        })
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
    var url = _a.url, method = _a.method, _b = _a.body, body = _b === void 0 ? null : _b;
    return __awaiter(void 0, void 0, void 0, function () {
        var access_token, response, error_1;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 4, , 5]);
                    if (body) {
                        body = JSON.stringify(body);
                    }
                    return [4 /*yield*/, auth()];
                case 1:
                    access_token = (_c.sent()).access_token;
                    return [4 /*yield*/, (0, node_fetch_1["default"])("https://topups.reloadly.com/".concat(url), {
                            method: method,
                            headers: {
                                'authorization': "Bearer ".concat(access_token),
                                'content-type': 'application/json'
                            },
                            body: body
                        })];
                case 2:
                    response = _c.sent();
                    return [4 /*yield*/, response.json()];
                case 3:
                    response = _c.sent();
                    return [2 /*return*/, response];
                case 4:
                    error_1 = _c.sent();
                    return [2 /*return*/, {
                            status: false,
                            message: 'An error occured calling reloadly'
                        }];
                case 5: return [2 /*return*/];
            }
        });
    });
};
exports.request = request;