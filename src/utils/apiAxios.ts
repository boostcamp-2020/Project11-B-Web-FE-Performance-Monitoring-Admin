import axios from 'axios';
import logoutUser from './logoutUser';

const apiAxios = axios.create({
  baseURL: '/',
});

// 요청 인터셉터 추가
apiAxios.interceptors.request.use((config) => {
  // 요청을 보내기 전에 수행할 일
  /**
   * @Todo token or session header insert
   */
  const newConfig = { ...config };
  newConfig.headers.token = window.localStorage.getItem('token');
  return newConfig;
});

// 응답 인터셉터 추가
apiAxios.interceptors.response.use(
  (response) => {
    // 응답 데이터를 가공
    return response;
  },
  (error) => {
    // 오류 응답을 처리
    if (error.response.status === 400) throw new Error('====TYPE ERROR ====');
    if (error.response.status === 401) {
      logoutUser();
      return;
    }
    if (error.response.status === 500) throw new Error('==== SERVER ERROR ====');
    throw new Error('==== UNKNOWN ERROR ====');
  },
);

export default apiAxios;
