import React, { useState, useEffect, useContext } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { Box } from '@material-ui/core';
import Tag from '../components/Tag';
import Stack from '../components/Stack';
import service from '../service';
import UserContext from '../context';

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
}

interface MatchParams {
  id: string;
}

function IssueDetail(): React.ReactElement {
  const [issue, setIssue] = useState<IssueType>();
  const match = useRouteMatch<MatchParams>('/issue/:id');
  const { user } = useContext(UserContext);
  useEffect(() => {
    (async () => {
      const res = await service.getIssue(match?.params.id || '', user.token as string);
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
      <Box borderBottom="1px solid #E2DEE6">
        <Box px={4} py={4}>
          <Box color="#9386A0" pb={2}>
            TAGS
          </Box>
          <Box display="flex" flexWrap="wrap" gridGap={10}>
            {issue
              ? (() => {
                  return (
                    <>
                      <Tag name={issue.meta.browser.name} content={issue.meta.browser.version} />
                      <Tag name={issue.meta.os.name} content={issue.meta.os.version} />
                      <Tag name="URL" content={issue.meta.url} />
                      <Tag name="IP" content={issue.meta.ip} />
                    </>
                  );
                })()
              : null}

            <Tag name="browser" content="Chrome 86.0.4240" />
          </Box>
        </Box>
      </Box>
      <Box>
        <Box px={4} py={2}>
          <Box>
            <Box>
              <Box fontSize="20px" fontWeight={500}>
                ReferenceError
              </Box>
              <Box>undefiendMethod is not defined</Box>
            </Box>
          </Box>
          <Box mt={3} border="1px solid #9386A0" borderRadius="3px">
            {issue && issue.stack.map((stack) => <Stack key={stack._id} stack={stack} />)}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default IssueDetail;
