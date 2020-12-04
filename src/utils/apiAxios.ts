import axios from 'axios';

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
  newConfig.headers.jwt = window.localStorage.getItem('token');
  return newConfig;
});

const checkStatusOkay = (status: number) => {
  return status.toString(10).charAt(0) === '2';
};

// 응답 인터셉터 추가
apiAxios.interceptors.response.use(
  (response) => {
    // 응답 데이터를 가공
    if (response.status === 400) throw new Error('====TYPE ERROR ====');
    if (response.status === 401) throw new Error('==== UNAUTHORIZED ==');
    if (response.status === 500) throw new Error('==== SERVER ERROR ====');
    if (!checkStatusOkay(response.status)) throw new Error('==== UNKNOWN ERROR ====');
    return response;
  },
  (error) => {
    // 오류 응답을 처리
    // ...
    return Promise.reject(error);
  },
);

export default apiAxios;
