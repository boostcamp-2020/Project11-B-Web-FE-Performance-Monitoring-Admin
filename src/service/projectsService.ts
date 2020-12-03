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
  addProject: (project: IProject) => Promise<AxiosResponse>;
  inviteMembers: (invite: IInvite) => Promise<AxiosResponse>;
}

const headers = {
  headers: {
    jwt: localStorage.getItem('token'),
  },
};

export default (apiRequest: AxiosInstance): IResponse => {
  // TODO
  // const getProjects = (userType: string) => {
  //   return apiRequest.get(`/api/projects`);
  // };

  const addProject = (project: IProject) => {
    return apiRequest.post(`/api/project`, project, headers);
  };

  const inviteMembers = (invite: IInvite) => {
    return apiRequest.post('/api/invite', invite, headers);
  };

  return {
    // getProjects,
    addProject,
    inviteMembers,
  };
};
