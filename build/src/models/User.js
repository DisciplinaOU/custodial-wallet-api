"use strict";
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
exports.User = void 0;
var bcryptjs_1 = __importDefault(require("bcryptjs"));
var jose = __importStar(require("jose"));
var crypto = __importStar(require("crypto"));
var sequelize_1 = require("sequelize");
var env_1 = require("../configs/env");
var db_1 = require("../configs/db");
var walletSecretHash = crypto.createHash("sha256").update(env_1.walletSecret).digest();
var User = db_1.db.define("User", {
    id: { type: sequelize_1.DataTypes.UUID, primaryKey: true },
    email: { type: sequelize_1.DataTypes.STRING, allowNull: false, unique: true },
    firstname: { type: sequelize_1.DataTypes.STRING },
    lastname: { type: sequelize_1.DataTypes.STRING },
    othernames: { type: sequelize_1.DataTypes.STRING },
    avatar: { type: sequelize_1.DataTypes.STRING },
    ethereumAddress: { type: sequelize_1.DataTypes.STRING },
    role: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        defaultValue: "user",
        values: ["user", "admin"]
    },
    permissions: {
        type: sequelize_1.DataTypes.ARRAY(sequelize_1.DataTypes.STRING),
        defaultValue: [],
        allowNull: false
    },
    phone: { type: sequelize_1.DataTypes.STRING },
    location: { type: sequelize_1.DataTypes.STRING },
    password: { type: sequelize_1.DataTypes.STRING },
    ethereumAccount: { type: sequelize_1.DataTypes.TEXT },
    gender: { type: sequelize_1.DataTypes.STRING },
    dob: { type: sequelize_1.DataTypes.DATE },
    isDeleted: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
    },
    verifiedemail: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
    },
    verifiedphone: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
    },
    active: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false
    },
    loginValidFrom: {
        type: sequelize_1.DataTypes.STRING,
        defaultValue: Date.now(),
        allowNull: false
    }
}, { timestamps: true, tableName: "user" });
exports.User = User;
var securePasswordAndAccount = function (user, options) { return __awaiter(void 0, void 0, void 0, function () {
    var salt, _a, acc;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                if (!user.changed("password")) return [3 /*break*/, 3];
                return [4 /*yield*/, bcryptjs_1["default"].genSalt()];
            case 1:
                salt = _b.sent();
                _a = user;
                return [4 /*yield*/, bcryptjs_1["default"].hash(user.password, salt)];
            case 2:
                _a.password = _b.sent();
                _b.label = 3;
            case 3:
                if (!(user.changed("ethereumAccount") && typeof user.ethereumAccount !== "string")) return [3 /*break*/, 5];
                return [4 /*yield*/, new jose.EncryptJWT(user.ethereumAccount)
                        .setProtectedHeader({ alg: "dir", enc: "A128CBC-HS256" })
                        .encrypt(walletSecretHash)];
            case 4:
                acc = _b.sent();
                user.ethereumAccount = acc;
                _b.label = 5;
            case 5: return [2 /*return*/];
        }
    });
}); };
User.beforeValidate(securePasswordAndAccount);
User.prototype.toJSON = function () {
    var data = this.dataValues;
    delete data.password;
    delete data.isDeleted;
    delete data.active;
    delete data.role;
    delete data.permissions;
    delete data.loginValidFrom;
    delete data.ethereumAccount;
    delete data.bitcoinAccount;
    return data;
};
User.prototype.validatePassword = function (val) {
    return bcryptjs_1["default"].compareSync(val, this.getDataValue("password"));
};
User.prototype.resolveAccount = function (_a) {
    var _b = _a.account, account = _b === void 0 ? "ethereum" : _b;
    return __awaiter(this, void 0, void 0, function () {
        var payload;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4 /*yield*/, jose.jwtDecrypt(this.getDataValue("".concat(account, "Account")), walletSecretHash)];
                case 1:
                    payload = (_c.sent()).payload;
                    return [2 /*return*/, payload];
            }
        });
    });
};
