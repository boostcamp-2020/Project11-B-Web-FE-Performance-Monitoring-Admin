import { AxiosInstance, AxiosResponse } from 'axios';
import qs from 'querystring';

export interface IResponse {
  getDailyVisits: (projectIds: string[], year: number, month: number) => Promise<AxiosResponse>;
  getMonthlyVisits: (projectIds: string[], year: number) => Promise<AxiosResponse>;
}

export default (apiRequest: AxiosInstance): IResponse => {
  const getDailyVisits = (projectIds: string[], year: number, month: number) => {
    const query = `?${qs.stringify({
      projectId: projectIds,
      type: 'daily',
      year,
      month,
    })}`;

    return apiRequest.get(`/api/visits${query}`);
  };
  const getMonthlyVisits = (projectIds: string[], year: number) => {
    const query = `?${qs.stringify({
      projectId: projectIds,
      type: 'monthly',
      year,
    })}`;

    return apiRequest.get(`/api/visits${query}`);
  };
  return {
    getDailyVisits,
    getMonthlyVisits,
  };
};
