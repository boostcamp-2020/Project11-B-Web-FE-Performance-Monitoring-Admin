import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

export interface Irequest {
  getStatsData: () => Promise<AxiosRequestConfig>;
}
export default (
  apiRequest: AxiosInstance,
): {
  getStatsData: (query: string) => Promise<AxiosResponse>;
} => {
  const getStatsData = (query: string) => {
    return apiRequest.get(`/api/stats${query}`);
  };
  return {
    getStatsData,
  };
};
