export interface IStack {
  _id: string;
  columnNo: string;
  lineNo: string;
  function: string;
  filename: string;
}

export interface ICrime {
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
  message: string;
  type: string;
  stack: IStack[];
  occuredAt: string;
  sdk: {
    name: string;
    version: string;
  };
}
