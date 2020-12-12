import { AxiosInstance, AxiosResponse } from 'axios';
import qs from 'querystring';

export interface IResponse {
  getDailyVisits: (projectId: string, year: number, month: number) => Promise<AxiosResponse>;
  getDailyVisitsMulti: (
    projectIds: string[],
    year: number,
    month: number,
  ) => Promise<AxiosResponse>;
  getMonthlyVisits: (projectId: string, year: number) => Promise<AxiosResponse>;
}

export default (apiRequest: AxiosInstance): IResponse => {
  const getDailyVisits = (projectId: string, year: number, month: number) => {
    return apiRequest.get(`/api/visits/${projectId}?type=daily&year=${year}&month=${month}`);
  };
  const getDailyVisitsMulti = (projectIds: string[], year: number, month: number) => {
    const query = `?${qs.stringify({
      projectId: projectIds,
      type: 'daily',
      year,
      month,
    })}`;

    return apiRequest.get(`/api/visits${query}`);
  };
  const getMonthlyVisits = (projectId: string, year: number) => {
    return apiRequest.get(`/api/visits/${projectId}?type=monthly&year=${year}`);
  };
  return {
    getDailyVisits,
    getMonthlyVisits,
    getDailyVisitsMulti,
  };
};
