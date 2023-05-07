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
var cors_1 = __importDefault(require("cors"));
var express_1 = __importDefault(require("express"));
var express_form_data_1 = __importDefault(require("express-form-data"));
var swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
var package_json_1 = require("../package.json");
var configs_1 = require("./configs");
var middlewares_1 = require("./middlewares");
var utils_1 = require("./utils");
var routes_1 = __importDefault(require("./routes"));
var port = configs_1.env.port;
configs_1.db.authenticate({});
function init() {
    return __awaiter(this, void 0, void 0, function () {
        var app, appConfig;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    app = (0, express_1["default"])();
                    return [4 /*yield*/, configs_1.runtime.getConfig()];
                case 1:
                    appConfig = _a.sent();
                    app.use((0, middlewares_1.configure)(appConfig));
                    app.use(express_form_data_1["default"].parse());
                    app.use(express_1["default"].json({ limit: "100mb", type: "application/json" }));
                    app.use(express_1["default"].urlencoded({ limit: "100mb", extended: true }));
                    app.use((0, cors_1["default"])());
                    app.use("/api-docs", swagger_ui_express_1["default"].serve, swagger_ui_express_1["default"].setup(configs_1.swagger.config));
                    app.use("/bull-board", configs_1.bullBoard.adapter.getRouter());
                    configs_1.security.lock(app);
                    app.use("", routes_1["default"]);
                    app.use(function (err, _, res) {
                        return (0, utils_1.response)(res, { status: false, message: "Internal server error: ".concat(err.message) }, 500);
                    });
                    if (require.main) {
                        app.listen(port, function () {
                            console.log("".concat(package_json_1.displayName, " is running on http://localhost:").concat(port, " (").concat(configs_1.env.env, ")"));
                        });
                    }
                    return [2 /*return*/, app];
            }
        });
    });
}
var appPromise = init();
exports["default"] = appPromise;
