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
exports.send = void 0;
var ses_1 = __importDefault(require("aws-sdk/clients/ses"));
var _1 = require(".");
var send = function (_a) {
    var to = _a.to, subject = _a.subject, text = _a.text, _b = _a.html, html = _b === void 0 ? null : _b, _c = _a.from, from = _c === void 0 ? '' : _c, _d = _a.fromName, fromName = _d === void 0 ? '' : _d;
    return __awaiter(void 0, void 0, void 0, function () {
        var _e, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, EMAIL_FROM, EMAIL_NAME, ses_2, params_1, send_1, error_1;
        return __generator(this, function (_f) {
            switch (_f.label) {
                case 0:
                    _e = process.env, AWS_ACCESS_KEY_ID = _e.AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY = _e.AWS_SECRET_ACCESS_KEY, EMAIL_FROM = _e.EMAIL_FROM, EMAIL_NAME = _e.EMAIL_NAME;
                    _f.label = 1;
                case 1:
                    _f.trys.push([1, 3, , 4]);
                    ses_2 = new ses_1["default"]({
                        accessKeyId: AWS_ACCESS_KEY_ID,
                        secretAccessKey: AWS_SECRET_ACCESS_KEY,
                        apiVersion: '2010-12-01',
                        region: 'ap-south-1'
                    });
                    from = "".concat(fromName || EMAIL_NAME, " <").concat(from || EMAIL_FROM, ">");
                    params_1 = {
                        Destination: {
                            ToAddresses: (0, _1.generateReciepient3)(to)
                        },
                        Source: from,
                        Message: {
                            Body: {
                                Text: {
                                    Data: text,
                                    Charset: 'utf-8'
                                },
                                Html: {
                                    Data: html,
                                    Charset: 'utf-8'
                                }
                            },
                            Subject: {
                                Data: subject
                            }
                        }
                    };
                    send_1 = new Promise(function (resolve, reject) {
                        ses_2.sendEmail(params_1, function (err, data) {
                            if (err) {
                                reject(err.message);
                            }
                            else {
                                resolve(data);
                            }
                        });
                    });
                    return [4 /*yield*/, send_1];
                case 2:
                    _f.sent();
                    return [2 /*return*/, true];
                case 3:
                    error_1 = _f.sent();
                    return [2 /*return*/, false];
                case 4: return [2 /*return*/];
            }
        });
    });
};
exports.send = send;
