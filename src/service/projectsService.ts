import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import * as qs from 'qs';

export interface IRequest {
  getProjects: () => Promise<AxiosRequestConfig>;
  addProject: () => Promise<AxiosRequestConfig>;
}

interface IProject {
  name: string;
  description: string;
}

interface IInvite {
  to: string[];
  project: string;
  projectId: string;
}

export interface IResponse {
  getProjects: (userType?: string) => Promise<AxiosResponse>;
  addProject: (project: IProject, token: string) => Promise<AxiosResponse>;
  inviteMembers: (invite: IInvite, token: string) => Promise<AxiosResponse>;
}

export default (apiRequest: AxiosInstance): IResponse => {
  const makeQueryString = (params: Record<string, string>): string => {
    if (params === {}) {
      return '';
    }
    return `?${qs.stringify(params)}`;
  };

  const getProjects = (userType?: string) => {
    if (userType === undefined) return apiRequest.get('/api/projects');
    const query = userType && makeQueryString({ userType });
    return apiRequest.get(`/api/projects${query}`);
  };

  const addProject = (project: IProject, token: string) => {
    return apiRequest.post(`/api/project`, project, { headers: { jwt: token } });
  };

  const inviteMembers = (invite: IInvite, token: string) => {
    return apiRequest.post('/api/invite', invite, { headers: { jwt: token } });
  };

  return {
    getProjects,
    addProject,
    inviteMembers,
  };
};
