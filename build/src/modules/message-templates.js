"use strict";
exports.__esModule = true;
exports.resetPassword = exports.verifyPhone = exports.verifyEmail = exports.registration = void 0;
var uuid_1 = require("uuid");
var FRONTEND_BASEURL = process.env.FRONTEND_BASEURL;
var registration = function (_a) {
    var token = _a.token, firstname = _a.firstname, email = _a.email;
    var link = "".concat(FRONTEND_BASEURL, "/auth/verify?token=").concat(token);
    return {
        text: "Dear ".concat(firstname, ", Your registration on custodial wallet is successful. your token is ").concat(token),
        html: "\n      <p>\n        Dear ".concat(firstname, ",\n        <span style=\"display: none !important\">").concat((0, uuid_1.v4)(), "</span>\n      </p>\n      Your registration on custodial wallet is successful.<br>\n      <span style=\"display: none !important\">").concat((0, uuid_1.v4)(), "</span>\n      <p>\n        To verify to your email click here <a href=\"").concat(link, "\">").concat(link, "</a>\n        <span style=\"display: none !important\">").concat((0, uuid_1.v4)(), "</span>\n      </p>\n      <p>\n        Clicking this link will securely verify your account on my https://mycustodialwallet.herokuapp.com using ").concat(email, "\n        <span style=\"display: none !important\">").concat((0, uuid_1.v4)(), "</span>\n      </p>\n      <span style=\"display: none !important\">").concat((0, uuid_1.v4)(), "</span>\n    ")
    };
};
exports.registration = registration;
var verifyEmail = function (_a) {
    var token = _a.token, firstname = _a.firstname, email = _a.email;
    var link = "".concat(FRONTEND_BASEURL, "/auth/verify?token=").concat(token);
    return {
        text: "Dear ".concat(firstname, ", You requested to verify your email on custodial wallet. To verify to your email click here ").concat(link, ". Clicking this link will securely verify your account on my https://mycustodialwallet.herokuapp.com using ").concat(email),
        html: "\n      <p>\n        Dear ".concat(firstname, ",\n        <span style=\"display: none !important\">").concat((0, uuid_1.v4)(), "</span>\n      </p>\n        You requested to verify your email on custodial wallet.<br>\n      <p>\n        To verify to your email click here <a href=\"").concat(link, "\">").concat(link, "</a>\n        <span style=\"display: none !important\">").concat((0, uuid_1.v4)(), "</span>\n      </p>\n      <p>\n        Clicking this link will securely verify your account on my https://mycustodialwallet.herokuapp.com using ").concat(email, "\n        <span style=\"display: none !important\">").concat((0, uuid_1.v4)(), "</span>\n      </p>\n      <span style=\"display: none !important\">").concat((0, uuid_1.v4)(), "</span>\n    ")
    };
};
exports.verifyEmail = verifyEmail;
var verifyPhone = function (_a) {
    var token = _a.token, firstname = _a.firstname;
    return "Dear ".concat(firstname, ", Your IghoApp verification code is ").concat(token);
};
exports.verifyPhone = verifyPhone;
var resetPassword = function (_a) {
    var token = _a.token, firstname = _a.firstname;
    var link = "".concat(FRONTEND_BASEURL, "/auth/verify-reset?token=").concat(token);
    return {
        text: "Dear ".concat(firstname, ", You requested to reset your password on custodial wallet. To reset to your password click here ").concat(link),
        html: "\n    <p>\n      Dear ".concat(firstname, ",\n      <span style=\"display: none !important\">").concat((0, uuid_1.v4)(), "</span>\n    </p>\n      You requested to reset your password on custodial wallet.<br>\n    <p>\n      To reset to your password, click here <a href=\"").concat(link, "\">").concat(link, "</a>\n      <span style=\"display: none !important\">").concat((0, uuid_1.v4)(), "</span>\n    </p>\n    <span style=\"display: none !important\">").concat((0, uuid_1.v4)(), "</span>\n    ")
    };
};
exports.resetPassword = resetPassword;
