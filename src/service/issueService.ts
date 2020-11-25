import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

export interface Irequest {
  getIssue: () => Promise<AxiosRequestConfig>;
}
export default (
  apiRequest: AxiosInstance,
): {
  getIssue: (id: string) => Promise<AxiosResponse>;
  getIssues: () => Promise<AxiosResponse>;
} => {
  const getIssue = (id: string) => {
    return apiRequest.get(`/api/issue/${id}`);
  };
  const getIssues: () => Promise<AxiosResponse> = () => {
    return apiRequest.get(`/api/issues`);
  };
  return {
    getIssue,
    getIssues,
  };
};
