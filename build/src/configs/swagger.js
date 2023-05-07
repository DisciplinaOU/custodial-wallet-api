"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.config = void 0;
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
var package_json_1 = require("../../package.json");
var env_1 = require("./env");
var description = function () {
    return fs_1["default"].readFileSync(path_1["default"].resolve(__dirname, "../docs/description.md")).toString();
};
var swagger = {
    swaggerDefinition: {
        info: {
            version: package_json_1.version,
            description: description(),
            title: "".concat(package_json_1.displayName, " (").concat(env_1.env, ")"),
            contact: { name: "Dmitii Mukhutdinov", email: "flyingleafe@gmail.com" },
            servers: [{ url: "http://localhost:".concat(env_1.port) }]
        },
        basePath: "/api"
    },
    apis: [path_1["default"].resolve(__dirname, "../docs/*.yml")]
};
var config = (0, swagger_jsdoc_1["default"])(swagger);
exports.config = config;
