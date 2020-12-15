export interface IUserLocalStorage {
  nickname?: string;
  token?: string;
}

export interface MatchParams {
  id: string;
}

export interface IProject {
  _id: string;
  users?: string[];
  name: string;
  description?: string;
  owner?: string;
  __v?: number;
}

export interface IStack {
  _id?: string;
  columnNo: string;
  lineNo: string;
  function: string;
  filename: string;
}

export interface ICrime {
  _id: string;
  message: string;
  type: string;
  meta: {
    browser: {
      name: string;
      version: string;
    };
    os: {
      name: string;
      version: string;
    };
    url: string;
    ip: string;
    [x: string]: any;
  };
  stack: IStack[];
  occuredAt: string;
  sdk: {
    name: string;
    version: string;
  };
  __v?: number;
}

export interface IIssue {
  _id: string;
  message: string;
  type: string;
  project: IProject;
  crimeIds: string[];
  lastCrime: ICrime;
  stack: IStack;
  occuredAt: string;
  crimeCount: number;
  userCount: number;
  sdk?: {
    name: string;
    version: string;
  };
}

export interface IUser {
  _id: string;
  uid: number;
  nickname: string;
  email: string;
}
export interface IProjectCardProps {
  _id: string;
  name: string;
  owner: IUser;
  users: IUser[];
}

export interface IProjectsModule {
  projects: IProjectCardProps[];
  selectedProjectsIds: string[];
  selectedPeriod: string;
}

export interface ICrimesMeta {
  total: number;
  totalPage: number;
  pageNum: number;
  countPerPage: number;
}

export interface IMonthlyVisit {
  _id: {
    year: number;
    month: number;
  };
  count: number;
}

export interface IDailyVisit {
  _id: {
    year: number;
    month: number;
    date: number;
    projectId: string;
  };
  count: number;
}

export interface IVisits {
  dailyVisits: IDailyVisit[];
  monthlyVisits: IMonthlyVisit[];
}

export interface IGetSharesDataByIssueResponse {
  metas: {
    browser: { name: string; count: number }[];
    os: { name: string; count: number }[];
    url: { name: string; count: number }[];
  };
}

export interface IPeriod {
  label: string;
  query: string;
}
