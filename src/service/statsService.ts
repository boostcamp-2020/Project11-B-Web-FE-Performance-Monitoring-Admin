import { AxiosInstance, AxiosResponse } from 'axios';
import qs from 'querystring';

interface ISharesDataRequest {
  projectIds: string[];
  type: string;
  period: string;
}

export default (
  apiRequest: AxiosInstance,
): {
  getStatsData: (query: string) => Promise<AxiosResponse>;
  // getSharesData: (query: string) => Promise<AxiosResponse>;
  getSharesData: (req: ISharesDataRequest) => Promise<any>;
  getCountByIssue: (query: string) => Promise<AxiosResponse>;
} => {
  const getStatsData = (query: string) => {
    return apiRequest.get(`/api/stats${query}`);
  };
  // sample query : ?projectId=myproject1&projectId=myproject2&type=recent&period=1w
  const getSharesData = async (req: ISharesDataRequest) => {
    const { projectIds, type, period } = req;

    const query = `?${qs.stringify({
      projectId: projectIds,
      type,
      period,
    })}`;

    return apiRequest.get(`/api/stats/shares${query}`);
  };
  const getCountByIssue = (query: string) => {
    return apiRequest.get(`/api/countbyissue${query}`);
  };
  return {
    getStatsData,
    getSharesData,
    getCountByIssue,
  };
};
