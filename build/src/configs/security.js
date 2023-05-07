"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.lock = void 0;
var content_security_policy_1 = __importDefault(require("content-security-policy"));
var permissions_policy_1 = __importDefault(require("permissions-policy"));
var referrer_policy_1 = __importDefault(require("referrer-policy"));
var strict_transport_security_1 = __importDefault(require("strict-transport-security"));
var x_frame_options_1 = __importDefault(require("x-frame-options"));
var configs_1 = require("../configs");
var lock = function (app) {
    if (configs_1.env.env !== "development") {
        app.enable("trust proxy");
        app.use(function (req, res, next) {
            req.secure
                ? next()
                : res.redirect("https://" + req.headers.host + req.url);
        });
    }
    var STS = strict_transport_security_1["default"].getSTS({
        "max-age": { days: 365 },
        includeSubDomains: true,
        preload: true
    });
    app.use(STS);
    var CSP = content_security_policy_1["default"].getCSP(content_security_policy_1["default"].STARTER_OPTIONS);
    app.use(CSP);
    app.use((0, x_frame_options_1["default"])());
    app.use((0, referrer_policy_1["default"])());
    app.use((0, permissions_policy_1["default"])({
        features: {
            accelerometer: ["none"],
            ambientLightSensor: ["none"],
            autoplay: ["none"],
            battery: ["none"],
            camera: ["none"],
            displayCapture: ["none"],
            documentDomain: ["none"],
            documentWrite: ["none"],
            encryptedMedia: ["none"],
            executionWhileNotRendered: ["none"],
            executionWhileOutOfViewport: ["none"],
            fontDisplayLateSwap: ["none"],
            fullscreen: ["none"],
            geolocation: ["none"],
            gyroscope: ["none"],
            interestCohort: ["none"],
            layoutAnimations: ["none"],
            legacyImageFormats: ["none"],
            loadingFrameDefaultEager: ["none"],
            magnetometer: ["none"],
            microphone: ["none"],
            midi: ["none"],
            navigationOverride: ["none"],
            notifications: ["none"],
            oversizedImages: ["none"],
            payment: ["none"],
            pictureInPicture: ["none"],
            publickeyCredentials: ["none"],
            push: ["none"],
            serial: ["none"],
            speaker: ["none"],
            syncScript: ["none"],
            syncXhr: ["none"],
            unoptimizedImages: ["none"],
            unoptimizedLosslessImages: ["none"],
            unoptimizedLossyImages: ["none"],
            unsizedMedia: ["none"],
            usb: ["none"],
            verticalScroll: ["none"],
            vibrate: ["none"],
            vr: ["none"],
            wakeLock: ["none"],
            xr: ["none"],
            xrSpatialTracking: ["none"]
        }
    }));
    app.use(function (req, res, next) {
        res.setHeader("X-Content-Type-Options", "nosniff");
        next();
    });
};
exports.lock = lock;
