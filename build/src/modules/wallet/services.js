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
exports.getWallet = exports.sendEth = exports.sendErc20Token = exports.gaslessErc20ToEth = exports.erc20ToEthV2 = exports.ethToErc20V2 = exports.accountInfo = exports.createWallet = void 0;
var sdk_1 = require("@uniswap/sdk");
var sdk_core_1 = require("@uniswap/sdk-core");
var ethereumjs_tx_1 = require("ethereumjs-tx");
var ethers_1 = require("ethers");
var utils_1 = require("ethers/lib/utils");
var node_fetch_1 = __importDefault(require("node-fetch"));
var uuid_1 = require("uuid");
var web3_1 = __importDefault(require("web3"));
var constants_1 = require("../../configs/constants");
var env_1 = require("../../configs/env");
var models_1 = require("../../models");
var utils_2 = require("../../utils");
/**
 * Create user wallet
 * @param {wallet.CreateRequest} params  Request Body
 * @returns {others.Response} Contains status, message and data if any of the operation
 */
var createWallet = function (params) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, ethereumAccount, user, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                userId = params.userId;
                ethereumAccount = generateEthereumAddress();
                return [4 /*yield*/, models_1.User.findByPk(userId)];
            case 1:
                user = _a.sent();
                return [4 /*yield*/, user.update({
                        ethereumAccount: ethereumAccount,
                        ethereumAddress: ethereumAccount.address
                    })];
            case 2:
                _a.sent();
                return [4 /*yield*/, (0, utils_2.rethrow)(sendAllowance(ethereumAccount.address))];
            case 3:
                _a.sent();
                return [2 /*return*/, { status: true, message: "Wallet created" }];
            case 4:
                error_1 = _a.sent();
                return [2 /*return*/, {
                        status: false,
                        message: "Error trying to create wallet".concat(env_1.devEnv ? ": " + error_1 : "")
                    }];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.createWallet = createWallet;
var accountInfo = function (params) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, ethereumAddress, wallet_1, balance, balanceInEth, error_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 3, , 4]);
                return [4 /*yield*/, (0, exports.getWallet)(params)];
            case 1:
                _a = _b.sent(), ethereumAddress = _a.ethereumAddress, wallet_1 = _a.wallet;
                return [4 /*yield*/, wallet_1.getBalance()];
            case 2:
                balance = _b.sent();
                balanceInEth = ethers_1.ethers.utils.formatEther(balance);
                return [2 /*return*/, {
                        status: true,
                        message: "Account info fetched",
                        data: { ethAddress: ethereumAddress, ethBalance: balanceInEth }
                    }];
            case 3:
                error_2 = _b.sent();
                return [2 /*return*/, {
                        status: false,
                        message: "Error trying to fetch account info".concat(env_1.devEnv ? ": " + error_2 : "")
                    }];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.accountInfo = accountInfo;
/**
 * Swap eth to erc20 token
 * @param {wallet.Erc20ToEth} params  Request Body
 * @returns {others.Response} Contains status, message and data if any of the operation
 */
