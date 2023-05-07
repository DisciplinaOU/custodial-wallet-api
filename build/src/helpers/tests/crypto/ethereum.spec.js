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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var assert_1 = __importDefault(require("assert"));
var dotenv_1 = require("dotenv");
var mocha_1 = require("mocha");
var ethereum = __importStar(require("../../src/crypto/ethereum"));
(0, dotenv_1.config)();
var mnemonic = 'wine agree vacuum crowd describe damp chapter' +
    ' behind sweet tomato transfer earn';
(0, mocha_1.describe)('--ethereum--', function () {
    (0, mocha_1.describe)('Generate HD extended keys', function () {
        (0, mocha_1.it)('can generate xpub key', function () { return __awaiter(void 0, void 0, void 0, function () {
            var xpub;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, ethereum.generateXPubKeyFromMnemonic({ mnemonic: mnemonic })];
                    case 1:
                        xpub = _a.sent();
                        assert_1["default"].equal(xpub, 'xpub661MyMwAqRbcFqzMQsKoZo7Du8JrGrdNSTpMcLPjWzXLoqzMeiDos3dMundq' +
                            '4xjwKakHmbaTr5mG4QrDCg9vjDqWxMUVBzRbmU7RcGkzNcL');
                        return [2 /*return*/];
                }
            });
        }); });
        (0, mocha_1.it)('can generate xprv key', function () { return __awaiter(void 0, void 0, void 0, function () {
            var xprv;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, ethereum.generateXPrvKeyFromMnemonic({ mnemonic: mnemonic })];
                    case 1:
                        xprv = _a.sent();
                        assert_1["default"].equal(xprv, 'xprv9s21ZrQH143K3MutJqnoCfAVM6UMsPuX5Etkowz7xezMw3fD7AuZKFJt4' +
                            'WGDyaxH9Y8htfaNtpRoo4zv373yTGkWoUaJQeybzRp4UGLcgn8');
                        return [2 /*return*/];
                }
            });
        }); });
    });
    (0, mocha_1.describe)('Generate wallets', function () {
        (0, mocha_1.it)('can generate random address', function () { return __awaiter(void 0, void 0, void 0, function () {
            var address;
            return __generator(this, function (_a) {
                address = ethereum.createEthAddress().address;
                assert_1["default"].ok(address);
                return [2 /*return*/];
            });
        }); });
        (0, mocha_1.it)('can generate address from mnemonic', function () { return __awaiter(void 0, void 0, void 0, function () {
            var address;
            return __generator(this, function (_a) {
                address = ethereum.createEthAddressFromMnemonic({
                    mnemonic: mnemonic,
                    index: 0
                }).address;
                assert_1["default"].equal(address, '0x6EB14A9a24eB2233731851810192A5c79B37F5C3');
                return [2 /*return*/];
            });
        }); });
        (0, mocha_1.it)('can generate address from xprv', function () { return __awaiter(void 0, void 0, void 0, function () {
            var xprv, address;
            return __generator(this, function (_a) {
                xprv = 'xprv9s21ZrQH143K3MutJqnoCfAVM6UMsPuX5Etkowz7xezMw3fD7AuZKFJt4WGD' +
                    'yaxH9Y8htfaNtpRoo4zv373yTGkWoUaJQeybzRp4UGLcgn8';
                address = ethereum.createEthAddressFromXPrv({
                    xprv: xprv,
                    index: 1
                }).address;
                assert_1["default"].equal(address, '0x54A31cBDB169B9C7054A926bf0bEAa5853C69A2F');
                return [2 /*return*/];
            });
        }); });
    });
    (0, mocha_1.describe)('Import wallet', function () {
        (0, mocha_1.it)('can import address with private key', function () { return __awaiter(void 0, void 0, void 0, function () {
            var address;
            return __generator(this, function (_a) {
                address = ethereum.importEthAddress({
                    privateKey: '0xea4fbcf6d15e27d4341549f8707a87cb40440c28d59580db82fa7013c4cd363c'
                }).address;
                assert_1["default"].equal(address, '0x287B7Df28D116839be46304dbcED3f3980319b40');
                return [2 /*return*/];
            });
        }); });
    });
    (0, mocha_1.describe)('Get Balances', function () {
        var address = ethereum.createEthAddressFromMnemonic({
            mnemonic: mnemonic,
            index: 0
        }).address;
        (0, mocha_1.it)('can get ETH balance', function () { return __awaiter(void 0, void 0, void 0, function () {
            var balance;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, ethereum.getEthBalance({
                            address: address,
                            network: 'kovan'
                        })];
                    case 1:
                        balance = _a.sent();
                        assert_1["default"].ok('ethers' in balance);
                        assert_1["default"].ok('wei' in balance);
                        return [2 /*return*/];
                }
            });
        }); });
        (0, mocha_1.it)('can get ERC20 token balance (cUSDT)', function () { return __awaiter(void 0, void 0, void 0, function () {
            var balance;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, ethereum.getERC20Balance({
                            address: address,
                            network: 'kovan',
                            contractAddress: '0xF6958Cf3127e62d3EB26c79F4f45d3F3b2CcdeD4',
                            decimals: 18
                        })];
                    case 1:
                        balance = _a.sent();
                        assert_1["default"].ok('ethers' in balance);
                        assert_1["default"].ok('wei' in balance);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    (0, mocha_1.describe)('Send funds', function () {
        // sender
        var privateKey = ethereum.createEthAddressFromMnemonic({
            mnemonic: mnemonic,
            index: 0
        }).privateKey;
        // reciever
        var address = ethereum.createEthAddress().address;
        (0, mocha_1.it)('can send ETH', function () { return __awaiter(void 0, void 0, void 0, function () {
            var hash;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, ethereum.sendEth({
                            address: address,
                            amount: 0.000001,
                            privateKey: privateKey,
                            network: 'kovan'
                        })];
                    case 1:
                        hash = (_a.sent()).hash;
                        assert_1["default"].ok(hash);
                        return [2 /*return*/];
                }
            });
        }); });
        (0, mocha_1.it)('can send ERC20 token (cUSDT)', function () { return __awaiter(void 0, void 0, void 0, function () {
            var hash;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, ethereum.sendERC20Token({
                            address: address,
                            amount: 1,
                            privateKey: privateKey,
                            network: 'kovan',
                            contractAddress: '0xF6958Cf3127e62d3EB26c79F4f45d3F3b2CcdeD4',
                            decimals: 8
                        })];
                    case 1:
                        hash = (_a.sent()).hash;
                        assert_1["default"].ok(hash);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    (0, mocha_1.describe)('Drain funds', function () {
        // reciever
        var _a = ethereum.createEthAddressFromMnemonic({
            mnemonic: mnemonic,
            index: 0
        }), address = _a.address, gasSupplierPrivateKey = _a.privateKey;
        // sender
        var privateKey = ethereum.importEthAddress({
            privateKey: '0xcdc2939e3dd2c4a66a7311d04a88540633cdc569a8cb189de540be62176caa52'
        }).privateKey;
        (0, mocha_1.it)('can drain ETH', function () { return __awaiter(void 0, void 0, void 0, function () {
            var hash;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, ethereum.drainEth({
                            address: address,
                            privateKey: privateKey,
                            network: 'kovan'
                        })];
                    case 1:
                        hash = (_a.sent()).transaction.hash;
                        assert_1["default"].ok(hash);
                        return [2 /*return*/];
                }
            });
        }); });
        (0, mocha_1.it)('can drain ERC20', function () { return __awaiter(void 0, void 0, void 0, function () {
            var hash;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, ethereum.drainERC20Token({
                            address: address,
                            privateKey: privateKey,
                            network: 'kovan',
                            contractAddress: '0xD9BA894E0097f8cC2BBc9D24D308b98e36dc6D02',
                            gasSupplierPrivateKey: gasSupplierPrivateKey
                        })];
                    case 1:
                        hash = (_a.sent()).transaction.hash;
                        assert_1["default"].ok(hash);
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
