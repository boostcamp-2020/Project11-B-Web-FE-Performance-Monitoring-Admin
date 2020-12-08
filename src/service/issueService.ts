import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

export interface Irequest {
  getIssue: () => Promise<AxiosRequestConfig>;
}
export default (
  apiRequest: AxiosInstance,
): {
  getIssue: (id: string) => Promise<AxiosResponse>;
  getIssues: (query: string) => Promise<AxiosResponse>;
  getCrime: (id: string) => Promise<AxiosResponse>;
  getCrimes: (id: string, pageNum: number) => Promise<AxiosResponse>;
} => {
  const getIssue = (id: string) => {
    return apiRequest.get(`/api/issue/${id}`);
  };

  const getIssues = (query: string) => {
    return apiRequest.get(`/api/issues${query}`);
  };

  const getCrime = (id: string) => {
    return apiRequest.get(`/api/crime/${id}`);
  };

  const getCrimes = (id: string, pageNum: number) => {
    return apiRequest.get(`/api/crimes/${id}?page=${pageNum}`);
  };

  return {
    getIssue,
    getIssues,
    getCrime,
    getCrimes,
  };
};
