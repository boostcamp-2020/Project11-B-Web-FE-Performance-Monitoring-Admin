import React from 'react';
import { useSelector } from 'react-redux';
import { Box, Grid, Tabs, Tab, AppBar } from '@material-ui/core';
import { RootState } from '../modules';
import IssueDetailHeader from '../components/IssueDetail/IssueDetailHeader';
import IssueDetailSidebar from '../components/IssueDetail/IssueDetailSideBar';
import CrimeView from '../components/IssueDetail/CrimeView';
import Crimes from '../components/IssueDetail/Crimes';
import useProject from '../hooks/CrimeIndexHooks';

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
  const issue = useSelector((state: RootState) => state.issue);
  const [
    tabIndex,
    crimeIndex,
    handleBack,
    handleNext,
    setCrimeById,
    handleChangeTab,
  ] = useProject();

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
          <Box display="flex">
            <Box flexGrow={1} borderRight="1px solid #cfcfcf">
              <TabPanel value={tabIndex} index={0}>
                {issue && (
                  <CrimeView
                    crimeIds={issue._id.crimeIds}
                    crimeIndex={crimeIndex}
                    handleBack={handleBack}
                    handleNext={handleNext}
                  />
                )}
              </TabPanel>
              <TabPanel value={tabIndex} index={1}>
                {issue && <Crimes issueId={issueId} setCrimeById={setCrimeById} />}
              </TabPanel>
              <TabPanel value={tabIndex} index={2}>
                TAGS
              </TabPanel>
            </Box>
            <Box width="400px">
              <IssueDetailSidebar issueId={issueId} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default IssueDetail;
