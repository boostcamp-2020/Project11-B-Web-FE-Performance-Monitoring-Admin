import React, { useState, useEffect } from 'react';
import { Container } from '@material-ui/core';
import { useSelector } from 'react-redux';

import DailyDurationTable from '../components/Analysis/DailyDurationTable';
import PageDurationTable from '../components/Analysis/PageDurationTable';
import PageMoveTable, { IPageMove } from '../components/Analysis/PageMoveTable';
import service from '../service';
import { RootState } from '../modules';
import FilterPage from '../components/layout/FilterPage';

interface IDuration {
  _id: string;
  avg_duration: number;
  sum_duration: number;
  count: number;
  userCount: number;
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
  userCount: number;
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
    <FilterPage showPeriodSelector={false}>
      <Container>
        <PageMoveTable pageMoveData={pageMoveData} />

        <DailyDurationTable pageDurationPerDay={pageDurationPerDay} />

        <PageDurationTable pageDurationData={pageDurationData} />
      </Container>
    </FilterPage>
  );
}

export default Analysis;
