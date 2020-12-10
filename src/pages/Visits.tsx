import React, { useState } from 'react';
import MonthlyChart from '../components/Visits/MonthlyChart';
import DailyChart from '../components/Visits/DailyChart';

function Projects(): React.ReactElement {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth() + 1);

  return (
    <>
      <MonthlyChart year={year} />
      <DailyChart year={year} month={month} />
    </>
  );
}

export default Projects;
