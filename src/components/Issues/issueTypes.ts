export interface IProps {
  issue: IssueType;
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
export interface IssueType {
  _id: string;
  message: string;
  type: string;
  project: IProject[];
  errors: { occuredAt: string }[];
  errorIds: string[];
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
}
