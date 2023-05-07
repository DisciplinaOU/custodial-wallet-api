import { Response } from "express";
import { response } from "../utils";
import { CustomRequest } from "../types/controllers";

export const controller =
  (fn: Function) => async (req: CustomRequest, res: Response) => {
    try {
      const params = { ...req.params, ...req.form }
      const data = await fn(params, req.config);

      if (data.code) {
        const { code, payload } = data;
        return response(res, payload, code);
      }

      const code = data.status ? 200 : 400;
      return response(res, data, code);
    } catch (e) {
      return response(
        res,
        { status: false, message: "Internal server error" },
        500
      );
    }
  };
