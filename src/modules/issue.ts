import _ from 'lodash';
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

type CounterAction = ReturnType<typeof setIssueAction>;

/**
 * @TODO
 * dummy data를 어떻게 하지....???
 */
const issueDummy = {
  _id: {
    _id: '5fcf019617a95f43cee63b19',
    message: 'something is wrong6',
    type: 'ReferenceError',
    project: [
      {
        _id: '5fcf00f290febf1bd46be4ef',
        users: [
          '5fc5d0f738d1839a9be86541',
          '5fc7033438d1839a9b14bd79',
          '5fc7205838d1839a9b191373',
          '5fc728ba38d1839a9b1a65e2',
          '5fcee75617a95f43cee1d32a',
          '5fcee46a17a95f43cee14761',
          '5fcee63c17a95f43cee19c1e',
        ],
        isDeleted: false,
        name: '안녕하세요',
        description: '',
        owner: '5fcf00d817a95f43cee61cb8',
        _v: '1',
      },
    ],
    stack: {
      columnNo: '81',
      lineNo: '110',
      function: 'occurError()',
      filename: 'index.js',
    },
    lastCrime: {
      _id: '5fcf0198cb665230a01d059a',
      meta: {
        browser: {
          name: 'fire-fox2222222222',
          version: 'recent',
        },
        os: {
          name: 'windows10',
          version: '1909',
        },
        url: 'http://localhost:3000',
        ip: '::1',
      },
      message: 'something is wrong6',
      type: 'ReferenceError',
      stack: [
        {
          _id: '5fcf0198cb665230a01d059b',
          columnNo: '81',
          lineNo: '110',
          function: 'occurError()',
          filename: 'index.js',
        },
        {
          _id: '5fcf0198cb665230a01d059c',
          columnNo: '9',
          lineNo: '111',
          function: 'occurError()',
          filename: 'errorTest.js',
        },
        {
          _id: '5fcf0198cb665230a01d059d',
          columnNo: '10',
          lineNo: '112',
          function: 'occurError()',
          filename: 'errorTest.js',
        },
      ],
      occuredAt: '2020-11-27T09:09:30.000Z',
      sdk: {
        name: 'panopticon',
        version: '1.0.0',
      },
    },

    crimeIds: [
      '5fcf0198cb665230a01d059a',
      '5fcf019ccb665230a01d059f',
      '5fcf019ccb665230a01d05a3',
      '5fcf019dcb665230a01d05a7',
      '5fcf019ecb665230a01d05ab',
      '5fcf019ecb665230a01d05af',
      '5fcf019fcb665230a01d05b3',
      '5fcf019fcb665230a01d05b7',
      '5fcf01a0cb665230a01d05bb',
      '5fcf01a1cb665230a01d05bf',
      '5fcf01a4cb665230a01d05c3',
      '5fcf01a6cb665230a01d05c7',
      '5fcf01accb665230a01d05cb',
      '5fcf01aecb665230a01d05cf',
      '5fcf01b0cb665230a01d05d3',
      '5fcf01b4cb665230a01d05d7',
      '5fcf01b7cb665230a01d05db',
      '5fcf01bbcb665230a01d05df',
    ],
  },
  _stat: [
    {
      userIps: [
        '::1',
        '::1',
        '::1',
        '::1',
        '::1',
        '::1',
        '::1',
        '::1',
        '::1',
        '::1',
        '::1',
        '::1',
        '::1',
        '::1',
        '::1',
        '::1',
        '::1',
        '::1',
      ],
    },
  ],
};

function issue(state: IIssue = issueDummy, action: CounterAction): IIssue {
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
