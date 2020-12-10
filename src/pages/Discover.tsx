import React, { useState } from 'react';
import { Box, Grid } from '@material-ui/core';

import ShareCharts from '../components/Discover/ShareCharts';

import DiscoverHeader from '../components/Discover/DiscoverHeader';
import IssueCountChart from '../components/Discover/IssueCountChart';
import ChartFrame from '../components/Discover/ChartFrame';

import { IProjectCardProps } from '../types';

function Discover(): React.ReactElement {
  const [selectedProjects, setSelectedProjects] = useState<IProjectCardProps[]>([]);
  const [period, setPeriod] = useState('1w');

  return (
    <Box p={3}>
      <Box pb={3}>
        <DiscoverHeader
          selectedProjects={selectedProjects}
          setSelectedProjects={setSelectedProjects}
          period={period}
          setPeriod={setPeriod}
        />
      </Box>
      <Grid container direction="row" spacing={3} alignItems="stretch">
        <Grid item xs={12}>
          <ChartFrame>Trend Chart</ChartFrame>
        </Grid>
        <Grid item xs={6}>
          <ChartFrame>
            <IssueCountChart selectedProjects={selectedProjects} />
          </ChartFrame>
        </Grid>
        <Grid item xs={6}>
          <ChartFrame>
            <ShareCharts selectedProjects={selectedProjects} />
          </ChartFrame>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Discover;
