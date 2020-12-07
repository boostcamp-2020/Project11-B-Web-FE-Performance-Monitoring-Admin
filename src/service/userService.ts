import { AxiosInstance, AxiosResponse } from 'axios';

export interface IResponse {
  login: (code: string) => Promise<AxiosResponse>;
  getUser: (userId: string) => Promise<AxiosResponse>;
  acceptInvitation: (key: string) => Promise<AxiosResponse>;
}

export default (apiRequest: AxiosInstance): IResponse => {
  const login = (code: string) => {
    return apiRequest.get(`/api/auth/github?code=${code}`);
  };
  const getUser = (userId: string) => {
    return apiRequest.get(`/api/user/${userId}`);
  };
  const acceptInvitation = (key: string) => {
    return apiRequest.get(`/api/accept?key=${key}`);
  };
  return {
    login,
    getUser,
    acceptInvitation,
  };
};
