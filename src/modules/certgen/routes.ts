import { Router } from "express";
import { controller, validate } from "../../middlewares";
import * as certgen from "./services";
import * as validator from "./validators";

const routes = Router();

routes.get(
  '/certificates',
  validate(validator.listCertificates),
  controller(certgen.listCertificates)  
)

routes.get(
  '/certificate/:certificateId',
  controller(certgen.getCertificate)
)

routes.post(
  '/certificate',
  validate(validator.createCertificate),
  controller(certgen.createCertificate),
)

routes.put(
  '/certificate/:certificateId',
  validate(validator.updateCertificate),
  controller(certgen.updateCertificate),
)

export default routes;