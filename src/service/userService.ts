import { AxiosInstance, AxiosResponse } from 'axios';

export interface IResponse {
  login: (code: string) => Promise<AxiosResponse>;
  getUser: (userId?: string) => Promise<AxiosResponse>;
  acceptInvitation: (key: string) => Promise<AxiosResponse>;
  updateEmail: (email: string) => Promise<AxiosResponse>;
}

export default (apiRequest: AxiosInstance): IResponse => {
  const login = (code: string) => {
    return apiRequest.get(`/api/auth/github?code=${code}`);
  };
  const getUser = (userId?: string) => {
    return apiRequest.get(`/api/user/${userId || 'self'}`);
  };
  const acceptInvitation = (key: string) => {
    return apiRequest.get(`/api/accept?key=${key}`);
  };
  const updateEmail = (email: string) => {
    return apiRequest.patch(`/api/user/email`, { email });
  };
  return {
    login,
    getUser,
    acceptInvitation,
    updateEmail,
  };
};
