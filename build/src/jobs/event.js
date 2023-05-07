"use strict";
exports.__esModule = true;
exports.event = void 0;
var event = function (_a) {
    var event = _a.event, callback = _a.callback, queue = _a.queue;
    return queue.on(event, callback);
};
exports.event = event;
