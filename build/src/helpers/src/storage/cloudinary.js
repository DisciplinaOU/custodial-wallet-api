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
var cloudinary_1 = require("cloudinary");
var file_type_1 = require("file-type");
var fs_1 = __importDefault(require("fs"));
var storage_1 = require("../types/storage");
var upload = function (payload) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, api_key, api_secret, cloud_name, upload_1, mime_1, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 3, , 4]);
                _a = process.env, api_key = _a.CLOUDINARY_API_KEY, api_secret = _a.CLOUDINARY_API_SECRET, cloud_name = _a.CLOUDINARY_CLOUD_NAME;
                cloudinary_1.v2.config({ api_key: api_key, api_secret: api_secret, cloud_name: cloud_name });
                return [4 /*yield*/, cloudinary_1.v2.uploader.upload(payload.path)];
            case 1:
                upload_1 = _b.sent();
                return [4 /*yield*/, (0, file_type_1.fromBuffer)(fs_1["default"].readFileSync(payload.path))];
            case 2:
                mime_1 = (_b.sent()).mime;
                return [2 /*return*/, { url: upload_1.secure_url, mime: mime_1 }];
            case 3:
                error_1 = _b.sent();
                return [2 /*return*/, false];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.upload = upload;
var uploadBase64 = function (payloadString) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, api_key, api_secret, cloud_name, mime_2, upload_2, error_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 3, , 4]);
                _a = process.env, api_key = _a.CLOUDINARY_API_KEY, api_secret = _a.CLOUDINARY_API_SECRET, cloud_name = _a.CLOUDINARY_CLOUD_NAME;
                return [4 /*yield*/, (0, file_type_1.fromBuffer)(Buffer.from(payloadString.replace(storage_1.DATAURI_REGEX, ''), 'base64'))];
            case 1:
                mime_2 = (_b.sent()).mime;
                payloadString = payloadString.startsWith('data:') ?
                    payloadString :
                    "data:".concat(mime_2, ";base64,").concat(payloadString);
                cloudinary_1.v2.config({ api_key: api_key, api_secret: api_secret, cloud_name: cloud_name });
                return [4 /*yield*/, cloudinary_1.v2.uploader.upload(payloadString)];
            case 2:
                upload_2 = _b.sent();
                return [2 /*return*/, { url: upload_2.secure_url, mime: mime_2 }];
            case 3:
                error_2 = _b.sent();
                return [2 /*return*/, false];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.uploadBase64 = uploadBase64;
