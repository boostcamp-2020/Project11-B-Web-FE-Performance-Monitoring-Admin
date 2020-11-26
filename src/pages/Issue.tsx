import React, { useState, useEffect } from 'react';
import { Box, Checkbox, Button, ButtonGroup, IconButton } from '@material-ui/core';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import 'billboard.js/dist/billboard.css';
import Chart from '../components/Chart';
import IssueListItem from '../components/IssueListItem';
import service from '../service';

function Issue(): React.ReactElement {
  const [issues, setIssues] = useState<IssueType[]>([]);
  useEffect(() => {
    (async () => {
      const res = await service.getIssues();
      setIssues(res.data);
    })();
  }, []);
  return (
    <Box p={5} display="flex" flexDirection="column" minHeight="100vh">
      <Box>{/* <Chart /> */}</Box>
      <Box flexGrow={1}>
        <Box>
          <Box display="flex" justifyContent="space-between">
            <Box>
              <Box display="flex" gridGap={5}>
                <Box display="flex" alignItems="center">
                  <Checkbox checked={false} inputProps={{ 'aria-label': 'primary checkbox' }} />
                </Box>
                <Box display="flex" alignItems="center" fontSize="10px">
                  <Button variant="outlined">
                    <Box component="span" fontSize="0.625rem" fontWeight={900}>
                      Resolve
                    </Box>
                  </Button>
                </Box>
                <Box display="flex" alignItems="center">
                  <Button variant="outlined">
                    <Box component="span" fontSize="0.625rem" fontWeight={900}>
                      Ignore
                    </Box>
                  </Button>
                </Box>
                <Box display="flex" alignItems="center">
                  <Button variant="outlined">
                    <Box component="span" fontSize="0.625rem" fontWeight={900}>
                      Merge
                    </Box>
                  </Button>
                </Box>
                <Box display="flex" alignItems="center">
                  <IconButton>
                    <MoreHorizIcon />
                  </IconButton>
                </Box>
                <Box display="flex" alignItems="center">
                  <IconButton>
                    <PlayArrowIcon />
                  </IconButton>
                </Box>
              </Box>
            </Box>
            <Box display="flex" alignItems="center">
              <Box mr={5}>Graph:</Box>
              <Box>
                <ButtonGroup variant="text" color="primary">
                  <Button>24H</Button>
                  <Button>14D</Button>
                </ButtonGroup>
              </Box>
            </Box>
            <Box display="flex" alignItems="center">
              Events
            </Box>
            <Box display="flex" alignItems="center">
              Users
            </Box>
            <Box display="flex" alignItems="center">
              Assignee
            </Box>
          </Box>
          <Box
            display="flex"
            flexDirection="column"
            border="1px solid #cfcfcf"
            borderRadius=".5rem"
          >
            {issues.map((issue) => (
              <IssueListItem key={issue._id} issue={issue} />
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

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

export default Issue;
// const json = {
//   issues: [
//     {
//       id: 1,
//       message: 'undefinedMethod is not undefiend',
//       filename: 'src/page/MainPage',
//       occuredAt: '2020-11-23 01:36',
//     },
//     {
//       id: 2,
//       message: 'undefinedMethod is not undefiend',
//       filename: 'src/page/MainPage',
//       occuredAt: '2020-11-23 01:36',
//     },
//     {
//       id: 3,
//       message: 'undefinedMethod is not undefiend',
//       filename: 'src/page/MainPage',
//       occuredAt: '2020-11-23 01:39',
//     },
//     {
//       id: 4,
//       message: 'undefinedMethod is not undefiend',
//       filename: 'src/page/MainPage',
//       occuredAt: '2020-11-23 01:40',
//     },
//     {
//       id: 5,
//       message: 'undefinedMethod is not undefiend',
//       filename: 'src/page/MainPage',
//       occuredAt: '2020-11-23 01:45',
//     },
//     {
//       id: 6,
//       message: 'undefinedMethod is not undefiend',
//       filename: 'src/page/MainPage',
//       occuredAt: '2020-11-23 01:50',
//     },
//   ],
// };
