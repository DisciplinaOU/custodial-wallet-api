import { NextFunction, Response } from "express";
import * as jose from "jose";
import { env } from "../configs";
import { response } from "../utils";
import { User } from "../models";
import { CustomRequest } from "../types/controllers";
import { auth } from "../types/middlewares";
import { UserSchema } from "../types/models";

export const authenticate =
  (params: auth = { isAdmin: false }) =>
    async (req: CustomRequest, res: Response, next: NextFunction) => {
      try {
        const { authorization } = req.headers;

        if (!authorization)
          return response(res, { status: false, message: "Unauthorized" }, 401);

        const token = authorization.replace("Bearer ", "");
        const { payload: { data: { publicAddress }, exp } }: any = await jose.jwtVerify(
          token,
          req.config.jwtSecret
        );

        if (!publicAddress || !exp)
          return response(res, { status: false, message: "Unauthorized" }, 401);

        if (exp < Math.floor(Date.now() / 1000))
          return response(res, { status: false, message: "Unauthorized" }, 401);

        let where: any = { ethereumAddress: publicAddress, isDeleted: false, active: true };

        const user: UserSchema = await User.findOne({ where });

        if (!user)
          return response(res, { status: false, message: "Unauthorized" }, 401);

        if (params.isAdmin && user.role !== "admin")
          return response(res, { status: false, message: "Unauthorized" }, 401);

        if (!user)
          return response(res, { status: false, message: "Unauthorized" }, 401);

        req.form = req.form || {};
        req.form.userId = user.id;
        req.form.authToken = token;

        next();
      } catch (e) {
        return response(res, { status: false, message: "Unauthorized" }, 401);
      }
    };
