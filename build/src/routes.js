"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = require("express");
var utils_1 = require("./utils");
var middlewares_1 = require("./middlewares");
var routes_1 = __importDefault(require("./modules/auth/routes"));
var routes_2 = __importDefault(require("./modules/user/routes"));
var routes_3 = __importDefault(require("./modules/wallet/routes"));
var routes_4 = __importDefault(require("./modules/certgen/routes"));
var routes = (0, express_1.Router)();
var api = (0, express_1.Router)();
routes.use("/auth", routes_1["default"]);
routes.use((0, middlewares_1.authenticate)());
routes.use("/user", routes_2["default"]);
routes.use("/wallet", routes_3["default"]);
routes.use("/certgen", routes_4["default"]);
api.use("/api", routes);
api.use(function (_, res) {
    (0, utils_1.response)(res, { status: false, message: "Route not found" }, 404);
});
exports["default"] = api;
