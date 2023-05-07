"use strict";
exports.__esModule = true;
exports.provider = exports.currencies = exports.coinGeckMap = exports.TWENTY_MINS_AHEAD = exports.slippageTolerance = exports.getTokenContract = exports.getUniswapContract = void 0;
var providers_1 = require("@ethersproject/providers");
var sdk_1 = require("@uniswap/sdk");
var sdk_core_1 = require("@uniswap/sdk-core");
var smart_order_router_1 = require("@uniswap/smart-order-router");
var ethers_1 = require("ethers");
var env_1 = require("./env");
var WETH = new sdk_core_1.Token(smart_order_router_1.ChainId.RINKEBY, "0xc778417E063141139Fce010982780140Aa0cD5Ab", 18, "WETH", "Wrapped Ether");
var USDC = new sdk_core_1.Token(smart_order_router_1.ChainId.RINKEBY, "0x4DBCdF9B62e891a7cec5A2568C3F4FAF9E8Abe2b", 6, "USDC", "USD Coin");
var USDT = new sdk_core_1.Token(smart_order_router_1.ChainId.RINKEBY, "0xD9BA894E0097f8cC2BBc9D24D308b98e36dc6D02", 18, "USDT", "Compound USDT");
var getUniswapContract = function (account) {
    return new ethers_1.Contract(env_1.uniswapV2ExchangeAddress, [
        "function swapExactETHForTokens(uint amountOutMin, address[] calldata path, address to, uint deadline) external payable returns (uint[] memory amounts)",
        "function swapExactTokensForETH(uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline) external returns (uint[] memory amounts)",
    ], account);
};
exports.getUniswapContract = getUniswapContract;
var getTokenContract = function (address, account) {
    return new ethers_1.Contract(address, [
        "function approve(address _spender, uint256 _value) public returns (bool success)",
        "function transferFrom(address sender, address recipient, uint256 amount) external returns (bool)",
        "function transfer(address recipient, uint256 amount) external returns (bool)",
        "function balanceOf(address account) external view returns (uint256)",
    ], account);
};
exports.getTokenContract = getTokenContract;
exports.slippageTolerance = new sdk_1.Percent("50", "10000");
var TWENTY_MINS_AHEAD = function () { return Math.floor(Date.now() / 1000) + 60 * 20; };
exports.TWENTY_MINS_AHEAD = TWENTY_MINS_AHEAD;
exports.coinGeckMap = { USDT: "tether", WETH: "weth", USDC: "usd-coin" };
exports.currencies = { USDC: USDC, WETH: WETH, USDT: USDT };
exports.provider = new providers_1.JsonRpcProvider(env_1.ethProviderUrl);