var ethToErc20V2 = function (params) { return __awaiter(void 0, void 0, void 0, function () {
    var tempCurrency, tempAmount, userId, currency, weth, amount, _a, account, recipient, pair, route, trade, amountOutMin, path, deadline, inputAmount, uniswap, gasPrice, gasLimit, error_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 5, , 6]);
                tempCurrency = params.currency, tempAmount = params.amount, userId = params.userId;
                currency = constants_1.currencies[tempCurrency];
                if (!currency) {
                    return [2 /*return*/, {
                            payload: { status: false, message: "Currency not found" },
                            code: 404
                        }];
                }
                weth = sdk_1.WETH[env_1.ethChainId];
                amount = new sdk_1.TokenAmount(weth, (tempAmount * Math.pow(10, weth.decimals)).toString());
                return [4 /*yield*/, (0, exports.getWallet)({
                        userId: userId
                    })];
            case 1:
                _a = _b.sent(), account = _a.wallet, recipient = _a.ethereumAddress;
                return [4 /*yield*/, sdk_1.Fetcher.fetchPairData(currency, weth, constants_1.provider)];
            case 2:
                pair = _b.sent();
                route = new sdk_1.Route([pair], weth);
                trade = new sdk_1.Trade(route, amount, sdk_1.TradeType.EXACT_INPUT);
                amountOutMin = trade.minimumAmountOut(constants_1.slippageTolerance).raw;
                amountOutMin = ethers_1.BigNumber.from(amountOutMin).toHexString();
                path = [weth.address, currency.address];
                deadline = (0, constants_1.TWENTY_MINS_AHEAD)();
                inputAmount = trade.inputAmount.raw;
                inputAmount = ethers_1.BigNumber.from(inputAmount).toHexString();
                uniswap = (0, constants_1.getUniswapContract)(account);
                return [4 /*yield*/, constants_1.provider.getGasPrice()];
            case 3:
                gasPrice = (_b.sent()).toHexString();
                gasLimit = ethers_1.BigNumber.from(500000).toHexString();
                return [4 /*yield*/, uniswap.swapExactETHForTokens(amountOutMin, path, recipient, deadline, { value: inputAmount, gasPrice: gasPrice, gasLimit: gasLimit })];
            case 4:
                _b.sent();
                return [2 /*return*/, {
                        status: true,
                        message: "Successfully swapped ".concat(tempAmount, " ETH for ").concat(tempCurrency)
                    }];
            case 5:
                error_3 = _b.sent();
                return [2 /*return*/, {
                        status: false,
                        message: "Error trying to swap erc20 token to eth".concat(env_1.devEnv ? ": " + error_3 : "")
                    }];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.ethToErc20V2 = ethToErc20V2;
/**
 * Swap erc20 token to eth
 * @param {wallet.Erc20ToEth} params  Request Body
 * @returns {others.Response} Contains status, message and data if any of the operation
 */
var erc20ToEthV2 = function (params) { return __awaiter(void 0, void 0, void 0, function () {
    var tempCurrency, tempAmount, userId, currency, weth, amountIn, amount, _a, account, recipient, gasLimit, contract, approvedAddress, pair, route, trade, amountOutMin, path, deadline, uniswap, gasPrice, error_4;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 10, , 11]);
                tempCurrency = params.currency, tempAmount = params.amount, userId = params.userId;
                currency = constants_1.currencies[tempCurrency];
                if (!currency) {
                    return [2 /*return*/, {
                            payload: { status: false, message: "Currency not found" },
                            code: 404
                        }];
                }
                weth = sdk_1.WETH[env_1.ethChainId];
                amountIn = Math.floor(tempAmount * Math.pow(10, currency.decimals));
                amount = new sdk_1.TokenAmount(currency, amountIn.toString());
                return [4 /*yield*/, (0, exports.getWallet)({
                        userId: userId
                    })];
            case 1:
                _a = _b.sent(), account = _a.wallet, recipient = _a.ethereumAddress;
                gasLimit = ethers_1.BigNumber.from(500000).toHexString();
                contract = (0, constants_1.getTokenContract)(currency.address, account);
                return [4 /*yield*/, models_1.ApprovedAddress.findOne({
                        where: { ethereumAddress: recipient }
                    })];
            case 2:
                approvedAddress = _b.sent();
                if (!!approvedAddress) return [3 /*break*/, 6];
                return [4 /*yield*/, contract.transferFrom(recipient, env_1.uniswapV2ExchangeAddress, amountIn, { gasLimit: gasLimit })];
            case 3:
                _b.sent();
                return [4 /*yield*/, contract.approve(env_1.uniswapV2ExchangeAddress, sdk_core_1.MaxUint256.toString())];
            case 4:
                _b.sent();
                return [4 /*yield*/, models_1.ApprovedAddress.create({ id: (0, uuid_1.v4)(), ethereumAddress: recipient })];
            case 5:
                _b.sent();
                _b.label = 6;
            case 6: return [4 /*yield*/, sdk_1.Fetcher.fetchPairData(currency, weth, constants_1.provider)];
            case 7:
                pair = _b.sent();
                route = new sdk_1.Route([pair], weth);
                trade = new sdk_1.Trade(route, amount, sdk_1.TradeType.EXACT_OUTPUT);
                amountOutMin = Buffer.from(trade.minimumAmountOut(constants_1.slippageTolerance).raw.toString()).toString("hex");
                path = [currency.address, weth.address];
                deadline = (0, constants_1.TWENTY_MINS_AHEAD)();
                uniswap = (0, constants_1.getUniswapContract)(account);
                return [4 /*yield*/, constants_1.provider.getGasPrice()];
            case 8:
                gasPrice = (_b.sent()).toHexString();
                return [4 /*yield*/, uniswap.swapExactTokensForETH(amountIn, amountOutMin, path, recipient, deadline, { gasPrice: gasPrice, gasLimit: gasLimit })];
            case 9:
                _b.sent();
                return [2 /*return*/, {
                        status: true,
                        message: "Successfully swapped ".concat(tempAmount, " ").concat(tempCurrency, " for ETH")
                    }];
            case 10:
                error_4 = _b.sent();
                return [2 /*return*/, {
                        status: false,
                        message: "Error trying to swap erc20 token to eth".concat(env_1.devEnv ? ": " + error_4 : "")
                    }];
            case 11: return [2 /*return*/];
        }
    });
}); };
exports.erc20ToEthV2 = erc20ToEthV2;
/**
 * Gaslessly swap erc20 token to eth
 * @param {wallet.Erc20ToEth} params  Request Body
 * @returns {others.Response} Contains status, message and data if any of the operation
 */
