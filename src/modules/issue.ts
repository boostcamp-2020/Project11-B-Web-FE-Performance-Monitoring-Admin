import { Dispatch } from 'redux';
import { IIssue } from '../types';

import service from '../service';

const SET_ISSUE = 'issue/SET_ISSUE' as const;

const setIssueAction = (newIssue: IIssue) => ({ type: SET_ISSUE, issue: newIssue });

export const setIssue = (issueId: string) => async (dispatch: Dispatch): Promise<void> => {
  const res = await service.getIssue(issueId);
  const newIssue: IIssue = res.data;
  dispatch(setIssueAction(newIssue));
};

type IssueAction = ReturnType<typeof setIssueAction>;

/**
 * @TODO
 * dummy data를 어떻게 하지....???
 */
const issueDummy = {
  _id: '',
  message: '',
  type: '',
  project: { _id: '', name: '' },
  crimeIds: [],
  lastCrime: {
    _id: '',
    meta: {
      browser: {
        name: '',
        version: '',
      },
      os: {
        name: '',
        version: '',
      },
      url: '',
      ip: '',
    },
    type: '',
    message: '',
    sdk: {
      name: '',
      version: '',
    },
    stack: [
      {
        _id: '',
        columnNo: '',
        lineNo: '',
        filename: '',
        function: '',
      },
    ],
    occuredAt: '',
    projectId: '',
    __v: 0,
  },
  stack: {
    columnNo: '',
    lineNo: '',
    filename: '',
    function: '',
  },
  occuredAt: '',
  crimeCount: 0,
  userCount: 0,
  sdk: {
    name: '',
    version: '',
  },
};

function issue(state: IIssue = issueDummy, action: IssueAction): IIssue {
  switch (action.type) {
    case SET_ISSUE: {
      const newIssue: IIssue = action.issue;
      return newIssue;
    }
    default:
      return state;
  }
}

export default issue;
