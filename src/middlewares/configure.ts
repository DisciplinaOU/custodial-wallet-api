import { NextFunction, Response } from "express";
import { CustomRequest } from "../types/controllers";
import { AppConfig } from "../types/config";

export const configure = (config: AppConfig) => (req: CustomRequest, res: Response, next: NextFunction) => {
    req.config = config;
    next();
}
