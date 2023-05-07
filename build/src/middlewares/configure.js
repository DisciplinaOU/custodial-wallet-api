"use strict";
exports.__esModule = true;
exports.configure = void 0;
var configure = function (config) { return function (req, res, next) {
    req.config = config;
    next();
}; };
exports.configure = configure;
