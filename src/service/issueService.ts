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
      _id: '5fcca74529a2e4361e3351d3',
      meta: {
        browser: {
          name: 'Chrome',
          version: '86.0.4240.198',
        },
        os: {
          name: 'Windows',
          version: '10',
        },
        url: 'http://localhost:9000/',
        ip: '::ffff:115.140.236.11',
      },
      type: 'TypeError',
      message: "Cannot set property 'innerHTML' of null",
      sdk: {
        name: 'pan-opt',
        version: '1.0.1',
      },
      stack: [
        {
          _id: '5fcca74529a2e4361e3351d4',
          columnNo: '25',
          lineNo: '61',
          filename: 'src/index.js?',
          function: 'HTMLButtonElement.evalllllllllllllllllll',
        },
        {
          _id: '5fcca74529a2e4361e3351d5',
          columnNo: '25',
          lineNo: '61',
          filename: 'src/index.js?',
          function: 'HTMLButtonElement.eval',
        },
        {
          _id: '5fcca74529a2e4361e3351d6',
          columnNo: '25',
          lineNo: '61',
          filename: 'src/index.js?',
          function: 'HTMLButtonElement.eval',
        },
      ],
      occuredAt: '2020-12-06T09:41:25.000Z',
      __v: 0,
    };
  };

  return {
    getIssue,
    getIssues,
    getCrime,
  };
};
