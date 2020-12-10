import { AxiosInstance, AxiosResponse } from 'axios';
import qs from 'querystring';

interface IChartRequest {
  projectIds: string[];
  type: string;
  period: string;
  filters: Record<string, string[] | undefined>;
}
export interface IStatsService {
  getCrimesCountByIssue: (id: string) => Promise<AxiosResponse>;
  getSharesData: (req: IChartRequest) => Promise<AxiosResponse>;
  getCountByInterval: (req: IChartRequest) => Promise<AxiosResponse>;
  getCountByIssue: (query: string) => Promise<AxiosResponse>;
}

export default (apiRequest: AxiosInstance): IStatsService => {
  const getCrimesCountByIssue = (issueId: string) => {
    return apiRequest.get(`/api/stats/issue/${issueId}/crimes/count`);
  };

  // sample query : ?projectId=myproject1&projectId=myproject2&type=recent&period=1w
  const getSharesData = async (req: IChartRequest) => {
    const { projectIds, type, period, filters } = req;

    const query = `?${qs.stringify({
      projectId: projectIds,
      type,
      period,
      ...filters,
    })}`;

    return apiRequest.get(`/api/stats/shares${query}`);
  };

  const getCountByInterval = (req: IChartRequest) => {
    const { projectIds, type, period, filters } = req;

    const query = `?${qs.stringify({
      projectId: projectIds,
      type,
      period,
      ...filters,
    })}`;

    return apiRequest.get(`/api/stats/interval${query}`);
  };

  const getCountByIssue = (query: string) => {
    return apiRequest.get(`/api/countbyissue${query}`);
  };

  return {
    getCrimesCountByIssue,
    getCountByInterval,
    getCountByIssue,
    getSharesData,
  };
};
