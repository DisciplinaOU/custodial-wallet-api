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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.resetPassword = exports.verifyReset = exports.initiateReset = exports.verifyAccount = exports.signIn = exports.signUp = void 0;
var bcryptjs_1 = __importDefault(require("bcryptjs"));
var randomstring_1 = __importDefault(require("randomstring"));
var utils_1 = require("../../utils");
var uuid_1 = require("uuid");
var env_1 = require("../../configs/env");
var models_1 = require("../../models");
var msg = __importStar(require("../message-templates"));
var wallet = __importStar(require("../wallet/services"));
/**
 * Creates user account
 * @param {auth.SignUpRequest} params  Request Body
 * @returns {others.Response} Contains status, message and data if any of the operation
 */
var signUp = function (params) { return __awaiter(void 0, void 0, void 0, function () {
    var email, firstname, _i, _a, param, where, duplicate, id, token, _b, text, html, error_1;
    var _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                _d.trys.push([0, 8, , 9]);
                email = params.email, firstname = params.firstname;
                _i = 0, _a = ["email", "phone"];
                _d.label = 1;
            case 1:
                if (!(_i < _a.length)) return [3 /*break*/, 4];
                param = _a[_i];
                where = (_c = {}, _c[param] = params[param], _c);
                return [4 /*yield*/, models_1.User.findOne(where)];
            case 2:
                duplicate = _d.sent();
                if (duplicate) {
                    return [2 /*return*/, {
                            status: false,
                            message: "This ".concat(param, " has been used to open an account on this platform")
                        }];
                }
                _d.label = 3;
            case 3:
                _i++;
                return [3 /*break*/, 1];
            case 4:
                id = (0, uuid_1.v4)();
                return [4 /*yield*/, models_1.User.create(__assign({ id: id }, params))];
            case 5:
                _d.sent();
                return [4 /*yield*/, (0, utils_1.rethrow)(wallet.createWallet({ userId: id }))];
            case 6:
                _d.sent();
                return [4 /*yield*/, generateToken({
                        userId: id,
                        length: 10
                    })];
            case 7:
                token = _d.sent();
                _b = msg.registration({ token: token, firstname: firstname, email: email }), text = _b.text, html = _b.html;
                // mail.pepipost.send({
                //   to: email,
                //   subject: "Registration Complete",
                //   text,
                //   html,
                // });
                return [2 /*return*/, { status: true, message: "Registration Successful" }];
            case 8:
                error_1 = _d.sent();
                return [2 /*return*/, {
                        status: false,
                        message: "Error trying to create account".concat(env_1.devEnv ? ": " + error_1 : "")
                    }];
            case 9: return [2 /*return*/];
        }
    });
}); };
exports.signUp = signUp;
/**
 * Login
 * @param {auth.SignInRequest} params  Request Body
 * @returns {others.Response} Contains status, message and data if any of the operation
 */
