import { Request } from "express";
import { AppConfig } from "../config";

interface RequestInterface {
  form: any;
  config?: AppConfig;
}

export interface CustomRequest
  extends Request<RequestInterface>,
  RequestInterface { }