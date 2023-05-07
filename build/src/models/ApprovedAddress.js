"use strict";
exports.__esModule = true;
exports.ApprovedAddress = void 0;
var sequelize_1 = require("sequelize");
var db_1 = require("../configs/db");
var ApprovedAddress = db_1.db.define("ApprovedAddress", {
    id: { type: sequelize_1.DataTypes.UUID, primaryKey: true },
    ethereumAddress: { type: sequelize_1.DataTypes.STRING }
}, { timestamps: true, tableName: "approveAddress" });
exports.ApprovedAddress = ApprovedAddress;
