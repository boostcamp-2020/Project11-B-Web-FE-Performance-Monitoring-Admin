import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

const headers = {
  headers: {
    jwt: localStorage.getItem('token'),
  },
};

export interface Irequest {
  getIssue: () => Promise<AxiosRequestConfig>;
}
export default (
  apiRequest: AxiosInstance,
): {
  getIssue: (id: string) => Promise<AxiosResponse>;
  getIssues: (query: string) => Promise<AxiosResponse>;
} => {
  const getIssue = (id: string) => {
    return apiRequest.get(`/api/issue/${id}`, headers);
  };

  const getIssues = (query: string) => {
    return apiRequest.get(`/api/issues${query}`, headers);
  };

  return {
    getIssue,
    getIssues,
  };
};
