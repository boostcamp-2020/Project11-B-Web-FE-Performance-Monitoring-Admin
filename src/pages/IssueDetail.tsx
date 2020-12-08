import React, { useState, useEffect } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { Box } from '@material-ui/core';
import CrimeView from '../components/IssueDetail/CrimeView';
import service from '../service';

interface IStack {
  _id: string;
  columnNo: string;
  lineNo: string;
  function: string;
  filename: string;
}

interface IssueType {
  _id: string;
  message: string;
  stack: IStack[];
  occuredAt: Date;
  sdk: {
    name: string;
    version: string;
  };
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
  errorIds: string[];
}

interface MatchParams {
  id: string;
}

function IssueDetail(): React.ReactElement {
  const [issue, setIssue] = useState<IssueType>();
  const match = useRouteMatch<MatchParams>('/issue/:id');
  useEffect(() => {
    (async () => {
      const res = await service.getIssue(match?.params.id || '');
      setIssue(res.data);
    })();
  }, [match?.params.id]);
  return (
    <Box>
      <Box borderBottom="1px solid #E2DEE6" px={4} py={2}>
        <Box display="flex" gridGap={10} alignItems="center">
          <Box fontSize="24px" fontWeight={700}>
            ReferencedError
          </Box>
          <Box fontSize="20px" color="#817091">
            {issue && issue.message}
          </Box>
        </Box>
        <Box fontSize="16px">{issue && issue.stack[0].filename}</Box>
      </Box>
      {issue && <CrimeView errorIds={issue.errorIds} />}
    </Box>
  );
}

export default IssueDetail;