var signIn = function (params, config) { return __awaiter(void 0, void 0, void 0, function () {
    var email, password, user, token, _a, text, html, data, error_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 5, , 6]);
                email = params.email, password = params.password;
                return [4 /*yield*/, models_1.User.findOne({
                        where: { email: email }
                    })];
            case 1:
                user = _b.sent();
                if (!user || !bcryptjs_1["default"].compareSync(password, user.password)) {
                    return [2 /*return*/, { status: false, message: "Invalid username or password" }];
                }
                if (!user.active) {
                    return [2 /*return*/, { status: false, message: "Account is banned contact admin" }];
                }
                if (!!user.verifiedemail) return [3 /*break*/, 3];
                return [4 /*yield*/, generateToken({
                        userId: user.id,
                        length: 10
                    })];
            case 2:
                token = _b.sent();
                _a = msg.verifyEmail({
                    token: token,
                    firstname: user.firstname,
                    email: user.email
                }), text = _a.text, html = _a.html;
                // mail.pepipost.send({
                //   to: user.email,
                //   subject: "Verify your email",
                //   text,
                //   html,
                // });
                return [2 /*return*/, { status: false, message: "Please verify your email" }];
            case 3: return [4 /*yield*/, (0, utils_1.generate)({
                    payload: { data: { publicAddress: user.ethereumAddress } },
                    expiresIn: "7d",
                    secret: config.jwtSecret
                })];
            case 4:
                data = _b.sent();
                return [2 /*return*/, { status: true, message: "Login successful", data: data }];
            case 5:
                error_2 = _b.sent();
                return [2 /*return*/, {
                        status: false,
                        message: "Error trying to login".concat(env_1.devEnv ? ": " + error_2 : "")
                    }];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.signIn = signIn;
/**
 * Verify user account
 * @param {auth.VerifyRequest} params  Request Body
 * @returns {others.Response} Contains status, message and data if any of the operation
 */
var verifyAccount = function (params) { return __awaiter(void 0, void 0, void 0, function () {
    var token, email, user_1, token_1, _a, text, html, _token, user, error_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 8, , 9]);
                token = params.token, email = params.email;
                if (!email) return [3 /*break*/, 3];
                return [4 /*yield*/, models_1.User.findOne({
                        where: { email: email }
                    })];
            case 1:
                user_1 = _b.sent();
                if (!user_1)
                    return [2 /*return*/, { status: false, message: "User does not exist" }];
                return [4 /*yield*/, generateToken({
                        userId: user_1.id,
                        length: 10
                    })];
            case 2:
                token_1 = _b.sent();
                _a = msg.verifyEmail({
                    token: token_1,
                    firstname: user_1.firstname,
                    email: user_1.email
                }), text = _a.text, html = _a.html;
                // mail.pepipost.send({
                //   to: user.email,
                //   subject: "Verify your email",
                //   text,
                //   html,
                // });
                return [2 /*return*/, { status: true, message: "Check your email" }];
            case 3: return [4 /*yield*/, models_1.Token.findOne({
                    where: { token: token, tokenType: "verify", active: true }
                })];
            case 4:
                _token = _b.sent();
                if (!_token) {
                    return [2 /*return*/, { status: false, message: "Invalid token" }];
                }
                return [4 /*yield*/, _token.update({ active: false })];
            case 5:
                _b.sent();
                if (parseInt(_token.expires) < Date.now()) {
                    return [2 /*return*/, { status: false, message: "Token expired" }];
                }
                return [4 /*yield*/, models_1.User.findByPk(_token.UserId)];
            case 6:
                user = _b.sent();
                if (!user) {
                    return [2 /*return*/, { status: false, message: "Invalid token" }];
                }
                return [4 /*yield*/, user.update({ verifiedemail: true })];
            case 7:
                _b.sent();
                return [2 /*return*/, { status: true, message: "Account verified" }];
            case 8:
                error_3 = _b.sent();
                return [2 /*return*/, {
                        status: false,
                        message: "Error trying to verify account".concat(env_1.devEnv ? ": " + error_3 : "")
                    }];
            case 9: return [2 /*return*/];
        }
    });
}); };
exports.verifyAccount = verifyAccount;
/**
 * Reset user account password
 * @param {auth.InitiateResetRequest} params  Request Body
 * @returns {others.Response} Contains status, message and data if any of the operation
 */
