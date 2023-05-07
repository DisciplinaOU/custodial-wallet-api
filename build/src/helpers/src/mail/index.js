"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
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
exports.generateReciepient3 = exports.generateReciepient2 = exports.generateReciepient = exports.ses = exports.sendinblue = exports.sendgrid = exports.pepipost = exports.nodemailer = exports.mailgun = void 0;
exports.mailgun = __importStar(require("./mailgun"));
exports.nodemailer = __importStar(require("./nodemailer"));
exports.pepipost = __importStar(require("./pepipost"));
exports.sendgrid = __importStar(require("./sendgrid"));
exports.sendinblue = __importStar(require("./sendinblue"));
exports.ses = __importStar(require("./ses"));
var generateReciepient = function (to) {
    var reciepients;
    if (typeof to === 'string') {
        reciepients = [{ email: to }];
    }
    else {
        reciepients = to.map(function (email) { return ({ email: email }); });
    }
    return reciepients;
};
exports.generateReciepient = generateReciepient;
var generateReciepient2 = function (to) {
    if (typeof to === 'string')
        return to;
    return to.join(',');
};
exports.generateReciepient2 = generateReciepient2;
var generateReciepient3 = function (to) {
    var reciepients;
    if (typeof to === 'string') {
        reciepients = [to];
        return reciepients;
    }
    return to;
};
exports.generateReciepient3 = generateReciepient3;
