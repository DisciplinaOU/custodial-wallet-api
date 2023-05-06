export interface ProxiedCertgenRequest {
  authToken: string;
  userId: string;
}

export interface ListCertificatesRequest extends ProxiedCertgenRequest {
  onlyCount?: boolean;
  offset?: number;
  limit?: number;
  sortBy?: string;
}

export interface GetCertificateRequest extends ProxiedCertgenRequest {
  certificateId: string;
}

interface DataCertificateRequest extends ProxiedCertgenRequest {
  datas: any[];
}

export interface CreateCertificateRequest extends DataCertificateRequest {
  meta: {
    issueDate: string;
    title: string;
    entity: number;
  }
}

export interface UpdateCertificateRequest extends DataCertificateRequest {
  certificateId: string;
}