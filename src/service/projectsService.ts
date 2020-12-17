import { AxiosInstance, AxiosResponse } from 'axios';
import qs from 'qs';

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
  // Create
  addProject: (project: IProject) => Promise<AxiosResponse>;
  // Read
  getProjects: (userType?: string) => Promise<AxiosResponse>;
  getProject: (projectId: string) => Promise<AxiosResponse>;
  // Update
  updateProjectName: (projectId: string, name: IName) => Promise<AxiosResponse>;
  updateProjectOwner: (projectId: string, userIds: IUserUpdateIds) => Promise<AxiosResponse>;
  // Delete
  deleteProjectUsers: (projectId: string, name: IUserIds) => Promise<AxiosResponse>;
  deleteProject: (projectId: string) => Promise<AxiosResponse>;
  // Etc
  addSampleCrimes: (projectId: string) => Promise<AxiosResponse>;
  inviteMembers: (invite: IInvite) => Promise<AxiosResponse>;
}

const makeQueryString = (params: Record<string, string>): string => {
  if (params === {}) {
    return '';
  }
  return `?${qs.stringify(params)}`;
};

export default (apiRequest: AxiosInstance): IResponse => {
  // Create
  const addProject = (project: IProject) => {
    return apiRequest.post(`/api/project`, project);
  };

  // Read
  const getProjects = (userType?: string) => {
    if (userType === undefined) return apiRequest.get('/api/projects');
    const query = userType && makeQueryString({ userType });
    return apiRequest.get(`/api/projects${query}`);
  };
  const getProject = (projectId: string) => {
    return apiRequest.get(`/api/project/${projectId}`);
  };

  // Update
  const updateProjectName = (projectId: string, name: IName) => {
    return apiRequest.put(`/api/project/${projectId}/name`, name);
  };
  const updateProjectOwner = (projectId: string, userIds: IUserUpdateIds) => {
    return apiRequest.put(`/api/project/${projectId}/user`, userIds);
  };

  // Delete
  const deleteProjectUsers = (projectId: string, users: IUserIds) => {
    return apiRequest.put(`/api/project/${projectId}/users`, users);
  };
  const deleteProject = (projectId: string) => {
    return apiRequest.delete(`/api/project/${projectId}`);
  };

  // Etc
  const addSampleCrimes = (projectId: string) => {
    return apiRequest.post(`/api/sdk/${projectId}/samples`);
  };
  const inviteMembers = (invite: IInvite) => {
    return apiRequest.post(`/api/invite/${invite.projectId}`, invite);
  };

  return {
    addProject,
    getProjects,
    getProject,
    updateProjectName,
    updateProjectOwner,
    deleteProjectUsers,
    deleteProject,
    addSampleCrimes,
    inviteMembers,
  };
};
