import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

export interface Irequest {
  getStatsData: () => Promise<AxiosRequestConfig>;
}
export default (
  apiRequest: AxiosInstance,
): {
  getStatsData: (query: string, token: string) => Promise<AxiosResponse>;
} => {
  const getStatsData = (query: string, token: string) => {
    return apiRequest.get(`/api/stats${query}`, { headers: { jwt: token } });
  };
  return {
    getStatsData,
  };
};
