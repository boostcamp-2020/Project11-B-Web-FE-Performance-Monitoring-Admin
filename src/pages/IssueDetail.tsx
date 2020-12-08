import React, { useState, useEffect } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { Box, Typography, Grid, Tabs, Tab, AppBar } from '@material-ui/core';

import service from '../service';

import IssueDetailHeader from '../components/IssueDetail/IssueDetailHeader';
import { IIssue } from '../types';

interface MatchParams {
  id: string;
}
interface TabPanelProps {
  children: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index } = props;

  return (
    <div role="tabpanel" hidden={value !== index} id={`tabpanel-${index}`}>
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

// const temp: IIssue = {
//   _id: {
//     _id: '5fcdd8bb17a95f43cebeb767',
//     type: '이슈 2번',
//     message: '이슈 4번',
//     stack: {
//       columnNo: '81',
//       lineNo: '110',
//       function: 'occurError()',
//       filename: 'index.js',
//     },

//     lastError: {
//       _id: '5fcdd8bb9f2d55a7501975af',
//       meta: {
//         browser: {
//           name: 'fire-fox2222222222',
//           version: 'recent',
//         },
//         os: {
//           name: 'windows10',
//           version: '1909',
//         },
//         url: '유저 url 3번',
//         ip: 'localhost:4000',
//       },
//       message: '이슈 4번',
//       type: '이슈 2번',
//       stack: [
//         {
//           _id: '5fcdd8bb9f2d55a7501975b0',
//           columnNo: '81',
//           lineNo: '110',
//           function: 'occurError()',
//           filename: 'index.js',
//         },
//       ],
//       occuredAt: '2020-11-26T09:09:30.000Z',
//       sdk: {
//         name: 'panopticon',
//         version: '1.0.0',
//       },
//       __v: 0,
//     },
//     project: [
//       {
//         _id: '5fcd0ec89f2d55a75019756e',
//         users: [],
//         name: '테스트용',
//         description: '123',
//         owner: '5fc7205838d1839a9b191373',
//         __v: 0,
//       },
//     ],
//     errorIds: ['5fcdd8bb9f2d55a7501975af', '5fcdd8bd9f2d55a7501975b1'],
//   },
//   _stat: [
//     {
//       userIps: ['localhost:4000', 'localhost:4000'],
//     },
//   ],
// };
function IssueDetail(): React.ReactElement {
  const [issue, setIssue] = useState<IIssue>();
  const [tabIndex, setTabIndex] = useState<number>(0);
  const match = useRouteMatch<MatchParams>('/issue/:id');
  const handleChangeTab = (event: React.ChangeEvent<any>, newValue: number) => {
    setTabIndex(newValue);
  };
  useEffect(() => {
    (async () => {
      const res = await service.getIssue(match?.params.id || '');
      console.log(res.data);
      setIssue(res.data);
      // setIssue(temp);
    })();
  }, [match?.params.id]);
  return (
    <Box flexGrow={1}>
      <Grid container>
        <Grid item xs={12}>
          {issue && <IssueDetailHeader issue={issue} />}
        </Grid>
        <Grid item xs={12}>
          <AppBar color="transparent" position="static">
            <Tabs indicatorColor="primary" value={tabIndex} onChange={handleChangeTab}>
              <Tab label="DETAILS" id="tab-0" />
              <Tab label="EVENTS" id="tab-1" />
              <Tab label="TAGS" id="tab-2" />
            </Tabs>
          </AppBar>
          <TabPanel value={tabIndex} index={0}>
            DETAILS
          </TabPanel>
          <TabPanel value={tabIndex} index={1}>
            EVENTS
          </TabPanel>
          <TabPanel value={tabIndex} index={2}>
            TAGS
          </TabPanel>
        </Grid>
      </Grid>
    </Box>
  );
}

export default IssueDetail;
