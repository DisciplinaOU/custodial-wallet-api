import { Router } from "express";
import { controller, validate } from "../../middlewares";
import * as wallet from "./services";
import * as validator from "./validators";

const routes = Router();

routes.get(
  "/account-info",
  validate(validator.accountInfo),
  controller(wallet.accountInfo)
);

routes.post(
  "/send-erc20",
  validate(validator.sendErc20),
  controller(wallet.sendErc20Token)
);

routes.post(
  "/send-eth",
  validate(validator.sendEth),
  controller(wallet.sendEth)
);

export default routes;
