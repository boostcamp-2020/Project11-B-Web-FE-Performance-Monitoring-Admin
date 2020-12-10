import React from 'react';
import MonthlyChart from '../components/Visits/MonthlyChart';
import DailyChart from '../components/Visits/DailyChart';

function Projects(): React.ReactElement {
  return (
    <>
      <MonthlyChart />
      <DailyChart />
    </>
  );
}

export default Projects;