var initiateReset = function (params) { return __awaiter(void 0, void 0, void 0, function () {
    var email, user, token, _a, text, html, error_4;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 3, , 4]);
                email = params.email;
                return [4 /*yield*/, models_1.User.findOne({
                        where: { email: email, isDeleted: false }
                    })];
            case 1:
                user = _b.sent();
                if (!user) {
                    return [2 /*return*/, { status: true, message: "Check your email" }];
                }
                return [4 /*yield*/, generateToken({
                        userId: user.id,
                        tokenType: "reset",
                        length: 15
                    })];
            case 2:
                token = _b.sent();
                _a = msg.resetPassword({
                    token: token,
                    firstname: user.firstname
                }), text = _a.text, html = _a.html;
                // mail.pepipost.send({
                //   to: user.email,
                //   subject: "Reset Password",
                //   text,
                //   html,
                // });
                return [2 /*return*/, { status: true, message: "Check your email" }];
            case 3:
                error_4 = _b.sent();
                return [2 /*return*/, {
                        status: false,
                        message: "Error trying to login".concat(env_1.devEnv ? ": " + error_4 : "")
                    }];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.initiateReset = initiateReset;
/**
 * Verify user reset token
 * @param {auth.VerifyRequest} params  Request Body
 * @returns {others.Response} Contains status, message and data if any of the operation
 */
var verifyReset = function (params) { return __awaiter(void 0, void 0, void 0, function () {
    var token, _token, user, data, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 5, , 6]);
                token = params.token;
                return [4 /*yield*/, models_1.Token.findOne({
                        where: { token: token, tokenType: "reset", active: true }
                    })];
            case 1:
                _token = _a.sent();
                if (!_token) {
                    return [2 /*return*/, { status: false, message: "Invalid token" }];
                }
                return [4 /*yield*/, _token.update({ active: false })];
            case 2:
                _a.sent();
                if (parseInt(_token.expires) < Date.now()) {
                    return [2 /*return*/, { status: false, message: "Token expired" }];
                }
                return [4 /*yield*/, models_1.User.findByPk(_token.UserId)];
            case 3:
                user = _a.sent();
                if (!user) {
                    return [2 /*return*/, { status: false, message: "Invalid token" }];
                }
                return [4 /*yield*/, generateToken({
                        userId: user.id,
                        length: 12,
                        tokenType: "update"
                    })];
            case 4:
                data = _a.sent();
                return [2 /*return*/, { status: true, message: "Valid token", data: data }];
            case 5:
                error_5 = _a.sent();
                return [2 /*return*/, {
                        status: false,
                        message: "Error trying to login".concat(env_1.devEnv ? ": " + error_5 : "")
                    }];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.verifyReset = verifyReset;
/**
 * Reset user password
 * @param {auth.ResetPasswordRequest} params  Request Body
 * @returns {others.Response} Contains status, message and data if any of the operation
 */
var resetPassword = function (params) { return __awaiter(void 0, void 0, void 0, function () {
    var token, password, logOtherDevicesOut, _token, user, update, error_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 5, , 6]);
                token = params.token, password = params.password, logOtherDevicesOut = params.logOtherDevicesOut;
                return [4 /*yield*/, models_1.Token.findOne({
                        where: { token: token, tokenType: "update", active: true }
                    })];
            case 1:
                _token = _a.sent();
                if (!_token) {
                    return [2 /*return*/, { status: false, message: "Invalid token" }];
                }
                return [4 /*yield*/, _token.update({ active: false })];
            case 2:
                _a.sent();
                if (parseInt(_token.expires) < Date.now()) {
                    return [2 /*return*/, { status: false, message: "Token expired" }];
                }
                return [4 /*yield*/, models_1.User.findByPk(_token.UserId)];
            case 3:
                user = _a.sent();
                if (!user) {
                    return [2 /*return*/, { status: false, message: "Invalid token" }];
                }
                update = { password: password };
                if (logOtherDevicesOut)
                    update.loginValidFrom = Date.now();
                return [4 /*yield*/, user.update(update)];
            case 4:
                _a.sent();
                return [2 /*return*/, { status: true, message: "Password updated" }];
            case 5:
                error_6 = _a.sent();
                return [2 /*return*/, {
                        status: false,
                        message: "Error trying to reset password".concat(env_1.devEnv ? ": " + error_6 : "")
                    }];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.resetPassword = resetPassword;
var generateToken = function (_a) {
    var userId = _a.userId, _b = _a.tokenType, tokenType = _b === void 0 ? "verify" : _b, _c = _a.medium, medium = _c === void 0 ? "any" : _c, _d = _a.expiresMins, expiresMins = _d === void 0 ? 5 : _d, _e = _a.charset, charset = _e === void 0 ? "alphanumeric" : _e, _f = _a.length, length = _f === void 0 ? 5 : _f;
    return __awaiter(void 0, void 0, void 0, function () {
        var token;
        return __generator(this, function (_g) {
            switch (_g.label) {
                case 0: return [4 /*yield*/, models_1.Token.update({ active: false }, { where: { UserId: userId, tokenType: tokenType, active: true } })];
                case 1:
                    _g.sent();
                    token = randomstring_1["default"].generate({
                        charset: charset,
                        length: length,
                        capitalization: "uppercase"
                    });
                    return [4 /*yield*/, models_1.Token.create({
                            id: (0, uuid_1.v4)(),
                            tokenType: tokenType,
                            token: token,
                            UserId: userId,
                            medium: medium,
                            expires: Date.now() + 60 * 1000 * expiresMins
                        })];
                case 2:
                    _g.sent();
                    return [2 /*return*/, token];
            }
        });
    });
};
