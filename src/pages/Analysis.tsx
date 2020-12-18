import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@material-ui/core';
import { useSelector } from 'react-redux';
import ProjectSelector from '../components/common/ProjectSelector';

import DailyDurationTable from '../components/Analysis/DailyDurationTable';
import PageDurationTable from '../components/Analysis/PageDurationTable';
import PageMoveTable, { IPageMove } from '../components/Analysis/PageMoveTable';
import service from '../service';
import { RootState } from '../modules';

interface IDuration {
  _id: string;
  avg_duration: number;
  sum_duration: number;
  count: number;
}
interface IPerDay {
  _id: {
    year: number;
    month: number;
    day: number;
  };
  sum_duration: number;
  avg_duration: number;
  count: number;
}
function Analysis(): React.ReactElement {
  const selectedProjectsIds = useSelector((state: RootState) => state.projects.selectedProjectsIds);

  const [pageDurationPerDay, setPageDurationPerDay] = useState<IPerDay[]>([]);
  const [pageMoveData, setPageMoveData] = useState<IPageMove[]>([]);
  const [pageDurationData, setPageDurationData] = useState<IDuration[]>([]);
  useEffect(() => {
    (async () => {
      const res = await service.getSession(selectedProjectsIds);
      if (!res.data) {
        return;
      }
      setPageMoveData(res.data.move);
      setPageDurationData(res.data.duration);
      setPageDurationPerDay(res.data.perDay);
    })();
  }, [selectedProjectsIds]);
  return (
    <Box maxWidth="100%" overflow="hidden" p={3}>
      <ProjectSelector />
      <Typography variant="h3" id="tableTitle" component="span">
        페이지간 이동 추이
      </Typography>
      <PageMoveTable pageMoveData={pageMoveData} />

      <Typography variant="h3" id="tableTitle" component="div">
        일별 체류시간
      </Typography>
      <DailyDurationTable pageDurationPerDay={pageDurationPerDay} />

      <Typography variant="h3" id="tableTitle" component="div">
        페이지별 체류시간
      </Typography>
      <PageDurationTable pageDurationData={pageDurationData} />
    </Box>
  );
}

export default Analysis;
