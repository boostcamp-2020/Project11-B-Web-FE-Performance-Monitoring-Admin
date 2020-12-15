import { AxiosInstance, AxiosResponse } from 'axios';
import qs from 'querystring';

export interface IAlalysisService {
  getSession: (selectedProjectsIds: string[]) => Promise<AxiosResponse>;
}

export default (apiRequest: AxiosInstance): IAlalysisService => {
  const getSession = (selectedProjectsIds: string[]) => {
    const query = `?${qs.stringify({
      projectId: selectedProjectsIds,
    })}`;
    return apiRequest.get(`/api/session${query}`);
  };

  return {
    getSession,
  };
};
