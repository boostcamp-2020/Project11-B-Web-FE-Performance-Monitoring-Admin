import React, { useState } from 'react';
import { Box, Grid } from '@material-ui/core';
import IssueTable from '../components/Issues/IssueTable';
import IssueHeader from '../components/Issues/IssuesHeader';
import ProjectSelector from '../components/common/ProjectSelector';
import PeriodSelector from '../components/common/PeriodSelector';

function Issue(): React.ReactElement {
  const [period, setPeriod] = useState<string>('1w');
  return (
    <>
      <Box p={3}>
        <Box width="100%">
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <ProjectSelector />
            </Grid>
            <Grid item xs={6}>
              <PeriodSelector period={period} all setPeriod={setPeriod} />
            </Grid>
          </Grid>
        </Box>

        <Box pt={3}>
          <IssueHeader />
          <IssueTable period={period} />
        </Box>
      </Box>
    </>
  );
}

export default Issue;
