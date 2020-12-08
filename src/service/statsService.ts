import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

interface ISharesDataRequest {
  projectIds: string[];
  type: string;
  period: string;
}
export interface Irequest {
  getStatsData: () => Promise<AxiosRequestConfig>;
}
export default (
  apiRequest: AxiosInstance,
): {
  getStatsData: (query: string, token: string) => Promise<AxiosResponse>;
  // getSharesData: (query: string) => Promise<AxiosResponse>;
  getSharesData: (req: ISharesDataRequest) => Promise<any>;
} => {
  const getStatsData = (query: string, token: string) => {
    return apiRequest.get(`/api/stats${query}`, { headers: { jwt: token } });
  };
  // sample query : ?projectId=myproject1&projectId=myproject2&type=recent&period=1w
  const getSharesData = async (req: ISharesDataRequest) => {
    /*
     * @TODO: Piechart API 연동
     * return apiRequest.get(`/api/stats${query}`);
     * */
    return {
      issues: [
        {
          _id: '5fcee6a717a95f43cee1b1ce',
          message: 'something is wrong6',
          type: 'ReferenceError',
          count: '1',
        },
        {
          _id: '5fcee89b17a95f43cee20374',
          message: 'Hello',
          type: 'EvalError',
          count: '14',
        },
      ],
      browsers: [
        {
          name: 'Firefox',
          count: '3',
        },
        {
          name: 'Chrome',
          count: '14',
        },
      ],
      types: [
        {
          name: 'SyntaxError',
          count: '5',
        },
        {
          name: 'TypeError',
          count: '7',
        },
        {
          name: 'ReferenceError',
          count: '20',
        },
      ],
      urls: [
        {
          name: 'http://panopticon.gq/projects',
          count: '5',
        },
        {
          name: 'http://panopticon.gq/issue',
          count: '18',
        },
        {
          name: 'http://panopticon.gq/discover',
          count: '35',
        },
      ],
    };
  };
  return {
    getStatsData,
    getSharesData,
  };
};
