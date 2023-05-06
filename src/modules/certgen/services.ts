import axios from "axios";
import { certgenApiUrl, devEnv } from "../../configs/env";
import { AppConfig } from "../../types/config";
import { certgen } from "../../types/services";
import { getWallet } from "../wallet/services";
import { disciplinaContract } from "../../contracts/disciplina";

type ProxiedRequest = {
  method: string;
  url: string;
  authToken: string;
} & any;

const certEndpoint = axios.create({ baseURL: certgenApiUrl });

const proxyRequest = async ({
  method,
  url,
  authToken,
  ...rest
}: ProxiedRequest) => {
  const headers = { "Authorization": `Bearer ${authToken}` };
  const response = await certEndpoint.request({ method, url, headers, ...rest });
  return response.data;
}

const wrapProxyError = (error: any, msgPrefix: string) => {
  const data = {
    status: false,
    message: msgPrefix.concat(devEnv ? ": " + error : ""),
  }

  if (error.response) {
    return {
      code: error.response.status,
      payload: data,
    }
  } else {
    return data;
  }
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

export const listCertificates = async (
  params: certgen.ListCertificatesRequest
) => {
  try {
    const { authToken } = params;
    delete params.authToken;

    const data = await proxyRequest({
      method: "GET",
      url: "/certificates",
      authToken,
      params,
    });

    return {
      status: true,
      message: "Certificates listed",
      data,
    };
  } catch (error) {
    return wrapProxyError(error, "Error trying to list certificates");
  }
}

export const getCertificate = async ({
  authToken,
  certificateId
}: certgen.GetCertificateRequest) => {
  try {
    const data = await proxyRequest({
      method: "GET",
      url: `/certificates/${certificateId}`,
      authToken,
    });

    return {
      status: true,
      message: "Certificate fetched",
      data,
    }

  } catch (error) {
    return wrapProxyError(error, "Error trying to fetch certificate")
  }
}

export const createCertificate = async (
  params: certgen.CreateCertificateRequest,
) => {
  try {
    const { authToken, userId } = params;
    delete params.authToken;
    delete params.userId;

    const data = await proxyRequest({
      method: "POST",
      url: "/certificate",
      authToken,
      data: params,
    });

    const { headers } = data;
    const updatedHeaders = publishUnpublishedHeaders(userId, authToken, headers);

    return {
      status: true,
      message: "Certificate created",
      data: { ...data, headers: updatedHeaders },
    }
  } catch (error) {
    return wrapProxyError(error, "Error trying to create certificate")
  }
}

export const updateCertificate = async ({
  authToken,
  userId,
  certificateId,
  datas,
}: certgen.UpdateCertificateRequest) => {
  try {
    const data = await proxyRequest({
      method: "PUT",
      url: `/certificate/${certificateId}`,
      authToken,
      data: datas,
    });

    const { headers } = data;
    const updatedHeaders = publishUnpublishedHeaders(userId, authToken, headers);

    return {
      status: true,
      message: "Certificate created",
      data: { ...data, headers: updatedHeaders },
    }
  } catch (error) {
    return wrapProxyError(error, "Error trying to update certificate");
  }
}