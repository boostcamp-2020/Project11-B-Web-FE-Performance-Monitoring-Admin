export interface MatchParams {
  id: string;
}

export interface IProject {
  name: string;
}

export interface IStack {
  _id: string;
  columnNo: string;
  lineNo: string;
  function: string;
  filename: string;
}

export interface IError {
  _id: string;
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
  };
  occuredAt: string;
}

export interface IssueType {
  _id: {
    _id: string;
    message: string;
    type: string;
    project: IProject[];
    errorIds: string[];
    lastError: IError;
    stack: IStack;
    occuredAt: Date;
    sdk: {
      name: string;
      version: string;
    };
    meta: {
      broswer: {
        name: string;
        version: string;
      };
      os: {
        name: string;
        version: string;
      };
      url: string;
      ip: string;
    };
  };
  _stat: any;
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