var gaslessErc20ToEth = function (params) { return __awaiter(void 0, void 0, void 0, function () {
    var tempCurrency, tempAmount, userId, currency, amount, ethAmount, _a, account, recipient, _b, liquidityAccount, sender, contract, data, gasPrice, balance, nonce, erc20Tx, gasLimit, rate, tx, to, value, ethBalance, ethTx, trxn1, trxn2, error_5;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 12, , 13]);
                tempCurrency = params.currency, tempAmount = params.amount, userId = params.userId;
                currency = constants_1.currencies[tempCurrency];
                if (!currency) {
                    return [2 /*return*/, {
                            payload: { status: false, message: "Currency not found" },
                            code: 404
                        }];
                }
                amount = Math.floor(tempAmount * Math.pow(10, currency.decimals));
                return [4 /*yield*/, etherToECR20({
                        rate: tempAmount,
                        currency: tempCurrency,
                        inverse: true
                    })];
            case 1:
                ethAmount = _c.sent();
                return [4 /*yield*/, (0, exports.getWallet)({ userId: userId })];
            case 2:
                _a = _c.sent(), account = _a.wallet, recipient = _a.ethereumAddress;
                _b = getLiquidityWallet(), liquidityAccount = _b.wallet, sender = _b.ethereumAddress;
                contract = (0, constants_1.getTokenContract)(currency.address, account);
                data = contract.interface.encodeFunctionData("transfer", [
                    sender,
                    amount,
                ]);
                return [4 /*yield*/, constants_1.provider.getGasPrice()];
            case 3:
                gasPrice = _c.sent();
                gasPrice = Math.ceil(gasPrice.toNumber());
                return [4 /*yield*/, contract.balanceOf(recipient)];
            case 4:
                balance = _c.sent();
                if (ethers_1.BigNumber.from(balance).lt(ethers_1.BigNumber.from(amount))) {
                    return [2 /*return*/, {
                            status: false,
                            message: "You dont have enough ".concat(tempCurrency)
                        }];
                }
                return [4 /*yield*/, constants_1.provider.getTransactionCount(recipient)];
            case 5:
                nonce = _c.sent();
                erc20Tx = {
                    from: recipient,
                    to: contract.address,
                    data: data,
                    nonce: nonce
                };
                return [4 /*yield*/, constants_1.provider.estimateGas(erc20Tx)];
            case 6:
                gasLimit = _c.sent();
                gasLimit = Math.ceil(gasLimit.toNumber());
                erc20Tx.gasLimit = gasLimit.toString();
                rate = gasLimit * gasPrice;
                erc20Tx.gasPrice = gasPrice.toString();
                tx = new ethereumjs_tx_1.Transaction(erc20Tx, { chain: env_1.ethChainId });
                // let privateKeyBuffer = Buffer.from(privateKey, "hex");
                // tx.sign(privateKeyBuffer);
                if (ethAmount < rate) {
                    return [2 /*return*/, {
                            status: false,
                            message: "Charge cannot be greater tha amount"
                        }];
                }
                to = web3_1["default"].utils.toChecksumAddress(recipient);
                value = ethers_1.BigNumber.from(Math.floor(ethAmount).toString());
                return [4 /*yield*/, constants_1.provider.getBalance(sender)];
            case 7:
                ethBalance = _c.sent();
                if (ethBalance.lt(value)) {
                    return [2 /*return*/, {
                            status: false,
                            message: "Liquidity provider does not have enough ETH"
                        }];
                }
                value = value.toString();
                ethTx = { to: to, value: value };
                return [4 /*yield*/, liquidityAccount.sendTransaction(ethTx)];
            case 8:
                trxn1 = _c.sent();
                return [4 /*yield*/, trxn1.wait()];
            case 9:
                _c.sent();
                // Send ERC20
                tx = tx.serialize().toString("hex");
                return [4 /*yield*/, constants_1.provider.sendTransaction(erc20Tx)];
            case 10:
                trxn2 = _c.sent();
                return [4 /*yield*/, trxn2.wait()];
            case 11:
                _c.sent();
                return [2 /*return*/, {
                        status: true,
                        message: "Successfully swapped ".concat(tempAmount, " ").concat(tempCurrency, " for ETH without gas")
                    }];
            case 12:
                error_5 = _c.sent();
                return [2 /*return*/, {
                        status: false,
                        message: "Error trying to swap erc20 token to eth".concat(env_1.devEnv ? ": " + error_5 : "")
                    }];
            case 13: return [2 /*return*/];
        }
    });
}); };
exports.gaslessErc20ToEth = gaslessErc20ToEth;
/**
 * Send ERC20 token
 * @param {wallet.SendErc20Token} params  Request Body
 * @returns {others.Response} Contains status, message and data if any of the operation
 */
