"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.liquidityPrivateKey = exports.liquidityAdress = exports.uniswapV2ExchangeAddress = exports.ethChainId = exports.btcNetwork = exports.disciplinaContractAddr = exports.certgenApiUrl = exports.ethProviderUrl = exports.devEnv = exports.dialect = exports.walletSecret = exports.jwtSecretPath = exports.dbURL = exports.port = exports.env = void 0;
var dotenv_1 = require("dotenv");
var joi_1 = __importDefault(require("joi"));
(0, dotenv_1.config)();
var schema = joi_1["default"].object({
    NODE_ENV: joi_1["default"].string()
        .valid("development", "production", "test", "provision")["default"]("development"),
    PORT: joi_1["default"].number().required(),
    JWT_SECRET_PATH: joi_1["default"].string().required(),
    WALLET_SECRET: joi_1["default"].string().required(),
    ETH_PROVIDER_URL: joi_1["default"].string().required(),
    CERTGEN_API_URL: joi_1["default"].string().required(),
    DISCIPLINA_CONTRACT: joi_1["default"].string().required(),
    DB_URL: joi_1["default"].string().required().description("Database connection URL"),
    DB_DIALECT: joi_1["default"].string().required().description("Database type"),
    BTC_NETWORK: joi_1["default"].string().required(),
    ETH_CHAIN_ID: joi_1["default"].number().required(),
    UNISWAP_V2_EXCHANGE_ADDRESS: joi_1["default"].string().required(),
    LIQUIDITY_ADDRESS: joi_1["default"].string().required(),
    LIQUIDITY_PRIVATE_KEY: joi_1["default"].string().required()
})
    .unknown()
    .required();
var _a = schema.validate(process.env), error = _a.error, value = _a.value;
if (error)
    throw error;
console.log('ENV VALUES');
console.log(value);
exports.env = value.NODE_ENV;
exports.port = parseInt(value.PORT);
exports.dbURL = value.DB_URL;
exports.jwtSecretPath = value.JWT_SECRET_PATH;
exports.walletSecret = value.WALLET_SECRET;
exports.dialect = value.DB_DIALECT;
exports.devEnv = exports.env === "development";
exports.ethProviderUrl = value.ETH_PROVIDER_URL;
exports.certgenApiUrl = value.CERTGEN_API_URL;
exports.disciplinaContractAddr = value.DISCIPLINA_CONTRACT;
exports.btcNetwork = value.BTC_NETWORK;
exports.ethChainId = value.ETH_CHAIN_ID;
exports.uniswapV2ExchangeAddress = value.UNISWAP_V2_EXCHANGE_ADDRESS;
exports.liquidityAdress = value.LIQUIDITY_ADDRESS;
exports.liquidityPrivateKey = value.LIQUIDITY_PRIVATE_KEY;
