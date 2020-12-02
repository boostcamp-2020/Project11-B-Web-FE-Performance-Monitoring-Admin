import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

export interface IRequest {
  getProjects: () => Promise<AxiosRequestConfig>;
  addProject: () => Promise<AxiosRequestConfig>;
}

interface IProject {
  name: string;
  description: string;
}

export interface IResponse {
  // getProjects: () => Promise<AxiosResponse>;
  addProject: (project: IProject) => Promise<AxiosResponse>;
}

export default (apiRequest: AxiosInstance): IResponse => {
  // TODO
  // const getProjects = (userType: string) => {
  //   return apiRequest.get(`/api/projects`);
  // };

  const addProject = (project: IProject) => {
    return apiRequest.post(`/api/project`, project);
  };

  return {
    // getProjects,
    addProject,
  };
};
