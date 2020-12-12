import React, { useState } from 'react';
import { Box } from '@material-ui/core';
import VisitsHeader from '../components/Visits/VisitsHeader';
import MonthlyChart from '../components/Visits/MonthlyChart';
import DailyChart from '../components/Visits/DailyChart';
import ProjectSelector from '../components/Issues/ProjectSelector';

function Visits(): React.ReactElement {
  const today = new Date();
  const projectId = '5fd0bbb03eaa461e2c83a0c4';
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth() + 1);
  const nextMonth = () => {
    if (month === 12) {
      setYear(year + 1);
      setMonth(1);
    } else {
      setMonth(month + 1);
    }
  };
  const beforeMonth = () => {
    if (month === 1) {
      setYear(year - 1);
      setMonth(12);
    } else {
      setMonth(month - 1);
    }
  };

  return (
    <Box p={3}>
      <ProjectSelector />
      <Box>
        <VisitsHeader year={year} month={month} nextMonth={nextMonth} beforeMonth={beforeMonth} />
        <Box>
          <MonthlyChart projectId={projectId} year={year} />
        </Box>
        <Box>
          <DailyChart year={year} month={month} />
        </Box>
      </Box>
    </Box>
  );
}

export default Visits;