var sendErc20Token = function (params) { return __awaiter(void 0, void 0, void 0, function () {
    var tempAmount, tempCurrency, tempTo, userId, chargeFromAmount, currency, to, _a, account, from, privateKey, amount, contract, data, gasPrice, balance, tx, gasLimit, rate, charge, tempCharge, newAmount, nonceb4Swap, _b, status_1, message, nonceAfterSwap, transaction, privateKeyBuffer, error_6;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 10, , 11]);
                tempAmount = params.amount, tempCurrency = params.currency, tempTo = params.to, userId = params.userId, chargeFromAmount = params.chargeFromAmount;
                currency = constants_1.currencies[tempCurrency];
                to = web3_1["default"].utils.toChecksumAddress(tempTo);
                return [4 /*yield*/, (0, exports.getWallet)({
                        userId: userId
                    })];
            case 1:
                _a = _c.sent(), account = _a.wallet, from = _a.ethereumAddress, privateKey = _a.privateKey;
                if (!currency) {
                    return [2 /*return*/, {
                            payload: { status: false, message: "Currency not found" },
                            code: 404
                        }];
                }
                amount = Math.floor(tempAmount * Math.pow(10, currency.decimals));
                contract = (0, constants_1.getTokenContract)(currency.address, account);
                data = contract.interface.encodeFunctionData("transfer", [to, amount]);
                return [4 /*yield*/, constants_1.provider.getGasPrice()];
            case 2:
                gasPrice = _c.sent();
                gasPrice = gasPrice.toNumber();
                gasPrice = Math.ceil(gasPrice);
                return [4 /*yield*/, contract.balanceOf(from)];
            case 3:
                balance = _c.sent();
                if (ethers_1.BigNumber.from(balance).lt(ethers_1.BigNumber.from(amount))) {
                    return [2 /*return*/, {
                            status: false,
                            message: "You dont have enough ".concat(tempCurrency)
                        }];
                }
                tx = {
                    from: from,
                    to: contract.address,
                    data: data,
                    gasPrice: ethers_1.ethers.utils.hexlify(gasPrice)
                };
                gasLimit = void 0;
                return [4 /*yield*/, constants_1.provider.estimateGas(tx)];
            case 4:
                gasLimit = _c.sent();
                gasLimit = Math.ceil(gasLimit.toNumber());
                tx.gasLimit = ethers_1.ethers.utils.hexlify(gasLimit);
                rate = gasLimit * gasPrice;
                return [4 /*yield*/, etherToECR20({ rate: rate, currency: tempCurrency })];
            case 5:
                charge = _c.sent();
                tempCharge = Math.ceil(charge * Math.pow(10, currency.decimals));
                newAmount = void 0;
                if (chargeFromAmount) {
                    if (amount < tempCharge) {
                        return [2 /*return*/, {
                                status: false,
                                message: "Charge is greater the amount"
                            }];
                    }
                    newAmount = ethers_1.BigNumber.from(amount).sub(ethers_1.BigNumber.from(tempCharge));
                    data = contract.interface.encodeFunctionData("transfer", [
                        to,
                        newAmount.toString(),
                    ]);
                    tx.data = data;
                    rate = gasLimit * gasPrice;
                }
                else {
                    newAmount = amount + tempCharge;
                    if (ethers_1.BigNumber.from(balance).lt(ethers_1.BigNumber.from(newAmount))) {
                        return [2 /*return*/, {
                                status: false,
                                message: "You dont have enough ".concat(tempCurrency)
                            }];
                    }
                }
                return [4 /*yield*/, constants_1.provider.getTransactionCount(from)];
            case 6:
                nonceb4Swap = _c.sent();
                return [4 /*yield*/, (0, exports.gaslessErc20ToEth)({
                        userId: userId,
                        currency: tempCurrency,
                        amount: charge
                    })];
            case 7:
                _b = _c.sent(), status_1 = _b.status, message = _b.message;
                return [4 /*yield*/, constants_1.provider.getTransactionCount(from)];
            case 8:
                nonceAfterSwap = _c.sent();
                if (!status_1)
                    return [2 /*return*/, { status: status_1, message: message }];
                tx.nonce =
                    nonceAfterSwap > nonceb4Swap ? nonceAfterSwap : nonceAfterSwap + 1;
                transaction = new ethereumjs_tx_1.Transaction(tx, { chain: env_1.ethChainId });
                privateKeyBuffer = Buffer.from(privateKey, "hex");
                transaction.sign(privateKeyBuffer);
                return [4 /*yield*/, constants_1.provider.sendTransaction("0x" + transaction.serialize().toString("hex"))];
            case 9:
                _c.sent();
                return [2 /*return*/, {
                        status: true,
                        message: "Successfully transffered ".concat(tempAmount, " ").concat(tempCurrency, " to ").concat(to)
                    }];
            case 10:
                error_6 = _c.sent();
                return [2 /*return*/, {
                        status: false,
                        message: "Error trying to send erc20 token".concat(env_1.devEnv ? ": " + error_6 : "")
                    }];
            case 11: return [2 /*return*/];
        }
    });
}); };
exports.sendErc20Token = sendErc20Token;
/**
 * Send ETH
 * @param {wallet.SendErc20Token} params  Request Body
 * @returns {others.Response} Contains status, message and data if any of the operation
 */
