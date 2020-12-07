import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

export interface Irequest {
  getIssue: () => Promise<AxiosRequestConfig>;
}
export default (
  apiRequest: AxiosInstance,
): {
  getIssue: (id: string) => Promise<AxiosResponse>;
  getIssues: (query: string) => Promise<AxiosResponse>;
  // getCrime: (id: string) => Promise<AxiosResponse>;
  getCrime: (id: string) => Promise<any>;
} => {
  const getIssue = (id: string) => {
    return apiRequest.get(`/api/issue/${id}`);
  };

  const getIssues = (query: string) => {
    return apiRequest.get(`/api/issues${query}`);
  };

  const getCrime = async (id: string) => {
    /*
     ** @TODO
     ** 단일 Crime API 연동
     */
    // return apiRequest.get(`/api/crime/${id}`);
    return {
      _id: '5fcc8ced5931b8932cca0753',
      meta: {
        browser: {
          name: 'fire-fox2222222222',
          version: 'recent',
        },
        os: {
          name: 'windows10',
          version: '1909',
        },
        url: '유저 url 1번',
        ip: 'localhost:4000',
      },
      message: '이슈 1번',
      type: '이슈 1번',
      stack: [
        {
          _id: '5fcc8ced5931b8932cca0754',
          columnNo: '81',
          lineNo: '110',
          function: 'occurError()',
          filename: 'index.js',
        },
      ],
      occuredAt: '2020-11-26T09:09:30.000Z',
      sdk: {
        name: 'panopticon',
        version: '1.0.0',
      },
      __v: 0,
    };
  };

  return {
    getIssue,
    getIssues,
    getCrime,
  };
};
