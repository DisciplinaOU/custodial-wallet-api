"use strict";
exports.__esModule = true;
exports.process = void 0;
var process = function (_a) {
    var _b = _a.queueName, queueName = _b === void 0 ? '_default_' : _b, queue = _a.queue, _c = _a.options, options = _c === void 0 ? {} : _c, callback = _a.callback;
    return queue.define(queueName, options, callback);
};
exports.process = process;
