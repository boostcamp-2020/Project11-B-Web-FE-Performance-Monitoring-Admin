import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

export interface Irequest {
  getIssue: () => Promise<AxiosRequestConfig>;
}
export default (
  apiRequest: AxiosInstance,
): {
  getIssue: (id: number) => Promise<AxiosResponse>;
  getIssues: () => Promise<AxiosResponse>;
} => {
  const getIssue = (id: number) => {
    return apiRequest.get(`/api/issues/${id}`);
  };
  const getIssues: () => Promise<AxiosResponse> = () => {
    return apiRequest.get(`/api/issues`);
  };
  return {
    getIssue,
    getIssues,
  };
};
