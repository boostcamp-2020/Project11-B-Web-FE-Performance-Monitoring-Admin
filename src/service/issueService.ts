import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

export interface Irequest {
  getIssue: () => Promise<AxiosRequestConfig>;
}
export default (
  apiRequest: AxiosInstance,
): {
  getIssue: (id: string, token: string) => Promise<AxiosResponse>;
  getIssues: (query: string, token: string) => Promise<AxiosResponse>;
} => {
  const getIssue = (id: string, token: string) => {
    return apiRequest.get(`/api/issue/${id}`, { headers: { jwt: token } });
  };

  const getIssues = (query: string, token: string) => {
    return apiRequest.get(`/api/issues${query}`, { headers: { jwt: token } });
  };

  return {
    getIssue,
    getIssues,
  };
};
