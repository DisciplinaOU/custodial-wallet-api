import axios from "axios";
import { createProxyMiddleware, responseInterceptor } from "http-proxy-middleware";

import { certgenApiUrl, devEnv } from "../../configs/env";
import { AppConfig } from "../../types/config";
import { certgen } from "../../types/services";
import { getWallet } from "../wallet/services";
import { disciplinaContract } from "../../contracts/disciplina";
import { CustomRequest } from "../../types/controllers";

type ProxiedRequest = {
  method: string;
  url: string;
  authToken: string;
} & any;

const certEndpoint = axios.create({ baseURL: certgenApiUrl });

export const directProxy = (pathSuffix: string = "") => createProxyMiddleware({
  target: certgenApiUrl + pathSuffix,
  changeOrigin: true,
  pathRewrite: { [`^/.*/certgen${pathSuffix}`]: '' },
  selfHandleResponse: true,
  onProxyReq: (proxyReq, req, res) => {
    if (req.body) {
      let bodyData = JSON.stringify(req.body);
      // incase if content-type is application/x-www-form-urlencoded -> we need to change to application/json
      proxyReq.setHeader('Content-Type', 'application/json');
      proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData));
      // stream the content
      proxyReq.write(bodyData);
    }
  },
  onProxyRes: responseInterceptor(interceptAndPublishHeaders),
  logLevel: "debug",
});

const proxyRequest = async ({
  method,
  url,
  authToken,
  additionalHeaders = {},
  ...rest
}: ProxiedRequest) => {
  const headers = { "Authorization": `Bearer ${authToken}`, ...additionalHeaders };
  const response = await certEndpoint.request({ method, url, headers, ...rest });
  return response.data;
}

const publishUnpublishedHeaders = async (userId: string, authToken: string, headers: any[]): Promise<any[]> => {
  const { wallet } = await getWallet({ userId });
  const curContract = disciplinaContract.connect(wallet);

  const updatedHeaders = [];

  for (const fullHeader of headers.reverse()) {
    if (fullHeader.pubTxId) {
      updatedHeaders.unshift(fullHeader)
    } else {
      const { header, headerHash } = fullHeader;
      const { prevBlock, bodyProof: { root, transactionsNum } } = header;

      const tx = await curContract.submitHeader(`0x${prevBlock}`, `0x${root}`, transactionsNum, {
        gasLimit: 500000,
      });
      const waitResult = await tx.wait();
      console.log(waitResult);

      const txId = tx.hash;

      await proxyRequest({
        method: "PUT",
        url: `/block/${headerHash}`,
        authToken,
        params: { txId },
      })

      updatedHeaders.unshift({ ...fullHeader, pubTxId: txId })
    }
  }

  return updatedHeaders;
}

const interceptAndPublishHeaders = async (responseBuffer, proxyRes, req, res) => {
  if (["POST", "PUT"].includes(req.method) && [200, 201].includes(proxyRes.statusCode)) {
    const { userId, authToken } = req.form;
    const response = JSON.parse(responseBuffer.toString());
    const { headers } = response;

    if (headers) {
      try {
        const updatedHeaders = await publishUnpublishedHeaders(userId, authToken, headers);

        const updatedResponse = { ...response, headers: updatedHeaders };
        console.log('Updated response: ', updatedResponse);

        return JSON.stringify(updatedResponse);
      } catch (error) {
        res.statusCode = 500;
        return JSON.stringify({ error: error.message });
      }
    }
  }

  return responseBuffer;
}

// export const listCertificates = async (
//   params: certgen.ListCertificatesRequest
// ) => {
//   try {
//     const { authToken } = params;
//     delete params.authToken;

//     const data = await proxyRequest({
//       method: "GET",
//       url: "/certificates",
//       authToken,
//       params,
//     });

//     return {
//       status: true,
//       message: "Certificates listed",
//       data,
//     };
//   } catch (error) {
//     return wrapProxyError(error, "Error trying to list certificates");
//   }
// }

// export const createCertificate = async (
//   params: certgen.CreateCertificateRequest,
// ) => {
//   try {
//     const { authToken, userId } = params;
//     delete params.authToken;
//     delete params.userId;

//     const data = await proxyRequest({
//       method: "POST",
//       url: "/certificate",
//       authToken,
//       data: params,
//     });

//     const { headers } = data;
//     const updatedHeaders = publishUnpublishedHeaders(userId, authToken, headers);
//     console.log(updatedHeaders);

//     return {
//       status: true,
//       message: "Certificate created",
//       data: { ...data, headers: updatedHeaders },
//     }
//   } catch (error) {
//     return wrapProxyError(error, "Error trying to create certificate")
//   }
// }

// export const updateCertificate = async ({
//   authToken,
//   userId,
//   certificateId,
//   datas,
// }: certgen.UpdateCertificateRequest) => {
//   try {
//     const data = await proxyRequest({
//       method: "PUT",
//       url: `/certificate/${certificateId}`,
//       authToken,
//       data: datas,
//     });

//     const { headers } = data;
//     const updatedHeaders = publishUnpublishedHeaders(userId, authToken, headers);

//     return {
//       status: true,
//       message: "Certificate created",
//       data: { ...data, headers: updatedHeaders },
//     }
//   } catch (error) {
//     return wrapProxyError(error, "Error trying to update certificate");
//   }
// }