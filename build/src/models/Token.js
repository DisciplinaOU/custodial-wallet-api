"use strict";
exports.__esModule = true;
exports.Token = void 0;
var sequelize_1 = require("sequelize");
var db_1 = require("../configs/db");
exports.Token = db_1.db.define("Token", {
    id: { type: sequelize_1.DataTypes.UUID, primaryKey: true },
    UserId: { type: sequelize_1.DataTypes.UUID },
    token: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    expires: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    medium: { type: sequelize_1.DataTypes.STRING },
    tokenType: { type: sequelize_1.DataTypes.STRING },
    active: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false
    }
}, { timestamps: true, tableName: "token" });
