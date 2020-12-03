import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

interface IName {
  name: string;
}

interface IUsers {
  userIds: number[];
}

export interface IRequest {
  getProject: () => Promise<AxiosRequestConfig>;
  updateProjectName: () => Promise<AxiosRequestConfig>;
  deleteProjectUsers: () => Promise<AxiosRequestConfig>;
}

export interface IResponse {
  getProject: (projectId: string) => Promise<AxiosResponse>;
  updateProjectName: (projectId: string, name: IName) => Promise<AxiosResponse>;
  deleteProjectUsers: (projectId: string, name: IUsers) => Promise<AxiosResponse>;
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
    return apiRequest.put(`/api/project/name/${projectId}`, name);
  };
  const deleteProjectUsers = (projectId: string, users: IUsers) => {
    return apiRequest.put(`/api/project/${projectId}/users`, users);
  };

  return {
    getProject,
    updateProjectName,
    deleteProjectUsers,
  };
};
