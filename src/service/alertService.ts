import { AxiosInstance, AxiosResponse } from 'axios';

interface IAddAlertParams {
  projectId: string;
  users: string[];
  period?: string;
  count?: number;
}

export interface IResponse {
  addAlert: (params: IAddAlertParams) => Promise<AxiosResponse>;
}

export default (apiRequest: AxiosInstance): IResponse => {
  const addAlert = (params: IAddAlertParams) => {
    const { projectId, users, period, count } = params;
    return apiRequest.post(`/api/alert/${projectId}`, { users, period, count });
  };
  return {
    addAlert,
  };
};
