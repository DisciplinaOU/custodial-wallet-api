import * as jose from "jose";
import { Response } from 'express';

import * as types from './types';

export const ed25519PrivateToPublic = async (privateKey: jose.KeyLike) => {
  const jwk = await jose.exportJWK(privateKey);
  delete jwk.d;
  return jose.importJWK(jwk, "EdDSA");
};

export const generate = async ({
  payload,
  secret,
  expiresIn = null,
}: types.generate) => {
  const publicKey = await ed25519PrivateToPublic(secret);
  const pubkeyJWK = await jose.exportJWK(publicKey);
  const header = {
    alg: "EdDSA",
    jwk: pubkeyJWK,
  };

  let token = new jose.SignJWT(payload).setProtectedHeader(header);

  if (expiresIn) {
    token = token.setExpirationTime(expiresIn);
  }

  return token.sign(secret);
};

export const verify = async ({ token, secret }: types.verify) => {
  try {
    token = token.replace('Bearer ', '');
    const data = jose.jwtVerify(token, secret);

    if (!Object.keys(data).length) return false;

    return data;
  } catch (error) {
    return false;
  }
};


export const response = async (
  res: Response,
  data: any,
  code: number = 200,
  debug = false,
) => {
  const error: Error = data.error;

  if (!debug) delete data.error;

  res.status(code).send({
    ...data,
    timestamp: `${new Date().toUTCString()}`,
  });
};

export const rethrow = async (promise: Promise<any>) => {
  const data = await promise;
  if (!data.status) {
    throw new Error(data.message);
  }
  return data;
}
