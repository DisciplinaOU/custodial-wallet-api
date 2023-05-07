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
exports.getPayableAmount = exports.payBill = exports.verifyCustomer = exports.getBillerItems = exports.getBillersInCategory = exports.getCategories = exports.getAccountBalance = exports.electricityBillers = void 0;
var lodash_1 = __importDefault(require("lodash"));
var node_fetch_1 = __importDefault(require("node-fetch"));
var url_1 = require("url");
var billerProducts = [
    {
        name: 'MTN Data 1GB (SME)',
        duration: '30 Days',
        amount: 267,
        code: 'M1024',
        network: 'mtn',
        billerId: 'mtn-data',
        group: 'data-bundle',
        hasProducts: true,
        hasValidation: false
    },
    {
        name: 'MTN Data 2GB (SME)',
        duration: '30 Days',
        amount: 534,
        code: 'M2024',
        network: 'mtn',
        billerId: 'mtn-data',
        group: 'data-bundle',
        hasProducts: true,
        hasValidation: false
    },
    {
        name: 'MTN Data 3GB (SME)',
        duration: '30 Days',
        amount: 801,
        code: '3000',
        network: 'mtn',
        billerId: 'mtn-data',
        group: 'data-bundle',
        hasProducts: true,
        hasValidation: false
    },
    {
        name: 'MTN Data 5GB (SME)',
        duration: '30 Days',
        amount: 1335,
        code: '5000',
        network: 'mtn',
        billerId: 'mtn-data',
        group: 'data-bundle',
        hasProducts: true,
        hasValidation: false
    },
    {
        name: 'MTN Data 8GB (Direct)',
        duration: '30 Days',
        amount: 2579,
        code: 'GIFT8000',
        network: 'mtn',
        billerId: 'mtn-data',
        group: 'data-bundle',
        hasProducts: true,
        hasValidation: false
    },
    {
        name: 'MTN Data 15GB (Direct)',
        duration: '30 Days',
        amount: 4599,
        code: 'GIFT5000',
        network: 'mtn',
        billerId: 'mtn-data',
        group: 'data-bundle',
        hasProducts: true,
        hasValidation: false
    },
    {
        name: 'Glo Data 1GB',
        duration: '14 Days',
        amount: 439,
        code: 'G500',
        network: 'glo',
        billerId: 'glo-data',
        group: 'data-bundle',
        hasProducts: true,
        hasValidation: false
    },
    {
        name: 'Glo Data 2GB/2.5GB',
        duration: '30 Days',
        amount: 869,
        code: 'G1000',
        network: 'glo',
        billerId: 'glo-data',
        group: 'data-bundle',
        hasProducts: true,
        hasValidation: false
    },
    {
        name: 'Glo Data 5.8GB',
        duration: '30 Days',
        amount: 1749,
        code: 'G2000',
        network: 'glo',
        billerId: 'glo-data',
        group: 'data-bundle',
        hasProducts: true,
        hasValidation: false
    },
    {
        name: 'Glo Data 7.7GB',
        duration: '30 Days',
        amount: 2159,
        code: 'G2500',
        network: 'glo',
        billerId: 'glo-data',
        group: 'data-bundle',
        hasProducts: true,
        hasValidation: false
    },
    {
        name: 'Glo Data 10GB',
        duration: '30 Days',
        amount: 2599,
        code: 'G3000',
        network: 'glo',
        billerId: 'glo-data',
        group: 'data-bundle',
        hasProducts: true,
        hasValidation: false
    },
    {
        name: 'Glo Data 13.25GB',
        duration: '30 Days',
        amount: 3499,
        code: 'G4000',
        network: 'glo',
        billerId: 'glo-data',
        group: 'data-bundle',
        hasProducts: true,
        hasValidation: false
    },
    {
        name: 'Glo Data 18.25GB',
        duration: '30 Days',
        amount: 4299,
        code: 'G5000',
        network: 'glo',
        billerId: 'glo-data',
        group: 'data-bundle',
        hasProducts: true,
        hasValidation: false
    },
    {
        name: 'Glo Data 20GB/25GB',
        duration: '30 Days',
        amount: 6899,
        code: 'G8000',
        network: 'glo',
        billerId: 'glo-data',
        group: 'data-bundle',
        hasProducts: true,
        hasValidation: false
    },
    {
        name: 'Airtel Data 1.5GB',
        duration: '30 Days',
        amount: 929,
        code: 'AIR1000',
        network: 'airtel',
        billerId: 'airtel-data',
        group: 'data-bundle',
        hasProducts: true,
        hasValidation: false
    },
    {
        name: 'Airtel Data 2GB',
        duration: '30 Days',
        amount: 1049,
        code: 'Air1200',
        network: 'airtel',
        billerId: 'airtel-data',
        group: 'data-bundle',
        hasProducts: true,
        hasValidation: false
    },
    {
        name: 'Airtel Data 3GB',
        duration: '30 Days',
        amount: 1399,
        code: 'Air1500',
        network: 'airtel',
        billerId: 'airtel-data',
        group: 'data-bundle',
        hasProducts: true,
        hasValidation: false
    },
    {
        name: 'Airtel Data 4.5GB',
        duration: '30 Days',
        amount: 1869,
        code: 'AIR2000',
        network: 'airtel',
        billerId: 'airtel-data',
        group: 'data-bundle',
        hasProducts: true,
        hasValidation: false
    },
    {
        name: 'Airtel Data 6GB',
        duration: '30 Days',
        amount: 2349,
        code: 'AIR2500',
        network: 'airtel',
        billerId: 'airtel-data',
        group: 'data-bundle',
        hasProducts: true,
        hasValidation: false
    },
    {
        name: 'Airtel Data 8GB',
        duration: '30 Days',
        amount: 2799,
        code: 'Air3000',
        network: 'airtel',
        billerId: 'airtel-data',
        group: 'data-bundle',
        hasProducts: true,
        hasValidation: false
    },
    {
        name: 'Airtel Data 15GB',
        duration: '30 Days',
        amount: 4649,
        code: 'Air5000',
        network: 'airtel',
        billerId: 'airtel-data',
        group: 'data-bundle',
        hasProducts: true,
        hasValidation: false
    },
    {
        name: 'Airtel Data 40GB',
        duration: '30 Days',
        amount: 9299,
        code: 'Air100000',
        network: 'airte0',
        billerId: 'airtel-data',
        group: 'data-bundle',
        hasProducts: true,
        hasValidation: false
    },
    {
        name: '9mobile Data 1.5GB',
        duration: '30 Days',
        amount: 879,
        code: '9MOB1000',
        network: '9mobile',
        billerId: '9mobile-data',
        group: 'data-bundle',
        hasProducts: true,
        hasValidation: false
    },
    {
        name: '9mobile Data 2GB',
        duration: '30 Days',
        amount: 1049,
        code: '9MOB2000',
        network: '9mobile',
        billerId: '9mobile-data',
        group: 'data-bundle',
        hasProducts: true,
        hasValidation: false
    },
    {
        name: '9mobile Data 3GB',
        duration: '30 Days',
        amount: 1299,
        code: '9MOB3000',
        network: '9mobile',
        billerId: '9mobile-data',
        group: 'data-bundle',
        hasProducts: true,
        hasValidation: false
    },
    {
        name: '9mobile Data 4.5GB',
        duration: '30 Days',
        amount: 1729,
        code: '9MOB34500',
        network: '9mobile',
        billerId: '9mobile-data',
        group: 'data-bundle',
        hasProducts: true,
        hasValidation: false
    },
    {
        name: '9mobile Data 11GB',
        duration: '30 Days',
        amount: 3429,
        code: '9MOB4000',
        network: '9mobile',
        billerId: '9mobile-data',
        group: 'data-bundle',
        hasProducts: true,
        hasValidation: false
    },
    {
        name: '9mobile Data 15GB',
        duration: '30 Days',
        amount: 4279,
        code: '9MOB5000',
        network: '9mobile',
        billerId: '9mobile-data',
        group: 'data-bundle',
        hasProducts: true,
        hasValidation: false
    },
    {
        name: '9mobile Data 40GB',
        duration: '30 Days',
        amount: 8729,
        code: '9MOB40000',
        network: '9mobile',
        billerId: '9mobile-data',
        group: 'data-bundle',
        hasProducts: true,
        hasValidation: false
    },
    {
        name: 'DStv Great Wall',
        billerId: 'dstv',
        code: 'dstv-greatwall',
        group: 'cable-tv',
        hasProducts: true,
        hasValidation: true
    },
    {
        name: 'DStv Padi',
        billerId: 'dstv',
        code: 'dstv-padi',
        group: 'cable-tv',
        hasProducts: true,
        hasValidation: true
    },
    {
        name: 'DStv Yanga',
        billerId: 'dstv',
        code: 'dstv-yanga',
        group: 'cable-tv',
        hasProducts: true,
        hasValidation: true
    },
    {
        name: 'DStv Confam',
        billerId: 'dstv',
        code: 'dstv-confam',
        group: 'cable-tv',
        hasProducts: true,
        hasValidation: true
    },
    {
        name: 'DStv Asian',
        billerId: 'dstv',
        code: 'dstv6',
        group: 'cable-tv',
        hasProducts: true,
        hasValidation: true
    },
    {
        name: 'DStv Compact',
        billerId: 'dstv',
        code: 'dstv79',
        group: 'cable-tv',
        hasProducts: true,
        hasValidation: true
    },
    {
        name: 'DStv Compact Plus',
        billerId: 'dstv',
        code: 'dstv7',
        group: 'cable-tv',
        hasProducts: true,
        hasValidation: true
    },
    {
        name: 'DStv Premium',
        billerId: 'dstv',
        code: 'dstv3',
        group: 'cable-tv',
        hasProducts: true,
        hasValidation: true
    },
    {
        name: 'DStv Premium Asia',
        billerId: 'dstv',
        code: 'dstv10',
        group: 'cable-tv',
        hasProducts: true,
        hasValidation: true
    },
    {
        name: 'GOtv Lite',
        billerId: 'gotv',
        code: 'gotv-lite',
        group: 'cable-tv',
        hasProducts: true,
        hasValidation: true
    },
    {
        name: 'GOtv Jinja',
        billerId: 'gotv',
        code: 'gotv-jinja',
        group: 'cable-tv',
        hasProducts: true,
        hasValidation: true
    },
    {
        name: 'GOtv Jolli',
        billerId: 'gotv',
        code: 'gotv-jolli',
        group: 'cable-tv',
        hasProducts: true,
        hasValidation: true
    },
    {
        name: 'GOtv Max',
        billerId: 'gotv',
        code: 'gotv-max',
        group: 'cable-tv',
        hasProducts: true,
        hasValidation: true
    },
    {
        name: 'Startimes Nova',
        billerId: 'startimes',
        code: 'nova',
        group: 'cable-tv',
        hasProducts: true,
        hasValidation: true
    },
    {
        name: 'Startimes Basic',
        billerId: 'startimes',
        code: 'basic',
        group: 'cable-tv',
        hasProducts: true,
        hasValidation: true
    },
    {
        name: 'Startimes Smart',
        billerId: 'startimes',
        code: 'smart',
        group: 'cable-tv',
        hasProducts: true,
        hasValidation: true
    },
    {
        name: 'Startimes Classic',
        billerId: 'startimes',
        code: 'classic',
        group: 'cable-tv',
        hasProducts: true,
        hasValidation: true
    },
    {
        name: 'Startimes Super',
        billerId: 'startimes',
        code: 'super',
        group: 'cable-tv',
        hasProducts: true,
        hasValidation: true
    },
];
exports.electricityBillers = [
    {
        billerId: 'abuja-electric',
        group: 'electricity',
        name: 'Abuja Electricity Distribution Company (AEDC)',
        hasProducts: false,
        hasValidation: true
    },
    {
        billerId: 'eko-electric',
        group: 'electricity',
        name: 'Eko Electricity Distribution Company (EKEDC)',
        hasProducts: false,
        hasValidation: true
    },
    {
        billerId: 'ibadan-electric',
        group: 'electricity',
        name: 'Ibadan Electricity Distribution Company (IBEDC)',
        hasProducts: false,
        hasValidation: true
    },
    {
        billerId: 'ikeja-electric',
        group: 'electricity',
        name: 'Ikeja Electricity Distribution Company (IKEDC)',
        hasProducts: false,
        hasValidation: true
    },
    {
        billerId: 'jos-electric',
        group: 'electricity',
        name: 'Jos Electricity Distribution PLC (JEDplc)',
        hasProducts: false,
        hasValidation: true
    },
    {
        billerId: 'kaduna-electric',
        group: 'electricity',
        name: 'Kaduna Electricity Distribution Company (KAEDCO)',
        hasProducts: false,
        hasValidation: true
    },
    {
        billerId: 'kano-electric',
        group: 'electricity',
        name: 'Kano Electricity Distribution Company (KEDCO)',
        hasProducts: false,
        hasValidation: true
    },
    {
        billerId: 'portharcourt-electric',
        group: 'electricity',
        name: 'Port Harcourt Electricity Distribution Company (PHED)',
        hasProducts: false,
        hasValidation: true
    },
];
var request = function (_a) {
    var url = _a.url, _b = _a.body, body = _b === void 0 ? {} : _b;
    return __awaiter(void 0, void 0, void 0, function () {
        var _c, PAYGOLD_USERNAME, PAYGOLD_PASSWORD, searchParams, response, error_1;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    _c = process.env, PAYGOLD_USERNAME = _c.PAYGOLD_USERNAME, PAYGOLD_PASSWORD = _c.PAYGOLD_PASSWORD;
                    _d.label = 1;
                case 1:
                    _d.trys.push([1, 4, , 5]);
                    body = __assign(__assign({}, body), { username: PAYGOLD_USERNAME, password: PAYGOLD_PASSWORD });
                    searchParams = new url_1.URLSearchParams(body);
                    searchParams.toString();
                    return [4 /*yield*/, (0, node_fetch_1["default"])("https://paygold.ng/wp-json/api/v1/".concat(url, "?").concat(searchParams.toString()))];
                case 2:
                    response = _d.sent();
                    return [4 /*yield*/, response.json()];
                case 3:
                    response = _d.sent();
                    response.status = response.code === 'success';
                    delete response.code;
                    return [2 /*return*/, response];
                case 4:
                    error_1 = _d.sent();
                    return [2 /*return*/, {
                            status: false,
                            message: 'An error occured calling paygold'
                        }];
                case 5: return [2 /*return*/];
            }
        });
    });
};
var getAccountBalance = function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    switch (_a.label) {
        case 0: return [4 /*yield*/, request({ url: 'balance' })];
        case 1: return [2 /*return*/, _a.sent()];
    }
}); }); };
exports.getAccountBalance = getAccountBalance;
var getCategories = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, [
                {
                    id: 'cable-tv',
                    name: 'CableTV'
                },
                {
                    id: 'electricity',
                    name: 'Electricity'
                },
                {
                    id: 'airtime',
                    name: 'Airtime'
                },
                {
                    id: 'data-bundle',
                    name: 'Data Bundle'
                },
            ]];
    });
}); };
exports.getCategories = getCategories;
var getBillersInCategory = function (_a) {
    var id = _a.id;
    switch (id) {
        case 'electricity':
            return exports.electricityBillers;
        case 'airtime':
            return [
                {
                    group: 'airtime',
                    name: 'MTN',
                    billerId: 'mtn',
                    hasProducts: false,
                    hasValidation: false
                },
                {
                    group: 'airtime',
                    name: 'Glo',
                    billerId: 'glo',
                    hasProducts: false,
                    hasValidation: false
                },
                {
                    group: 'airtime',
                    name: '9Mobile',
                    billerId: '9mobile',
                    hasProducts: false,
                    hasValidation: false
                },
                {
                    group: 'airtime',
                    name: 'Airtel',
                    billerId: 'airtel',
                    hasProducts: false,
                    hasValidation: false
                },
            ];
        default:
            return lodash_1["default"].uniqBy(Object.values(lodash_1["default"].groupBy(billerProducts.filter(function (b) { return b.group === id; }), function (plan) { return plan.billerId; }))
                .flat(1)
                .map(function (_a) {
                var billerId = _a.billerId, network = _a.network, hasProducts = _a.hasProducts, hasValidation = _a.hasValidation;
                return {
                    billerId: billerId,
                    name: network || billerId,
                    hasProducts: hasProducts,
                    hasValidation: hasValidation
                };
            }), function (g) { return g.billerId; });
    }
};
exports.getBillersInCategory = getBillersInCategory;
var getBillerItems = function (_a) {
    var billerId = _a.billerId;
    var d = lodash_1["default"].groupBy(billerProducts, function (plan) { return plan.billerId; })[billerId];
    if (!d)
        return [];
    return d;
};
exports.getBillerItems = getBillerItems;
var verifyCustomer = function (_a) {
    var customer_id = _a.customerId, service_id = _a.serviceId, _b = _a.variationId, variation_id = _b === void 0 ? null : _b;
    return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_c) {
            return [2 /*return*/, request({
                    url: 'verify-customer',
                    body: { customer_id: customer_id, service_id: service_id, variation_id: variation_id }
                })];
        });
    });
};
exports.verifyCustomer = verifyCustomer;
var payBill = function (_a) {
    var customer_id = _a.customerId, phone = _a.phone, _b = _a.serviceId, service_id = _b === void 0 ? null : _b, _c = _a.productId, product_id = _c === void 0 ? null : _c, group = _a.group, amount = _a.amount;
    return __awaiter(void 0, void 0, void 0, function () {
        var response, _d;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    _d = group;
                    switch (_d) {
                        case 'airtime': return [3 /*break*/, 1];
                        case 'electricity': return [3 /*break*/, 3];
                        case 'data-bundle': return [3 /*break*/, 5];
                        case 'cable-tv': return [3 /*break*/, 7];
                    }
                    return [3 /*break*/, 9];
                case 1: return [4 /*yield*/, request({
                        url: 'airtime',
                        body: { network_id: service_id, phone: customer_id, amount: amount }
                    })];
                case 2:
                    response = _e.sent();
                    return [3 /*break*/, 9];
                case 3: return [4 /*yield*/, request({
                        url: 'electricity',
                        body: {
                            service_id: service_id,
                            variation_id: product_id,
                            phone: phone,
                            amount: amount,
                            meter_number: customer_id
                        }
                    })];
                case 4:
                    response = _e.sent();
                    return [3 /*break*/, 9];
                case 5: return [4 /*yield*/, request({
                        url: 'data',
                        body: {
                            phone: customer_id,
                            netword_id: service_id,
                            variation_id: product_id
                        }
                    })];
                case 6:
                    response = _e.sent();
                    return [3 /*break*/, 9];
                case 7: return [4 /*yield*/, request({
                        url: 'tv',
                        body: {
                            phone: phone,
                            service_id: service_id,
                            smartcard_number: customer_id,
                            variation_id: product_id
                        }
                    })];
                case 8:
                    response = _e.sent();
                    return [3 /*break*/, 9];
                case 9: return [2 /*return*/, { status: response.status, message: response.message }];
            }
        });
    });
};
exports.payBill = payBill;
var getPayableAmount = function (_a) {
    var amount = _a.amount, group = _a.group, productId = _a.productId;
    return ['data-bundle', 'cable-tv'].includes(group) ?
        lodash_1["default"].groupBy(billerProducts, function (p) { return p.code; })[productId][0].amount :
        amount;
};
exports.getPayableAmount = getPayableAmount;
