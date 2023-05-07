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
exports.uploadBase64 = exports.upload = void 0;
var s3_1 = __importDefault(require("aws-sdk/clients/s3"));
var file_type_1 = require("file-type");
var fs_1 = __importDefault(require("fs"));
var uuid_1 = require("uuid");
var storage_1 = require("../types/storage");
var getEnv = function () {
    var _a = process.env, AWS_ACCESS_KEY_ID = _a.AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY = _a.AWS_SECRET_ACCESS_KEY, AWS_BUCKET_NAME = _a.AWS_BUCKET_NAME;
    var s3 = new s3_1["default"]({
        accessKeyId: AWS_ACCESS_KEY_ID,
        secretAccessKey: AWS_SECRET_ACCESS_KEY
    });
    return { s3: s3, AWS_ACCESS_KEY_ID: AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY: AWS_SECRET_ACCESS_KEY, AWS_BUCKET_NAME: AWS_BUCKET_NAME };
};
var upload = function (payload) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, AWS_BUCKET_NAME, s3, Body, mime, upload_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = getEnv(), AWS_BUCKET_NAME = _a.AWS_BUCKET_NAME, s3 = _a.s3;
                Body = fs_1["default"].readFileSync(payload.path);
                return [4 /*yield*/, (0, file_type_1.fromBuffer)(Body)];
            case 1:
                mime = (_b.sent()).mime;
                try {
                    upload_1 = s3.upload({
                        Bucket: AWS_BUCKET_NAME,
                        Key: (0, uuid_1.v4)(),
                        Body: Body
                    });
                    return [2 /*return*/, { url: upload_1.Location, mime: mime }];
                }
                catch (error) {
                    return [2 /*return*/, false];
                }
                return [2 /*return*/];
        }
    });
}); };
exports.upload = upload;
var uploadBase64 = function (payloadString) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, AWS_BUCKET_NAME, s3, mime_1, upload_2, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = getEnv(), AWS_BUCKET_NAME = _a.AWS_BUCKET_NAME, s3 = _a.s3;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, (0, file_type_1.fromBuffer)(Buffer.from(payloadString.replace(storage_1.DATAURI_REGEX, ''), 'base64'))];
            case 2:
                mime_1 = (_b.sent()).mime;
                payloadString = payloadString.startsWith('data:') ?
                    payloadString :
                    "data:".concat(mime_1, ";base64,").concat(payloadString);
                upload_2 = s3.upload({
                    Bucket: AWS_BUCKET_NAME,
                    Key: (0, uuid_1.v4)(),
                    Body: payloadString,
                    ContentEncoding: 'base64',
                    ContentType: mime_1
                });
                return [2 /*return*/, { url: upload_2.Location, mime: mime_1 }];
            case 3:
                error_1 = _b.sent();
                return [2 /*return*/, false];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.uploadBase64 = uploadBase64;
