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
var mocha_1 = require("mocha");
var bitcoin = __importStar(require("../../src/crypto/bitcoin"));
var mnemonic = 'wine agree vacuum crowd describe damp chapter' +
    ' behind sweet tomato transfer earn';
(0, mocha_1.describe)('--bitcoin--', function () {
    (0, mocha_1.describe)('Generate mnemonic', function () {
        (0, mocha_1.it)('can generate a 24 word mnemonic', function () { return __awaiter(void 0, void 0, void 0, function () {
            var mnemonic;
            return __generator(this, function (_a) {
                mnemonic = bitcoin.generateMnemonic();
                assert_1["default"].equal(mnemonic.split(' ').length, 24);
                return [2 /*return*/];
            });
        }); });
    });
    (0, mocha_1.describe)('Generate HD extended keys', function () {
        (0, mocha_1.it)('can generate xpub key', function () { return __awaiter(void 0, void 0, void 0, function () {
            var xpub;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, bitcoin.generateXPubKeyFromMnemonic({ mnemonic: mnemonic })];
                    case 1:
                        xpub = _a.sent();
                        assert_1["default"].equal(xpub, 'xpub661MyMwAqRbcFqzMQsKoZo7Du8JrGrdNSTpMcLPjWzXLoqzMe' +
                            'iDos3dMundq4xjwKakHmbaTr5mG4QrDCg9vjDqWxMUVBzRbmU7RcGkzNcL');
                        return [2 /*return*/];
                }
            });
        }); });
        (0, mocha_1.it)('can generate xprv key', function () { return __awaiter(void 0, void 0, void 0, function () {
            var xprv;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, bitcoin.generateXPrvKeyFromMnemonic({ mnemonic: mnemonic })];
                    case 1:
                        xprv = _a.sent();
                        assert_1["default"].equal(xprv, 'xprv9s21ZrQH143K3MutJqnoCfAVM6UMsPuX5Etkowz7xezMw3fD7AuZ' +
                            'KFJt4WGDyaxH9Y8htfaNtpRoo4zv373yTGkWoUaJQeybzRp4UGLcgn8');
                        return [2 /*return*/];
                }
            });
        }); });
    });
    (0, mocha_1.describe)('Generate wallets', function () {
        (0, mocha_1.it)('can genarate random address', function () { return __awaiter(void 0, void 0, void 0, function () {
            var address;
            return __generator(this, function (_a) {
                address = bitcoin.createBtcAddress({}).address;
                assert_1["default"].ok(address);
                return [2 /*return*/];
            });
        }); });
        (0, mocha_1.it)('can genarate address from mnemonic', function () { return __awaiter(void 0, void 0, void 0, function () {
            var address;
            return __generator(this, function (_a) {
                address = bitcoin.createBtcAddressFromMnemonic({
                    mnemonic: mnemonic,
                    index: 0
                }).address;
                assert_1["default"].equal(address, 'bc1qjwchj4enqfgle8qxghf5re955q3lp0j8pw74x4');
                return [2 /*return*/];
            });
        }); });
        (0, mocha_1.it)('can genarate address from xpriv key', function () { return __awaiter(void 0, void 0, void 0, function () {
            var xprv, address;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, bitcoin.generateXPrvKeyFromMnemonic({ mnemonic: mnemonic })];
                    case 1:
                        xprv = _a.sent();
                        address = bitcoin.createBtcAddressFromHDKey({
                            hdkey: xprv,
                            index: 0
                        }).address;
                        assert_1["default"].equal(address, 'bc1qjwchj4enqfgle8qxghf5re955q3lp0j8pw74x4');
                        return [2 /*return*/];
                }
            });
        }); });
    });
    (0, mocha_1.describe)('Import wallet', function () {
        (0, mocha_1.it)('can import address with WIF', function () { return __awaiter(void 0, void 0, void 0, function () {
            var address;
            return __generator(this, function (_a) {
                address = bitcoin.importBtcAddress({
                    wif: 'L4ASqnxELDiAMf9aXSk6dexV199fZdnnriwAFkt2FKisaCBcVFCH'
                }).address;
                assert_1["default"].equal(address, 'bc1qffc54jeyr7g4k859d9v8jdt0crsrtaskm5675f');
                return [2 /*return*/];
            });
        }); });
    });
    (0, mocha_1.describe)('Transactions', function () {
        // sender
        var _a = bitcoin.createBtcAddressFromMnemonic({
            mnemonic: mnemonic,
            index: 0,
            testnet: true
        }), sender = _a.address, wif = _a.wif;
        // reciever
        var address = bitcoin.createBtcAddress({ testnet: true }).address;
        (0, mocha_1.it)('can get balance', function () { return __awaiter(void 0, void 0, void 0, function () {
            var balance;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, bitcoin.getBtcBalance({
                            address: sender,
                            testnet: true
                        })];
                    case 1:
                        balance = _a.sent();
                        assert_1["default"].ok('btc' in balance);
                        assert_1["default"].ok('satoshi' in balance);
                        return [2 /*return*/];
                }
            });
        }); });
        (0, mocha_1.it)('can send BTC', function () { return __awaiter(void 0, void 0, void 0, function () {
            var transactionId;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, bitcoin.send({
                            addresses: [address],
                            testnet: true,
                            wif: wif,
                            amounts: [0.0000001]
                        })];
                    case 1:
                        transactionId = (_a.sent()).transactionId;
                        assert_1["default"].ok(transactionId);
                        return [2 /*return*/];
                }
            });
        }); });
        (0, mocha_1.it)('can send BTC using index and HDKey (xprv)', function () { return __awaiter(void 0, void 0, void 0, function () {
            var xprv, wif, transactionId;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, bitcoin.generateXPrvKeyFromMnemonic({
                            mnemonic: mnemonic,
                            testnet: true
                        })];
                    case 1:
                        xprv = _a.sent();
                        wif = bitcoin.createBtcAddressFromHDKey({
                            hdkey: xprv,
                            index: 0,
                            testnet: true
                        }).wif;
                        return [4 /*yield*/, bitcoin.send({
                                addresses: [address],
                                testnet: true,
                                wif: wif,
                                amounts: [0.0000001]
                            })];
                    case 2:
                        transactionId = (_a.sent()).transactionId;
                        assert_1["default"].ok(transactionId);
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
