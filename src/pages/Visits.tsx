import React, { useState } from 'react';
import { Box } from '@material-ui/core';
import VisitsHeader from '../components/Visits/VisitsHeader';
import MonthlyChart from '../components/Visits/MonthlyChart';
import DailyChart from '../components/Visits/DailyChart';
import DailyTable from '../components/Visits/DailyTable';
import ProjectSelector from '../components/Issues/ProjectSelector';
import { IDailyVisit } from '../types';

function Visits(): React.ReactElement {
  const today = new Date();
  const [firstSelectedCounts, setFirstSelectedCounts] = useState<IDailyVisit[]>([]);
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
          <MonthlyChart year={year} />
        </Box>
        <Box>
          <DailyChart year={year} month={month} setFirstSelectedCounts={setFirstSelectedCounts} />
        </Box>
        <Box>
          <DailyTable dailyVisits={firstSelectedCounts} />
        </Box>
      </Box>
    </Box>
  );
}

export default Visits;
