import { Router } from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import { controller, validate } from "../../middlewares";
import * as certgen from "./services";
import * as validator from "./validators";
import { certgenApiUrl } from "../../configs/env";

const routes = Router();

routes.use(certgen.directProxy())

// routes.get(
//   '/certificates',
//   validate(validator.listCertificates),
//   controller(certgen.listCertificates)  
// )

// routes.post(
//   '/certificate',
//   validate(validator.createCertificate),
//   controller(certgen.createCertificate),
// )

// routes.put(
//   '/certificate/:certificateId',
//   validate(validator.updateCertificate),
//   controller(certgen.updateCertificate),
// )

export default routes;