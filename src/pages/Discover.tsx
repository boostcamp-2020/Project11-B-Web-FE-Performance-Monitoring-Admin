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
      <Grid container spacing={3}>
        <ChartFrame xs={12}>
          <IssueCountChart selectedProjects={selectedProjects} />
        </ChartFrame>

        {/* <ChartFrame xs={12}> */}
        <ShareCharts selectedProjects={selectedProjects} />
        {/* </ChartFrame> */}
      </Grid>
    </Box>
  );
}

export default Discover;
