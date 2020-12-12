import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import 'billboard.js/dist/billboard.css';

import { RootState } from '../../modules';
import { IDailyVisit } from '../../types';
import drawVisitsChart from '../../utils/visitUtil';
import service from '../../service';

interface IProps {
  year: number;
  month: number;
  setFirstSelectedCounts: (newDailyVisits: IDailyVisit[]) => void;
}

function DailyChart(props: IProps): React.ReactElement {
  const { year, month, setFirstSelectedCounts }: IProps = props;
  const projects = useSelector((state: RootState) => state.projects.projects);
  const selectedProjectsIds = useSelector((state: RootState) => state.projects.selectedProjectsIds);
  const visitChartDiv = useRef(null);
  useEffect(() => {
    (async (): Promise<void> => {
      const dailyRes = await service.getDailyVisitsMulti(selectedProjectsIds, year, month);
      const newDailyVisits = await dailyRes.data;
      setFirstSelectedCounts(newDailyVisits[0]);
      drawVisitsChart({ projects, newVisits: newDailyVisits, visitChartDiv, type: 'daily' });
    })();
  }, [selectedProjectsIds, year, month]);
  return (
    <>
      <div ref={visitChartDiv} />
    </>
  );
}

export default DailyChart;
