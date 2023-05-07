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
exports.drainERC20Token = exports.drainEth = exports.getEthTransactions = exports.getBlock = exports.sendTransaction = exports.getTransactionReceipt = exports.getTransactionCount = exports.createEthAddressFromXPrv = exports.generateXPrvKeyFromMnemonic = exports.generateXPubKeyFromMnemonic = exports.createEthAddressFromMnemonic = exports.getERC20Balance = exports.getEthBalance = exports.sendERC20Token = exports.sendEth = exports.estimateERC20GasFee = exports.estimateEthGasFee = exports.importEthAddress = exports.createEthAddress = void 0;
var bignumber_js_1 = require("bignumber.js");
var providers_1 = require("@ethersproject/providers");
var ethers = __importStar(require("ethers"));
var node_fetch_1 = __importDefault(require("node-fetch"));
var web3_1 = __importDefault(require("web3"));
var IERC20_ABI = [
    'event Transfer(address indexed from,' +
        ' address indexed to, uint256 value)',
    'event Approval(address indexed owner,' +
        ' address indexed spender, uint256 value)',
    'function totalSupply() external view returns (uint256)',
    'function balanceOf(address account) external view returns (uint256)',
    'function transfer(address to, uint256 amount) external returns (bool)',
    'function allowance(address owner, address' +
        ' spender) external view returns (uint256)',
    'function approve(address spender, uint256 ' +
        'amount) external returns (bool)',
    'function transferFrom(address from, address ' +
        'to, uint256 amount) external returns (bool)',
    'function decimals() public view returns (uint8)',
];
var getPath = function (index) { return "m/44'/60'/0'/0/".concat(index, "'"); };
var getEthRpcLink = function (_a) {
    var _b = _a.network, network = _b === void 0 ? 'homestead' : _b;
    if (['bsc', 'bsc-testnet'].includes(network)) {
        return network === 'bsc' ?
            'https://bsc-dataseed.binance.org' :
            'https://data-seed-prebsc-1-s1.binance.org:8545';
    }
    else {
        var INFURA_API_KEY = process.env.INFURA_API_KEY;
        var subdomain = network === 'polygon' ?
            'polygon-mainnet' :
            network === 'homestead' ?
                'mainnet' :
                network;
        if (!INFURA_API_KEY)
            throw new Error('Please provide INFURA_API_KEY');
        return "https://".concat(subdomain, ".infura.io/v3/").concat(INFURA_API_KEY);
    }
};
var getProvider = function (_a) {
    var _b = _a.network, network = _b === void 0 ? 'homestead' : _b;
    var link = getEthRpcLink({ network: network });
    return new providers_1.JsonRpcProvider(link);
};
var getERC20Contract = function (_a) {
    var contractAddress = _a.contractAddress, signer = _a.signer;
    contractAddress = web3_1["default"].utils.toChecksumAddress(contractAddress);
    return new ethers.Contract(contractAddress, IERC20_ABI, signer);
};
var createEthAddress = function () {
    var _a = ethers.Wallet.createRandom(), address = _a.address, privateKey = _a.privateKey;
    return { address: address, privateKey: privateKey };
};
exports.createEthAddress = createEthAddress;
var importEthAddress = function (_a) {
    var privateKey = _a.privateKey, _b = _a.network, network = _b === void 0 ? 'homestead' : _b;
    var provider = getProvider({ network: network });
    var address = new ethers.Wallet(privateKey, provider).address;
    return { address: address, privateKey: privateKey };
};
exports.importEthAddress = importEthAddress;
var estimateEthGasFee = function (_a) {
    var address = _a.address, amount = _a.amount, _b = _a.network, network = _b === void 0 ? 'homestead' : _b;
    return __awaiter(void 0, void 0, void 0, function () {
        var to, ether, provider, gasPrice, value, txObject, fee, wei, eths;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    to = web3_1["default"].utils.toChecksumAddress(address);
                    ether = ethers.utils.parseEther(amount.toString());
                    provider = getProvider({ network: network });
                    return [4 /*yield*/, provider.getGasPrice()];
                case 1:
                    gasPrice = _c.sent();
                    gasPrice = gasPrice.toNumber();
                    gasPrice = Math.ceil(gasPrice);
                    value = ether.toHexString();
                    txObject = { to: to, value: value, gasPrice: ethers.utils.hexlify(gasPrice) };
                    return [4 /*yield*/, provider.estimateGas(txObject)];
                case 2:
                    fee = _c.sent();
                    wei = fee.toNumber() * gasPrice;
                    eths = wei / Math.pow(10, 18);
                    return [2 /*return*/, { wei: wei, ethers: eths }];
            }
        });
    });
};
exports.estimateEthGasFee = estimateEthGasFee;
var estimateERC20GasFee = function (_a) {
    var address = _a.address, contractAddress = _a.contractAddress, amount = _a.amount, privateKey = _a.privateKey, _b = _a.network, network = _b === void 0 ? 'homestead' : _b;
    return __awaiter(void 0, void 0, void 0, function () {
        var provider, signer, from, tokenContract, decimals, to, value, balance, data, gasPrice, nonce, txObject, gasLimit, fee, wei, eths;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    provider = getProvider({ network: network });
                    signer = new ethers.Wallet(privateKey, provider);
                    from = signer.address;
                    tokenContract = getERC20Contract({ contractAddress: contractAddress, signer: signer });
                    return [4 /*yield*/, tokenContract.decimals()];
                case 1:
                    decimals = _c.sent();
                    to = web3_1["default"].utils.toChecksumAddress(address);
                    value = ethers.utils.parseUnits(amount.toString(), decimals);
                    return [4 /*yield*/, tokenContract.balanceOf(from)];
                case 2:
                    balance = _c.sent();
                    if (balance.lt(value))
                        throw new Error('Insufficient ERC20 balance');
                    data = tokenContract.interface.encodeFunctionData('transfer', [
                        to,
                        amount,
                    ]);
                    return [4 /*yield*/, provider.getGasPrice()];
                case 3:
                    gasPrice = _c.sent();
                    gasPrice = gasPrice.toNumber();
                    gasPrice = Math.ceil(gasPrice);
                    return [4 /*yield*/, provider.getTransactionCount(from)];
                case 4:
                    nonce = _c.sent();
                    txObject = {
                        from: from,
                        to: tokenContract.address,
                        data: data,
                        gasPrice: ethers.utils.hexlify(gasPrice),
                        nonce: nonce
                    };
                    return [4 /*yield*/, provider.estimateGas(txObject)];
                case 5:
                    gasLimit = _c.sent();
                    gasLimit = Math.ceil(gasLimit.toNumber());
                    txObject.gasLimit = ethers.utils.hexlify(gasLimit);
                    return [4 /*yield*/, provider.estimateGas(txObject)];
                case 6:
                    fee = _c.sent();
                    wei = fee.toNumber();
                    eths = wei / Math.pow(10, 18);
                    return [2 /*return*/, { wei: wei, ethers: eths }];
            }
        });
    });
};
exports.estimateERC20GasFee = estimateERC20GasFee;
var sendEth = function (_a) {
    var address = _a.address, amount = _a.amount, _b = _a.network, network = _b === void 0 ? 'homestead' : _b, privateKey = _a.privateKey;
    return __awaiter(void 0, void 0, void 0, function () {
        var to, eths, provider, sender, balance, value, txObject, wallet;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    to = web3_1["default"].utils.toChecksumAddress(address);
                    eths = ethers.utils.parseEther(amount.toString());
                    provider = getProvider({ network: network });
                    sender = (0, exports.importEthAddress)({
                        network: network,
                        privateKey: privateKey
                    }).address;
                    return [4 /*yield*/, provider.getBalance(sender)];
                case 1:
                    balance = _c.sent();
                    if (balance.lt(eths)) {
                        throw new Error('Insufficient balance');
                    }
                    value = eths.toHexString();
                    txObject = { to: to, value: value };
                    wallet = new ethers.Wallet(privateKey).connect(provider);
                    return [2 /*return*/, wallet.sendTransaction(txObject)];
            }
        });
    });
};
exports.sendEth = sendEth;
var sendERC20Token = function (_a) {
    var address = _a.address, contractAddress = _a.contractAddress, amount = _a.amount, privateKey = _a.privateKey, _b = _a.network, network = _b === void 0 ? 'homestead' : _b;
    return __awaiter(void 0, void 0, void 0, function () {
        var to, provider, signer, from, tokenContract, decimals, value, balance, data, gasPrice, nonce, txObject, gasLimit, wallet;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    to = web3_1["default"].utils.toChecksumAddress(address);
                    provider = getProvider({ network: network });
                    signer = new ethers.Wallet(privateKey, provider);
                    from = signer.address;
                    tokenContract = getERC20Contract({ contractAddress: contractAddress, signer: signer });
                    return [4 /*yield*/, tokenContract.decimals()];
                case 1:
                    decimals = _c.sent();
                    value = ethers.BigNumber.from(new bignumber_js_1.BigNumber(amount)
                        .multipliedBy(new bignumber_js_1.BigNumber(Math.pow(10, decimals)))
                        .toString());
                    return [4 /*yield*/, tokenContract.balanceOf(from)];
                case 2:
                    balance = _c.sent();
                    if (balance.lt(value))
                        throw new Error('Insufficient ERC20 balance');
                    data = tokenContract.interface.encodeFunctionData('transfer', [
                        to,
                        value,
                    ]);
                    return [4 /*yield*/, provider.getGasPrice()];
                case 3:
                    gasPrice = _c.sent();
                    gasPrice = gasPrice.toNumber();
                    gasPrice = Math.ceil(gasPrice);
                    return [4 /*yield*/, provider.getTransactionCount(from)];
                case 4:
                    nonce = _c.sent();
                    txObject = {
                        from: from,
                        to: tokenContract.address,
                        data: data,
                        gasPrice: ethers.utils.hexlify(gasPrice),
                        nonce: nonce
                    };
                    return [4 /*yield*/, provider.estimateGas(txObject)];
                case 5:
                    gasLimit = _c.sent();
                    gasLimit = Math.ceil(gasLimit.toNumber());
                    txObject.gasLimit = ethers.utils.hexlify(gasLimit);
                    wallet = new ethers.Wallet(privateKey, provider);
                    return [2 /*return*/, wallet.sendTransaction(txObject)];
            }
        });
    });
};
exports.sendERC20Token = sendERC20Token;
var getEthBalance = function (_a) {
    var address = _a.address, _b = _a.network, network = _b === void 0 ? 'homestead' : _b;
    return __awaiter(void 0, void 0, void 0, function () {
        var provider, balance, wei, eths;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    provider = getProvider({ network: network });
                    return [4 /*yield*/, provider.getBalance(address)];
                case 1:
                    balance = _c.sent();
                    wei = parseInt(balance.toString());
                    eths = wei / Math.pow(10, 18);
                    return [2 /*return*/, { wei: wei, ethers: eths }];
            }
        });
    });
};
exports.getEthBalance = getEthBalance;
var getERC20Balance = function (_a) {
    var address = _a.address, contractAddress = _a.contractAddress, _b = _a.network, network = _b === void 0 ? 'homestead' : _b;
    return __awaiter(void 0, void 0, void 0, function () {
        var signer, tokenContract, balance, decimals, wei, eths;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    signer = getProvider({ network: network });
                    tokenContract = getERC20Contract({ contractAddress: contractAddress, signer: signer });
                    return [4 /*yield*/, tokenContract.balanceOf(address)];
                case 1:
                    balance = _c.sent();
                    return [4 /*yield*/, tokenContract.decimals()];
                case 2:
                    decimals = _c.sent();
                    wei = parseInt(balance.toString());
                    eths = wei / Math.pow(10, decimals);
                    return [2 /*return*/, { wei: wei, ethers: eths }];
            }
        });
    });
};
exports.getERC20Balance = getERC20Balance;
var createEthAddressFromMnemonic = function (_a) {
    var mnemonic = _a.mnemonic, index = _a.index;
    var _b = ethers.Wallet.fromMnemonic(mnemonic, getPath(index)), address = _b.address, privateKey = _b.privateKey;
    return { address: address, privateKey: privateKey };
};
exports.createEthAddressFromMnemonic = createEthAddressFromMnemonic;
var generateXPubKeyFromMnemonic = function (_a) {
    var mnemonic = _a.mnemonic;
    return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_b) {
            return [2 /*return*/, ethers.utils.HDNode.fromMnemonic(mnemonic).neuter().extendedKey];
        });
    });
};
exports.generateXPubKeyFromMnemonic = generateXPubKeyFromMnemonic;
var generateXPrvKeyFromMnemonic = function (_a) {
    var mnemonic = _a.mnemonic;
    return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_b) {
            return [2 /*return*/, ethers.utils.HDNode.fromMnemonic(mnemonic).extendedKey];
        });
    });
};
exports.generateXPrvKeyFromMnemonic = generateXPrvKeyFromMnemonic;
var createEthAddressFromXPrv = function (_a) {
    var xprv = _a.xprv, index = _a.index;
    var _b = ethers.utils.HDNode.fromExtendedKey(xprv).derivePath(getPath(index)), address = _b.address, privateKey = _b.privateKey;
    return { address: address, privateKey: privateKey };
};
exports.createEthAddressFromXPrv = createEthAddressFromXPrv;
var getTransactionCount = function (_a) {
    var _b = _a.network, network = _b === void 0 ? 'homestead' : _b, address = _a.address;
    return __awaiter(void 0, void 0, void 0, function () {
        var provider;
        return __generator(this, function (_c) {
            provider = getProvider({ network: network });
            return [2 /*return*/, provider.getTransactionCount(address)];
        });
    });
};
exports.getTransactionCount = getTransactionCount;
var getTransactionReceipt = function (_a) {
    var _b = _a.network, network = _b === void 0 ? 'homestead' : _b, hash = _a.hash;
    return __awaiter(void 0, void 0, void 0, function () {
        var provider;
        return __generator(this, function (_c) {
            provider = getProvider({ network: network });
            return [2 /*return*/, provider.getTransactionReceipt(hash)];
        });
    });
};
exports.getTransactionReceipt = getTransactionReceipt;
var sendTransaction = function (_a) {
    var _b = _a.network, network = _b === void 0 ? 'homestead' : _b, hash = _a.hash;
    return __awaiter(void 0, void 0, void 0, function () {
        var provider;
        return __generator(this, function (_c) {
            provider = getProvider({ network: network });
            return [2 /*return*/, provider.sendTransaction(hash)];
        });
    });
};
exports.sendTransaction = sendTransaction;
var getBlock = function (_a) {
    var _b = _a.network, network = _b === void 0 ? 'homestead' : _b, hash = _a.hash;
    return __awaiter(void 0, void 0, void 0, function () {
        var provider;
        return __generator(this, function (_c) {
            provider = getProvider({ network: network });
            return [2 /*return*/, provider.getBlock(hash)];
        });
    });
};
exports.getBlock = getBlock;
var getEthTransactions = function (_a) {
    var address = _a.address, _b = _a.network, network = _b === void 0 ? 'homestead' : _b;
    return __awaiter(void 0, void 0, void 0, function () {
        var COVALENT_API_KEY, provider, chainId, link, response;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    COVALENT_API_KEY = process.env.COVALENT_API_KEY;
                    if (!COVALENT_API_KEY)
                        throw new Error('Please provide COVALENT_API_KEY');
                    provider = getProvider({ network: network });
                    return [4 /*yield*/, provider.getNetwork()];
                case 1:
                    chainId = (_c.sent()).chainId;
                    link = "https://api.covalenthq.com/v1/".concat(chainId, "/") +
                        "address/".concat(address, "/transactions_v2/");
                    return [4 /*yield*/, (0, node_fetch_1["default"])(link, {
                            headers: {
                                'content-type': 'application/json',
                                'authorization': "Basic ".concat(Buffer.from(COVALENT_API_KEY + ':').toString('base64'))
                            }
                        })];
                case 2:
                    response = _c.sent();
                    return [2 /*return*/, response.json()];
            }
        });
    });
};
exports.getEthTransactions = getEthTransactions;
var drainEth = function (_a) {
    var address = _a.address, _b = _a.network, network = _b === void 0 ? 'homestead' : _b, privateKey = _a.privateKey;
    return __awaiter(void 0, void 0, void 0, function () {
        var to, provider, sender, amount, value, gasPrice, txObject, gasLimit, wallet, transaction;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    to = web3_1["default"].utils.toChecksumAddress(address);
                    provider = getProvider({ network: network });
                    sender = (0, exports.importEthAddress)({
                        network: network,
                        privateKey: privateKey
                    }).address;
                    return [4 /*yield*/, provider.getBalance(sender)];
                case 1:
                    amount = _c.sent();
                    value = amount.toHexString();
                    return [4 /*yield*/, provider.getGasPrice()];
                case 2:
                    gasPrice = _c.sent();
                    gasPrice = gasPrice.toNumber();
                    gasPrice = Math.ceil(gasPrice);
                    txObject = { to: to, value: value };
                    return [4 /*yield*/, provider.estimateGas(txObject)];
                case 3:
                    gasLimit = _c.sent();
                    gasLimit = Math.ceil(gasLimit.toNumber());
                    txObject.value = ethers.BigNumber.from(new bignumber_js_1.BigNumber(txObject.value)
                        .minus(new bignumber_js_1.BigNumber(gasLimit * gasPrice))
                        .toString()).toHexString();
                    txObject.gasLimit = ethers.utils.hexlify(gasLimit);
                    txObject.gasPrice = ethers.utils.hexlify(gasPrice);
                    wallet = new ethers.Wallet(privateKey).connect(provider);
                    return [4 /*yield*/, wallet.sendTransaction(txObject)];
                case 4:
                    transaction = _c.sent();
                    return [2 /*return*/, {
                            transaction: transaction,
                            fee: parseFloat(ethers.utils.formatEther((gasLimit * gasPrice).toString())),
                            amount: amount.toString()
                        }];
            }
        });
    });
};
exports.drainEth = drainEth;
var drainERC20Token = function (_a) {
    var address = _a.address, contractAddress = _a.contractAddress, privateKey = _a.privateKey, gasSupplierPrivateKey = _a.gasSupplierPrivateKey, _b = _a.network, network = _b === void 0 ? 'homestead' : _b;
    return __awaiter(void 0, void 0, void 0, function () {
        var to, provider, signer, from, tokenContract, amount, data, gasPrice, nonce, txObject, gasLimit, fee, supplierSigner, ttx, wallet, transaction;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    to = web3_1["default"].utils.toChecksumAddress(address);
                    provider = getProvider({ network: network });
                    signer = new ethers.Wallet(privateKey, provider);
                    from = signer.address;
                    tokenContract = getERC20Contract({ contractAddress: contractAddress, signer: signer });
                    return [4 /*yield*/, tokenContract.balanceOf(from)];
                case 1:
                    amount = _c.sent();
                    data = tokenContract.interface.encodeFunctionData('transfer', [
                        to,
                        amount.toString(),
                    ]);
                    return [4 /*yield*/, provider.getGasPrice()];
                case 2:
                    gasPrice = _c.sent();
                    gasPrice = gasPrice.toNumber();
                    gasPrice = Math.ceil(gasPrice);
                    return [4 /*yield*/, provider.getTransactionCount(from)];
                case 3:
                    nonce = _c.sent();
                    txObject = {
                        from: from,
                        to: tokenContract.address,
                        data: data,
                        nonce: nonce
                    };
                    return [4 /*yield*/, provider.estimateGas(txObject)];
                case 4:
                    gasLimit = _c.sent();
                    gasLimit = Math.ceil(gasLimit.toNumber());
                    txObject.gasLimit = ethers.utils.hexlify(gasLimit);
                    txObject.gasPrice = ethers.utils.hexlify(gasPrice);
                    fee = parseFloat(ethers.utils.formatEther((gasLimit * gasPrice).toString()));
                    if (!gasSupplierPrivateKey) return [3 /*break*/, 7];
                    supplierSigner = new ethers.Wallet(gasSupplierPrivateKey, provider);
                    return [4 /*yield*/, (0, exports.sendEth)({
                            address: signer.address,
                            amount: fee,
                            network: network,
                            privateKey: supplierSigner.privateKey
                        })];
                case 5:
                    ttx = _c.sent();
                    return [4 /*yield*/, ttx.wait()];
                case 6:
                    _c.sent();
                    _c.label = 7;
                case 7:
                    wallet = new ethers.Wallet(privateKey, provider);
                    return [4 /*yield*/, wallet.sendTransaction(txObject)];
                case 8:
                    transaction = _c.sent();
                    return [2 /*return*/, { transaction: transaction, fee: fee, amount: amount.toString() }];
            }
        });
    });
};
exports.drainERC20Token = drainERC20Token;
