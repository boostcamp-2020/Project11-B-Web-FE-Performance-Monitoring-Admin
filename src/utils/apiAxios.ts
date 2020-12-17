import axios from 'axios';
import logoutUser from './logoutUser';

const apiAxios = axios.create({
  baseURL: '/',
});

apiAxios.interceptors.request.use((config) => {
  const newConfig = { ...config };
  newConfig.headers.token = window.localStorage.getItem('token');
  return newConfig;
});

apiAxios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const { status } = error.response;
    if (status === 401 || status === 502) {
      alert('Session Expired!');
      logoutUser();
      window.location.href = '/';
      return;
    }
    if (status === 400 || status === 404 || status === 500) {
      window.location.href = '/error';
      return;
    }
    logoutUser();
    window.location.href = '/';
  },
);

export default apiAxios;
