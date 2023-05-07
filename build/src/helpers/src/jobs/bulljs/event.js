"use strict";
exports.__esModule = true;
exports.event = void 0;
var event = function (_a) {
    var e = _a.event, callback = _a.callback, queue = _a.queue;
    return queue.on(e, callback);
};
exports.event = event;
