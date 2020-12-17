import { AxiosInstance, AxiosResponse } from 'axios';
import qs from 'querystring';

export interface IIssueService {
  getIssue: (id: string) => Promise<AxiosResponse>;
  getIssues: (
    selectedProjectsIds: string[],
    page: number,
    period: string,
    tags: string[],
  ) => Promise<AxiosResponse>;
  getCrime: (id: string) => Promise<AxiosResponse>;
  getCrimes: (id: string, pageNum: number) => Promise<AxiosResponse>;
}

export default (apiRequest: AxiosInstance): IIssueService => {
  const getIssue = (id: string) => {
    return apiRequest.get(`/api/issue/${id}`);
  };

  const getIssues = (
    selectedProjectsIds: string[],
    page: number,
    period: string,
    tags: string[],
  ) => {
    const query = `?${qs.stringify({
      page,
      projectId: selectedProjectsIds,
      period,
      tags: tags || undefined,
    })}`;
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
