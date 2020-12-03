import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

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
  // getProjects: () => Promise<AxiosResponse>;
  addProject: (project: IProject, token: string) => Promise<AxiosResponse>;
  inviteMembers: (invite: IInvite, token: string) => Promise<AxiosResponse>;
}

export default (apiRequest: AxiosInstance): IResponse => {
  // TODO
  // const getProjects = (userType: string) => {
  //   return apiRequest.get(`/api/projects`);
  // };

  const addProject = (project: IProject, token: string) => {
    return apiRequest.post(`/api/project`, project, { headers: { jwt: token } });
  };

  const inviteMembers = (invite: IInvite, token: string) => {
    return apiRequest.post('/api/invite', invite, { headers: { jwt: token } });
  };

  return {
    // getProjects,
    addProject,
    inviteMembers,
  };
};
