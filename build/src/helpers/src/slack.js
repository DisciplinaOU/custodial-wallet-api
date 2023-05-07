"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.notify = void 0;
var slack_notify_1 = __importDefault(require("slack-notify"));
var notify = function (params) {
    var SLACK_WEBHOOK_URL = process.env.SLACK_WEBHOOK_URL;
    var Slack = (0, slack_notify_1["default"])(SLACK_WEBHOOK_URL);
    var notify;
    switch (params.type) {
        case 'success':
            notify = Slack.success;
            break;
        case 'bug':
            notify = Slack.bug;
            break;
        case 'note':
            notify = Slack.note;
            break;
        default:
            notify = Slack.alert;
            break;
    }
    return notify(params.body);
};
exports.notify = notify;
