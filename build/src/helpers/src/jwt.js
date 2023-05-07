"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
exports.__esModule = true;
exports.verify = exports.generate = exports.ed25519PrivateToPublic = void 0;
var jose = __importStar(require("jose"));
var ed25519PrivateToPublic = function (privateKey) { return __awaiter(void 0, void 0, void 0, function () {
    var jwk;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, jose.exportJWK(privateKey)];
            case 1:
                jwk = _a.sent();
                delete jwk.d;
                return [2 /*return*/, jose.importJWK(jwk, "EdDSA")];
        }
    });
}); };
exports.ed25519PrivateToPublic = ed25519PrivateToPublic;
var generate = function (_a) {
    var payload = _a.payload, secret = _a.secret, _b = _a.expiresIn, expiresIn = _b === void 0 ? null : _b;
    return __awaiter(void 0, void 0, void 0, function () {
        var publicKey, pubkeyJWK, header, token;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4 /*yield*/, (0, exports.ed25519PrivateToPublic)(secret)];
                case 1:
                    publicKey = _c.sent();
                    return [4 /*yield*/, jose.exportJWK(publicKey)];
                case 2:
                    pubkeyJWK = _c.sent();
                    header = {
                        alg: "EdDSA",
                        jwk: pubkeyJWK
                    };
                    token = new jose.SignJWT(payload).setProtectedHeader(header);
                    if (expiresIn) {
                        token = token.setExpirationTime(expiresIn);
                    }
                    return [2 /*return*/, token.sign(secret)];
            }
        });
    });
};
exports.generate = generate;
var verify = function (_a) {
    var token = _a.token, secret = _a.secret;
    return __awaiter(void 0, void 0, void 0, function () {
        var data;
        return __generator(this, function (_b) {
            try {
                token = token.replace('Bearer ', '');
                data = jose.jwtVerify(token, secret);
                if (!Object.keys(data).length)
                    return [2 /*return*/, false];
                return [2 /*return*/, data];
            }
            catch (error) {
                return [2 /*return*/, false];
            }
            return [2 /*return*/];
        });
    });
};
exports.verify = verify;
