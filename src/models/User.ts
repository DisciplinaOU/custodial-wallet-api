import bcrypt from "bcryptjs";
import * as jose from "jose";
import * as crypto from "crypto";
import { DataTypes } from "sequelize";
import { walletSecret } from "../configs/env";
import { db } from "../configs/db";

const walletSecretHash = crypto.createHash("sha256").update(walletSecret).digest();

const User = db.define(
  "User",
  {
    id: { type: DataTypes.UUID, primaryKey: true },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    firstname: { type: DataTypes.STRING },
    lastname: { type: DataTypes.STRING },
    othernames: { type: DataTypes.STRING },
    avatar: { type: DataTypes.STRING },
    ethereumAddress: { type: DataTypes.STRING },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "user",
      values: ["user", "admin"],
    },
    permissions: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: [],
      allowNull: false,
    },
    phone: { type: DataTypes.STRING },
    location: { type: DataTypes.STRING },
    password: { type: DataTypes.STRING }, 
    ethereumAccount: { type: DataTypes.TEXT },
    gender: { type: DataTypes.STRING },
    dob: { type: DataTypes.DATE },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    verifiedemail: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    verifiedphone: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false,
    },
    loginValidFrom: {
      type: DataTypes.STRING,
      defaultValue: Date.now(),
      allowNull: false,
    },
  },
  { timestamps: true, tableName: "user" }
);

const securePasswordAndAccount = async (user: any, options) => {
  if (user.changed("password")) {
    const salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(user.password, salt);
  }
  if (user.changed("ethereumAccount") && typeof user.ethereumAccount !== "string") {
    const acc = await new jose.EncryptJWT(user.ethereumAccount)
      .setProtectedHeader({ alg: "dir", enc: "A128CBC-HS256" })
      .encrypt(walletSecretHash);
    user.ethereumAccount = acc;
  }
}

User.beforeValidate(securePasswordAndAccount);

User.prototype.toJSON = function () {
  const data = this.dataValues;

  delete data.password;
  delete data.isDeleted;
  delete data.active;
  delete data.role;
  delete data.permissions;
  delete data.loginValidFrom;
  delete data.ethereumAccount;
  delete data.bitcoinAccount;

  return data;
};

User.prototype.validatePassword = function (val: string) {
  return bcrypt.compareSync(val, this.getDataValue("password"));
};

User.prototype.resolveAccount = async function ({ account = "ethereum" }) {
  const { payload } = await jose.jwtDecrypt(this.getDataValue(`${account}Account`), walletSecretHash);
  return payload;
};

export { User };