var sendEth = function (params) { return __awaiter(void 0, void 0, void 0, function () {
    var tempAmount, tempTo, userId, to, value, tx, _a, wallet_2, ethereumAddress, balance, error_7;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 4, , 5]);
                tempAmount = params.amount, tempTo = params.to, userId = params.userId;
                to = web3_1["default"].utils.toChecksumAddress(tempTo);
                value = (0, utils_1.parseEther)(tempAmount.toString());
                tx = { to: to, value: value };
                return [4 /*yield*/, (0, exports.getWallet)({
                        userId: userId
                    })];
            case 1:
                _a = _b.sent(), wallet_2 = _a.wallet, ethereumAddress = _a.ethereumAddress;
                return [4 /*yield*/, constants_1.provider.getBalance(ethereumAddress)];
            case 2:
                balance = _b.sent();
                if (ethers_1.BigNumber.from(balance).lt(ethers_1.BigNumber.from(value))) {
                    return [2 /*return*/, {
                            status: false,
                            message: "You dont have enough ETH"
                        }];
                }
                return [4 /*yield*/, wallet_2.sendTransaction(tx)];
            case 3:
                _b.sent();
                return [2 /*return*/, {
                        status: true,
                        message: "Successfully transferred ".concat(tempAmount, " ETH to ").concat(to)
                    }];
            case 4:
                error_7 = _b.sent();
                return [2 /*return*/, {
                        status: false,
                        message: "Error trying to send eth".concat(env_1.devEnv ? ": " + error_7 : "")
                    }];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.sendEth = sendEth;
// ---------------------------
// Helpers
// ---------------------------
var generateEthereumAddress = function () {
    var provider = new web3_1["default"].providers.HttpProvider(env_1.ethProviderUrl);
    var web3 = new web3_1["default"](provider);
    var ethereumAccount = web3.eth.accounts.create();
    delete ethereumAccount.encrypt;
    delete ethereumAccount.sign;
    delete ethereumAccount.signTransaction;
    return ethereumAccount;
};
var etherToECR20 = function (_a) {
    var currency = _a.currency, rate = _a.rate, _b = _a.inverse, inverse = _b === void 0 ? false : _b;
    return __awaiter(void 0, void 0, void 0, function () {
        var res, _c, _d, quote, base, unitPrice;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0: return [4 /*yield*/, (0, node_fetch_1["default"])("https://api.coingecko.com/api/v3/simple/price?ids=".concat(constants_1.coinGeckMap[currency], "&vs_currencies=usd"))];
                case 1:
                    res = _e.sent();
                    return [4 /*yield*/, res.json()];
                case 2:
                    _c = _e.sent(), _d = constants_1.coinGeckMap[currency], quote = _c[_d].usd;
                    return [4 /*yield*/, (0, node_fetch_1["default"])("https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd")];
                case 3:
                    res = _e.sent();
                    return [4 /*yield*/, res.json()];
                case 4:
                    base = (_e.sent()).ethereum.usd;
                    unitPrice = quote / base;
                    return [2 /*return*/, inverse
                            ? unitPrice * rate * Math.pow(10, 18)
                            : unitPrice / (rate / Math.pow(10, 18))];
            }
        });
    });
};
var getWallet = function (_a) {
    var userId = _a.userId;
    return __awaiter(void 0, void 0, void 0, function () {
        var user, ethereumAddress, privateKey, wallet;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, models_1.User.findByPk(userId)];
                case 1:
                    user = _b.sent();
                    ethereumAddress = web3_1["default"].utils.toChecksumAddress(user.ethereumAddress);
                    return [4 /*yield*/, user.resolveAccount({})];
                case 2:
                    privateKey = (_b.sent()).privateKey;
                    if (privateKey.length == 66)
                        privateKey = privateKey.substring(2);
                    wallet = new ethers_1.Wallet(privateKey).connect(constants_1.provider);
                    return [2 /*return*/, { ethereumAddress: ethereumAddress, privateKey: privateKey, wallet: wallet }];
            }
        });
    });
};
exports.getWallet = getWallet;
var getLiquidityWallet = function () {
    var ethereumAddress = web3_1["default"].utils.toChecksumAddress(env_1.liquidityAdress);
    var privateKey = env_1.liquidityPrivateKey;
    if (privateKey.length == 66)
        privateKey = privateKey.substring(2);
    var wallet = new ethers_1.Wallet(privateKey).connect(constants_1.provider);
    if (ethereumAddress !== wallet.address) {
        throw new Error("Liquidity wallet address does not match private key");
    }
    return { ethereumAddress: ethereumAddress, privateKey: privateKey, wallet: wallet };
};
var sendAllowance = function (recipient) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, liquidityWallet, sender, allowance, ethBalance, tx, trxn;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = getLiquidityWallet(), liquidityWallet = _a.wallet, sender = _a.ethereumAddress;
                allowance = (0, utils_1.parseEther)(env_1.newUserAllowance.toString());
                return [4 /*yield*/, constants_1.provider.getBalance(sender)];
            case 1:
                ethBalance = _b.sent();
                if (ethBalance.lt(allowance)) {
                    return [2 /*return*/, {
                            status: false,
                            message: "Liquidity provider does not have enough ETH"
                        }];
                }
                tx = { to: recipient, value: allowance };
                return [4 /*yield*/, liquidityWallet.sendTransaction(tx)];
            case 2:
                trxn = _b.sent();
                return [4 /*yield*/, trxn.wait()];
            case 3:
                _b.sent();
                return [2 /*return*/, {
                        status: true,
                        message: "Successfully sent ".concat(env_1.newUserAllowance, " ETH to ").concat(recipient)
                    }];
        }
    });
}); };
