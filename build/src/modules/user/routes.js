"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
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
exports.__esModule = true;
var express_1 = require("express");
var middlewares_1 = require("../../middlewares");
var user = __importStar(require("./services"));
var validator = __importStar(require("./validators"));
var routes = (0, express_1.Router)();
routes.get("/", (0, middlewares_1.controller)(user.getProfile));
routes.put("/update-password", (0, middlewares_1.validate)(validator.updatePassword), (0, middlewares_1.controller)(user.updatePassword));
routes.put("/update-profile", (0, middlewares_1.validate)(validator.updateProfile), (0, middlewares_1.controller)(user.updateProfile));
routes.post("/log-other-devices-out", (0, middlewares_1.controller)(user.logOtherDevicesOut));
routes.post("/sign-out", (0, middlewares_1.controller)(user.signOut));
exports["default"] = routes;
