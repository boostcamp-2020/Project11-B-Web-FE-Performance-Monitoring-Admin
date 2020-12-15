import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

interface IName {
  name: string;
}

interface IUserIds {
  userIds: string[];
}

interface IUserUpdateIds {
  originUserId: string;
  targetUserId: string;
}

export interface IRequest {
  getProject: () => Promise<AxiosRequestConfig>;
  updateProjectName: () => Promise<AxiosRequestConfig>;
  updateProjectOwner: () => Promise<AxiosRequestConfig>;
  deleteProjectUsers: () => Promise<AxiosRequestConfig>;
  deleteProject: () => Promise<AxiosRequestConfig>;
}

export interface IResponse {
  getProject: (projectId: string) => Promise<AxiosResponse>;
  updateProjectName: (projectId: string, name: IName) => Promise<AxiosResponse>;
  updateProjectOwner: (projectId: string, userIds: IUserUpdateIds) => Promise<AxiosResponse>;
  deleteProjectUsers: (projectId: string, name: IUserIds) => Promise<AxiosResponse>;
  deleteProject: (projectId: string) => Promise<AxiosResponse>;
}

export default (apiRequest: AxiosInstance): IResponse => {
  const getProject = (projectId: string) => {
    return apiRequest.get(`/api/project/${projectId}`);
  };
  const updateProjectName = (projectId: string, name: IName) => {
    return apiRequest.put(`/api/project/${projectId}/name`, name);
  };
  const updateProjectOwner = (projectId: string, userIds: IUserUpdateIds) => {
    return apiRequest.put(`/api/project/${projectId}/user`, userIds);
  };
  const deleteProjectUsers = (projectId: string, users: IUserIds) => {
    return apiRequest.put(`/api/project/${projectId}/users`, users);
  };
  const deleteProject = (projectId: string) => {
    return apiRequest.delete(`/api/project/${projectId}`);
  };

  return {
    getProject,
    updateProjectName,
    updateProjectOwner,
    deleteProjectUsers,
    deleteProject,
  };
};
