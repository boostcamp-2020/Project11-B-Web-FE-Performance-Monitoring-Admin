import React from 'react';
import { Box } from '@material-ui/core';
import DailyChart from '../components/Visits/DailyChart';

interface ICustomDate {
  year: number;
  month: number;
  day: number;
}

function Projects(): React.ReactElement {
  return (
    <>
      <DailyChart />
    </>
  );
}

export default Projects;
