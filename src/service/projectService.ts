import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

interface IName {
  name: string;
}
export interface IRequest {
  getProject: () => Promise<AxiosRequestConfig>;
  updateProjectName: () => Promise<AxiosRequestConfig>;
}

export interface IResponse {
  getProject: (projectId: string) => Promise<AxiosResponse>;
  updateProjectName: (projectId: string, name: IName) => Promise<AxiosResponse>;
}

export default (apiRequest: AxiosInstance): IResponse => {
  // TODO
  // const getProjects = (userType: string) => {
  //   return apiRequest.get(`/api/projects`);
  // };
  const getProject = (projectId: string) => {
    return apiRequest.get(`/api/project/${projectId}`);
  };
  const updateProjectName = (projectId: string, name: IName) => {
    return apiRequest.post(`/api/project/name/${projectId}`, name);
  };

  return {
    getProject,
    updateProjectName,
  };
};
