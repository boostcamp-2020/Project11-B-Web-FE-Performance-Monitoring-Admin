import { AxiosInstance, AxiosResponse } from 'axios';
import qs from 'querystring';

interface ISharesDataRequest {
  projectIds: string[];
  type: string;
  period: string;
}

export interface IStatsService {
  getStatsData: (query: string, token: string) => Promise<AxiosResponse>;
  getCrimesCountByIssue: (id: string) => Promise<AxiosResponse>;
  getSharesData: (req: ISharesDataRequest) => Promise<AxiosResponse>;
}

export default (apiRequest: AxiosInstance): IStatsService => {
  const getStatsData = (query: string, token: string) => {
    return apiRequest.get(`/api/stats${query}`, { headers: { jwt: token } });
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

  const getCrimesCountByIssue = (issueId: string) => {
    return apiRequest.get(`/api/stats/issue/${issueId}/crimes/count`);
  };
  return {
    getStatsData,
    getSharesData,
    getCrimesCountByIssue,
  };
};
