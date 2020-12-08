import React, { useState, useEffect } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { Box, Grid, Tabs, Tab, AppBar } from '@material-ui/core';

import service from '../service';

import IssueDetailHeader from '../components/IssueDetail/IssueDetailHeader';
import CrimeView from '../components/IssueDetail/CrimeView';
import { IIssue } from '../types';

import Crimes from '../components/IssueDetail/Crimes';

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
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

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
      setIssue(res.data);
      // setIssue(temp);
    })();
  }, [match?.params.id]);
  const issueId = issue?._id._id;
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
            {issue && <CrimeView crimeIds={issue._id.crimeIds} />}
          </TabPanel>
          <TabPanel value={tabIndex} index={1}>
            <Crimes issueId={issueId} />
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
