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
exports.getBtcTransaction = exports.getBtcTransactions = exports.drainWithMnemonic = exports.drainWithHDKey = exports.drain = exports.sendTransaction = exports.sendWithMnemonic = exports.sendWithHDKey = exports.send = exports.estimateFee = exports.getBtcBalance = exports.importBtcAddress = exports.createBtcAddressFromHDKey = exports.createBtcAddressFromMnemonic = exports.createBtcAddress = exports.generateXPrvKeyFromMnemonic = exports.generateXPubKeyFromMnemonic = exports.entropyToMnemonic = exports.mnemonicToEntropy = exports.generateMnemonic = exports.satoshiToBtc = exports.parseBTC = void 0;
var bitcoin = __importStar(require("bitcoinjs-lib"));
var ecpair_1 = __importDefault(require("ecpair"));
var bip32_1 = __importDefault(require("bip32"));
var bip39 = __importStar(require("bip39"));
var node_fetch_1 = __importDefault(require("node-fetch"));
var ecc = __importStar(require("tiny-secp256k1"));
var ECPair = (0, ecpair_1["default"])(ecc);
var bip32 = (0, bip32_1["default"])(ecc);
var validator = function (pubkey, msghash, signature) { return ECPair.fromPublicKey(pubkey).verify(msghash, signature); };
var getBaseURL = function (_a) {
    var _b = _a.testnet, testnet = _b === void 0 ? false : _b;
    return testnet ?
        'https://blockstream.info/testnet/api' :
        'https://blockstream.info/api';
};
var getPath = function (index) { return "m/49'/1'/0'/0/".concat(index, "'"); };
var calculateTxFee = function (_a) {
    var _b = _a.testnet, testnet = _b === void 0 ? false : _b, tx = _a.tx;
    return __awaiter(void 0, void 0, void 0, function () {
        var fee, link, vSize, response, mempool, histogram, _i, histogram_1, h, satoshi, btc;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    link = getBaseURL({ testnet: testnet }) + '/mempool';
                    vSize = tx.virtualSize();
                    return [4 /*yield*/, (0, node_fetch_1["default"])(link)];
                case 1:
                    response = _c.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    mempool = _c.sent();
                    histogram = mempool.fee_histogram;
                    if (histogram.length == 1) {
                        fee = histogram[0][0] * vSize;
                    }
                    else {
                        histogram.sort(function (a, b) { return a[1] - b[1]; });
                        for (_i = 0, histogram_1 = histogram; _i < histogram_1.length; _i++) {
                            h = histogram_1[_i];
                            if (h[1] === histogram[histogram.length - 1][1]) {
                                fee = h[0] * vSize;
                            }
                            if (vSize <= h[1]) {
                                fee = h[0] * vSize;
                                break;
                            }
                        }
                    }
                    satoshi = Math.ceil(fee) | 0;
                    btc = (0, exports.satoshiToBtc)(satoshi);
                    return [2 /*return*/, { satoshi: satoshi, btc: btc }];
            }
        });
    });
};
var gatherUtxos = function (_a) {
    var utxos = _a.utxos, testnet = _a.testnet;
    return __awaiter(void 0, void 0, void 0, function () {
        var network, psbt, total, _i, utxos_1, utxo, txid, index, nonWitnessUtxo;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    network = getBtcNetwork({ testnet: testnet });
                    psbt = new bitcoin.Psbt({ network: network });
                    total = 0;
                    _i = 0, utxos_1 = utxos;
                    _b.label = 1;
                case 1:
                    if (!(_i < utxos_1.length)) return [3 /*break*/, 4];
                    utxo = utxos_1[_i];
                    total += utxo.value;
                    txid = utxo.txid;
                    index = utxo.vout;
                    return [4 /*yield*/, getUtxosHash({
                            txid: txid,
                            testnet: testnet
                        })];
                case 2:
                    nonWitnessUtxo = _b.sent();
                    nonWitnessUtxo = Buffer.from(nonWitnessUtxo, 'hex');
                    psbt.addInput({
                        hash: txid,
                        index: index,
                        nonWitnessUtxo: nonWitnessUtxo
                    });
                    _b.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/, { psbt: psbt, total: total }];
            }
        });
    });
};
var estimateBtcFee = function (_a) {
    var sender = _a.sender, testnet = _a.testnet, amounts = _a.amounts, addresses = _a.addresses, keyPair = _a.keyPair;
    return __awaiter(void 0, void 0, void 0, function () {
        var balance, total, utxos, psbt, i, address, amount, tx;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, (0, exports.getBtcBalance)({
                        address: sender,
                        testnet: testnet
                    })];
                case 1:
                    balance = (_b.sent()).satoshi;
                    amounts = amounts.map(function (amount) { return (0, exports.parseBTC)(amount); });
                    total = amounts.reduce(function (a, b) { return a + b; }, 0);
                    if (total > balance)
                        throw new Error('Insufficient balance');
                    return [4 /*yield*/, getUtxos({ address: sender, testnet: testnet })];
                case 2:
                    utxos = _b.sent();
                    return [4 /*yield*/, gatherUtxos({ utxos: utxos, testnet: testnet })];
                case 3:
                    psbt = (_b.sent()).psbt;
                    for (i = 0; i < addresses.length; i++) {
                        address = addresses[i];
                        amount = amounts[i];
                        psbt.addOutput({ address: address, value: amount });
                        balance -= amount;
                    }
                    psbt.addOutput({ address: sender, value: balance });
                    psbt.signAllInputs(keyPair);
                    psbt.validateSignaturesOfAllInputs(validator);
                    psbt.finalizeAllInputs();
                    tx = psbt.extractTransaction();
                    return [2 /*return*/, calculateTxFee({ tx: tx, testnet: testnet })];
            }
        });
    });
};
var sendBtc = function (_a) {
    var addresses = _a.addresses, amounts = _a.amounts, fee = _a.fee, sender = _a.sender, keyPair = _a.keyPair, _b = _a.testnet, testnet = _b === void 0 ? false : _b;
    return __awaiter(void 0, void 0, void 0, function () {
        var balance, total, utxos, psbt, i, address, amount, tx, body, link, response, text, hexRegex, sent;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    fee = Math.ceil(fee * 1.02) | 0;
                    return [4 /*yield*/, (0, exports.getBtcBalance)({
                            address: sender,
                            testnet: testnet
                        })];
                case 1:
                    balance = (_c.sent()).satoshi;
                    amounts = amounts.map(function (amount) { return (0, exports.parseBTC)(amount); });
                    total = amounts.reduce(function (a, b) { return a + b; }, 0);
                    if (amounts.length !== addresses.length) {
                        throw new Error('Length of addresses and amounts do not match');
                    }
                    if (total > balance)
                        throw new Error('Insufficient balance');
                    return [4 /*yield*/, getUtxos({ address: sender, testnet: testnet })];
                case 2:
                    utxos = _c.sent();
                    return [4 /*yield*/, gatherUtxos({ utxos: utxos, testnet: testnet })];
                case 3:
                    psbt = (_c.sent()).psbt;
                    for (i = 0; i < addresses.length; i++) {
                        address = addresses[i];
                        amount = amounts[i];
                        psbt.addOutput({ address: address, value: amount });
                    }
                    balance = balance - total - fee;
                    psbt.addOutput({ address: sender, value: balance });
                    psbt.signAllInputs(keyPair);
                    psbt.validateSignaturesOfAllInputs(validator);
                    psbt.finalizeAllInputs();
                    tx = psbt.extractTransaction();
                    body = tx.toHex();
                    link = getBaseURL({ testnet: testnet }) + '/tx';
                    return [4 /*yield*/, (0, node_fetch_1["default"])(link, { method: 'post', body: body })];
                case 4:
                    response = _c.sent();
                    return [4 /*yield*/, response.text()];
                case 5:
                    text = _c.sent();
                    hexRegex = /^(0x|0X)?[a-fA-F0-9]+$/;
                    sent = hexRegex.test(text);
                    if (!sent)
                        throw new Error(text);
                    return [2 /*return*/, { transactionId: text }];
            }
        });
    });
};
var drainBtc = function (_a) {
    var to = _a.to, minimumBalance = _a.minimumBalance, sender = _a.sender, keyPair = _a.keyPair, _b = _a.testnet, testnet = _b === void 0 ? false : _b;
    return __awaiter(void 0, void 0, void 0, function () {
        var amount, utxos, psbt, wif, fee, tx, body, link, response, text, hexRegex, sent;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4 /*yield*/, (0, exports.getBtcBalance)({
                        address: sender,
                        testnet: testnet
                    })];
                case 1:
                    amount = (_c.sent()).satoshi;
                    if (amount < minimumBalance)
                        throw new Error('Insufficient balance');
                    return [4 /*yield*/, getUtxos({ address: sender, testnet: testnet })];
                case 2:
                    utxos = _c.sent();
                    return [4 /*yield*/, gatherUtxos({ utxos: utxos, testnet: testnet })];
                case 3:
                    psbt = (_c.sent()).psbt;
                    wif = keyPair.toWIF();
                    return [4 /*yield*/, (0, exports.estimateFee)({
                            wif: wif,
                            addresses: [to],
                            amounts: [(0, exports.satoshiToBtc)(amount)],
                            testnet: testnet
                        })];
                case 4:
                    fee = (_c.sent()).satoshi;
                    psbt.addOutput({ address: to, value: amount - fee });
                    psbt.signAllInputs(keyPair);
                    psbt.validateSignaturesOfAllInputs(validator);
                    psbt.finalizeAllInputs();
                    tx = psbt.extractTransaction();
                    body = tx.toHex();
                    link = getBaseURL({ testnet: testnet }) + '/tx';
                    return [4 /*yield*/, (0, node_fetch_1["default"])(link, { method: 'post', body: body })];
                case 5:
                    response = _c.sent();
                    return [4 /*yield*/, response.text()];
                case 6:
                    text = _c.sent();
                    hexRegex = /^(0x|0X)?[a-fA-F0-9]+$/;
                    sent = hexRegex.test(text);
                    if (!sent)
                        throw new Error(text);
                    return [2 /*return*/, { transactionId: text, amount: amount }];
            }
        });
    });
};
var getBtcNetwork = function (_a) {
    var _b = _a.testnet, testnet = _b === void 0 ? false : _b;
    return testnet ? bitcoin.networks.testnet : bitcoin.networks.bitcoin;
};
var getUtxos = function (_a) {
    var address = _a.address, _b = _a.testnet, testnet = _b === void 0 ? false : _b;
    return __awaiter(void 0, void 0, void 0, function () {
        var link, response, data;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    link = getBaseURL({ testnet: testnet }) + "/address/".concat(address, "/utxo");
                    return [4 /*yield*/, (0, node_fetch_1["default"])(link)];
                case 1:
                    response = _c.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _c.sent();
                    return [2 /*return*/, data];
            }
        });
    });
};
var getUtxosHash = function (_a) {
    var txid = _a.txid, _b = _a.testnet, testnet = _b === void 0 ? false : _b;
    return __awaiter(void 0, void 0, void 0, function () {
        var link, response, data;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    link = getBaseURL({ testnet: testnet }) + "/tx/".concat(txid, "/hex");
                    return [4 /*yield*/, (0, node_fetch_1["default"])(link)];
                case 1:
                    response = _c.sent();
                    return [4 /*yield*/, response.text()];
                case 2:
                    data = _c.sent();
                    return [2 /*return*/, data];
            }
        });
    });
};
var parseBTC = function (btc) {
    return (btc * Math.pow(10, 8)) | 0;
};
exports.parseBTC = parseBTC;
var satoshiToBtc = function (satoshi) {
    return satoshi / Math.pow(10, 8);
};
exports.satoshiToBtc = satoshiToBtc;
var generateMnemonic = function () {
    return bip39.generateMnemonic(256);
};
exports.generateMnemonic = generateMnemonic;
var mnemonicToEntropy = function (_a) {
    var mnemonic = _a.mnemonic;
    return bip39.mnemonicToEntropy(mnemonic);
};
exports.mnemonicToEntropy = mnemonicToEntropy;
var entropyToMnemonic = function (_a) {
    var entropy = _a.entropy;
    return bip39.entropyToMnemonic(entropy);
};
exports.entropyToMnemonic = entropyToMnemonic;
var generateXPubKeyFromMnemonic = function (_a) {
    var mnemonic = _a.mnemonic, _b = _a.testnet, testnet = _b === void 0 ? false : _b;
    return __awaiter(void 0, void 0, void 0, function () {
        var network, seed, node;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    network = getBtcNetwork({ testnet: testnet });
                    return [4 /*yield*/, bip39.mnemonicToSeed(mnemonic)];
                case 1:
                    seed = _c.sent();
                    node = bip32.fromSeed(seed, network);
                    return [2 /*return*/, node.neutered().toBase58()];
            }
        });
    });
};
exports.generateXPubKeyFromMnemonic = generateXPubKeyFromMnemonic;
var generateXPrvKeyFromMnemonic = function (_a) {
    var mnemonic = _a.mnemonic, _b = _a.testnet, testnet = _b === void 0 ? false : _b;
    return __awaiter(void 0, void 0, void 0, function () {
        var network, seed, node;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    network = getBtcNetwork({ testnet: testnet });
                    return [4 /*yield*/, bip39.mnemonicToSeed(mnemonic)];
                case 1:
                    seed = _c.sent();
                    node = bip32.fromSeed(seed, network);
                    return [2 /*return*/, node.toBase58()];
            }
        });
    });
};
exports.generateXPrvKeyFromMnemonic = generateXPrvKeyFromMnemonic;
var createBtcAddress = function (_a) {
    var _b = _a.testnet, testnet = _b === void 0 ? false : _b;
    var network = getBtcNetwork({ testnet: testnet });
    var keyPair = ECPair.makeRandom({ network: network });
    var address = bitcoin.payments.p2wpkh({
        pubkey: keyPair.publicKey,
        network: network
    }).address;
    var wif = keyPair.toWIF();
    var privateKey = keyPair.privateKey.toString();
    return { wif: wif, address: address, privateKey: privateKey };
};
exports.createBtcAddress = createBtcAddress;
var createBtcAddressFromMnemonic = function (_a) {
    var mnemonic = _a.mnemonic, index = _a.index, _b = _a.testnet, testnet = _b === void 0 ? false : _b;
    var network = getBtcNetwork({ testnet: testnet });
    var seed = bip39.mnemonicToSeedSync(mnemonic);
    var root = bip32.fromSeed(seed, network);
    var path = getPath(index);
    var child = root.derivePath(path);
    var address = bitcoin.payments.p2wpkh({
        pubkey: child.publicKey,
        network: network
    }).address;
    return {
        address: address,
        privateKey: child.privateKey.toString(),
        wif: child.toWIF()
    };
};
exports.createBtcAddressFromMnemonic = createBtcAddressFromMnemonic;
var createBtcAddressFromHDKey = function (_a) {
    var hdkey = _a.hdkey, index = _a.index, _b = _a.testnet, testnet = _b === void 0 ? false : _b;
    var network = getBtcNetwork({ testnet: testnet });
    var path = getPath(index);
    var address = bitcoin.payments.p2wpkh({
        pubkey: bip32.fromBase58(hdkey, network).derivePath(path).publicKey,
        network: network
    }).address;
    if (hdkey.includes('prv')) {
        var root = bip32.fromBase58(hdkey, network);
        var child = root.derivePath(path);
        return {
            address: address,
            privateKey: child.privateKey.toString(),
            wif: child.toWIF()
        };
    }
    else {
        return { address: address, privateKey: undefined, wif: undefined };
    }
};
exports.createBtcAddressFromHDKey = createBtcAddressFromHDKey;
var importBtcAddress = function (_a) {
    var wif = _a.wif, _b = _a.testnet, testnet = _b === void 0 ? false : _b;
    var network = getBtcNetwork({ testnet: testnet });
    var keyPair = ECPair.fromWIF(wif, network);
    var address = bitcoin.payments.p2wpkh({
        pubkey: keyPair.publicKey,
        network: network
    }).address;
    var privateKey = keyPair.privateKey.toString();
    return { wif: wif, address: address, privateKey: privateKey };
};
exports.importBtcAddress = importBtcAddress;
var getBtcBalance = function (_a) {
    var address = _a.address, _b = _a.testnet, testnet = _b === void 0 ? false : _b;
    return __awaiter(void 0, void 0, void 0, function () {
        var link, response, data, satoshi, index, utxo, btc;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    link = getBaseURL({ testnet: testnet });
                    link += "/address/".concat(address, "/utxo");
                    return [4 /*yield*/, (0, node_fetch_1["default"])(link)];
                case 1:
                    response = _c.sent();
                    if (!(response.status === 200)) return [3 /*break*/, 3];
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _c.sent();
                    satoshi = 0;
                    for (index = 0; index < data.length; index++) {
                        utxo = data[index];
                        satoshi += utxo.value;
                    }
                    return [3 /*break*/, 6];
                case 3:
                    link = testnet ?
                        "http://api.blockcypher.com/v1/btc/test3/addrs/".concat(address) :
                        "https://blockchain.info/address/".concat(address, "?format=jsonrawaddr");
                    return [4 /*yield*/, (0, node_fetch_1["default"])(link)];
                case 4:
                    response = _c.sent();
                    return [4 /*yield*/, response.json()];
                case 5:
                    data = _c.sent();
                    satoshi = parseInt(data.final_balance.toString());
                    _c.label = 6;
                case 6:
                    btc = (0, exports.satoshiToBtc)(satoshi);
                    return [2 /*return*/, { satoshi: satoshi, btc: btc }];
            }
        });
    });
};
exports.getBtcBalance = getBtcBalance;
var estimateFee = function (_a) {
    var wif = _a.wif, addresses = _a.addresses, amounts = _a.amounts, _b = _a.testnet, testnet = _b === void 0 ? false : _b;
    return __awaiter(void 0, void 0, void 0, function () {
        var network, sender, keyPair;
        return __generator(this, function (_c) {
            network = getBtcNetwork({ testnet: testnet });
            sender = (0, exports.importBtcAddress)({
                wif: wif,
                testnet: testnet
            }).address;
            keyPair = ECPair.fromWIF(wif, network);
            return [2 /*return*/, estimateBtcFee({
                    sender: sender,
                    testnet: testnet,
                    amounts: amounts,
                    addresses: addresses,
                    keyPair: keyPair
                })];
        });
    });
};
exports.estimateFee = estimateFee;
var send = function (_a) {
    var wif = _a.wif, addresses = _a.addresses, amounts = _a.amounts, _b = _a.fee, fee = _b === void 0 ? null : _b, _c = _a.testnet, testnet = _c === void 0 ? false : _c;
    return __awaiter(void 0, void 0, void 0, function () {
        var network, sender, keyPair, satoshi;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    network = getBtcNetwork({ testnet: testnet });
                    sender = (0, exports.importBtcAddress)({
                        wif: wif,
                        testnet: testnet
                    }).address;
                    keyPair = ECPair.fromWIF(wif, network);
                    if (!!fee) return [3 /*break*/, 2];
                    return [4 /*yield*/, (0, exports.estimateFee)({ wif: wif, addresses: addresses, amounts: amounts, testnet: testnet })];
                case 1:
                    satoshi = (_d.sent()).satoshi;
                    fee = satoshi;
                    _d.label = 2;
                case 2: return [2 /*return*/, sendBtc({ addresses: addresses, amounts: amounts, fee: fee, keyPair: keyPair, testnet: testnet, sender: sender })];
            }
        });
    });
};
exports.send = send;
var sendWithHDKey = function (_a) {
    var xprv = _a.xprv, addresses = _a.addresses, amounts = _a.amounts, index = _a.index, fee = _a.fee, _b = _a.testnet, testnet = _b === void 0 ? false : _b;
    return __awaiter(void 0, void 0, void 0, function () {
        var network, _c, sender, wif, keyPair, satoshi;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    network = getBtcNetwork({ testnet: testnet });
                    _c = (0, exports.createBtcAddressFromHDKey)({
                        hdkey: xprv,
                        index: index,
                        testnet: testnet
                    }), sender = _c.address, wif = _c.wif;
                    keyPair = ECPair.fromWIF(wif, network);
                    if (!!fee) return [3 /*break*/, 2];
                    return [4 /*yield*/, (0, exports.estimateFee)({ wif: wif, addresses: addresses, amounts: amounts, testnet: testnet })];
                case 1:
                    satoshi = (_d.sent()).satoshi;
                    fee = satoshi;
                    _d.label = 2;
                case 2: return [2 /*return*/, sendBtc({ addresses: addresses, amounts: amounts, fee: fee, keyPair: keyPair, testnet: testnet, sender: sender })];
            }
        });
    });
};
exports.sendWithHDKey = sendWithHDKey;
var sendWithMnemonic = function (_a) {
    var mnemonic = _a.mnemonic, addresses = _a.addresses, amounts = _a.amounts, index = _a.index, fee = _a.fee, _b = _a.testnet, testnet = _b === void 0 ? false : _b;
    return __awaiter(void 0, void 0, void 0, function () {
        var network, _c, sender, wif, keyPair, satoshi;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    network = getBtcNetwork({ testnet: testnet });
                    _c = (0, exports.createBtcAddressFromMnemonic)({
                        mnemonic: mnemonic,
                        index: index,
                        testnet: testnet
                    }), sender = _c.address, wif = _c.wif;
                    keyPair = ECPair.fromWIF(wif, network);
                    if (!!fee) return [3 /*break*/, 2];
                    return [4 /*yield*/, (0, exports.estimateFee)({ wif: wif, addresses: addresses, amounts: amounts, testnet: testnet })];
                case 1:
                    satoshi = (_d.sent()).satoshi;
                    fee = satoshi;
                    _d.label = 2;
                case 2: return [2 /*return*/, sendBtc({ addresses: addresses, amounts: amounts, fee: fee, keyPair: keyPair, testnet: testnet, sender: sender })];
            }
        });
    });
};
exports.sendWithMnemonic = sendWithMnemonic;
var sendTransaction = function (_a) {
    var body = _a.hash, _b = _a.testnet, testnet = _b === void 0 ? false : _b;
    return __awaiter(void 0, void 0, void 0, function () {
        var link, response, text, hexRegex, sent;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    link = getBaseURL({ testnet: testnet }) + '/tx';
                    return [4 /*yield*/, (0, node_fetch_1["default"])(link, { method: 'post', body: body })];
                case 1:
                    response = _c.sent();
                    return [4 /*yield*/, response.text()];
                case 2:
                    text = _c.sent();
                    hexRegex = /^(0x|0X)?[a-fA-F0-9]+$/;
                    sent = hexRegex.test(text);
                    if (!sent)
                        throw new Error(text);
                    return [2 /*return*/, { transactionId: text }];
            }
        });
    });
};
exports.sendTransaction = sendTransaction;
var drain = function (_a) {
    var wif = _a.wif, to = _a.to, _b = _a.minimumBalance, minimumBalance = _b === void 0 ? 5000 : _b, _c = _a.testnet, testnet = _c === void 0 ? false : _c;
    return __awaiter(void 0, void 0, void 0, function () {
        var network, sender, keyPair;
        return __generator(this, function (_d) {
            network = getBtcNetwork({ testnet: testnet });
            sender = (0, exports.importBtcAddress)({
                wif: wif,
                testnet: testnet
            }).address;
            keyPair = ECPair.fromWIF(wif, network);
            return [2 /*return*/, drainBtc({ minimumBalance: minimumBalance, to: to, keyPair: keyPair, testnet: testnet, sender: sender })];
        });
    });
};
exports.drain = drain;
var drainWithHDKey = function (_a) {
    var xprv = _a.xprv, to = _a.to, index = _a.index, _b = _a.minimumBalance, minimumBalance = _b === void 0 ? 5000 : _b, _c = _a.testnet, testnet = _c === void 0 ? false : _c;
    return __awaiter(void 0, void 0, void 0, function () {
        var network, _d, sender, wif, keyPair;
        return __generator(this, function (_e) {
            network = getBtcNetwork({ testnet: testnet });
            _d = (0, exports.createBtcAddressFromHDKey)({
                hdkey: xprv,
                index: index,
                testnet: testnet
            }), sender = _d.address, wif = _d.wif;
            keyPair = ECPair.fromWIF(wif, network);
            return [2 /*return*/, drainBtc({ to: to, keyPair: keyPair, testnet: testnet, sender: sender, minimumBalance: minimumBalance })];
        });
    });
};
exports.drainWithHDKey = drainWithHDKey;
var drainWithMnemonic = function (_a) {
    var mnemonic = _a.mnemonic, to = _a.to, index = _a.index, _b = _a.minimumBalance, minimumBalance = _b === void 0 ? 5000 : _b, _c = _a.testnet, testnet = _c === void 0 ? false : _c;
    return __awaiter(void 0, void 0, void 0, function () {
        var network, _d, sender, wif, keyPair;
        return __generator(this, function (_e) {
            network = getBtcNetwork({ testnet: testnet });
            _d = (0, exports.createBtcAddressFromMnemonic)({
                mnemonic: mnemonic,
                index: index,
                testnet: testnet
            }), sender = _d.address, wif = _d.wif;
            keyPair = ECPair.fromWIF(wif, network);
            return [2 /*return*/, drainBtc({ to: to, keyPair: keyPair, testnet: testnet, sender: sender, minimumBalance: minimumBalance })];
        });
    });
};
exports.drainWithMnemonic = drainWithMnemonic;
var getBtcTransactions = function (_a) {
    var address = _a.address, _b = _a.testnet, testnet = _b === void 0 ? false : _b;
    return __awaiter(void 0, void 0, void 0, function () {
        var link, response;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    link = getBaseURL({ testnet: testnet }) + "/address/".concat(address, "/txs");
                    return [4 /*yield*/, (0, node_fetch_1["default"])(link)];
                case 1:
                    response = _c.sent();
                    return [2 /*return*/, response.json()];
            }
        });
    });
};
exports.getBtcTransactions = getBtcTransactions;
var getBtcTransaction = function (_a) {
    var transactionId = _a.transactionId, _b = _a.testnet, testnet = _b === void 0 ? false : _b;
    return __awaiter(void 0, void 0, void 0, function () {
        var link, response;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    link = getBaseURL({ testnet: testnet }) + "/tx/".concat(transactionId);
                    return [4 /*yield*/, (0, node_fetch_1["default"])(link)];
                case 1:
                    response = _c.sent();
                    return [2 /*return*/, response.json()];
            }
        });
    });
};
exports.getBtcTransaction = getBtcTransaction;
