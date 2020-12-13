import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import 'billboard.js/dist/billboard.css';

import { RootState } from '../../modules';
import drawVisitsChart from '../../utils/visitUtil';
import service from '../../service';

interface IProps {
  year: number;
  month: number;
}

function DailyChart(props: IProps): React.ReactElement {
  const { year, month }: IProps = props;
  const projects = useSelector((state: RootState) => state.projects.projects);
  const selectedProjectsIds = useSelector((state: RootState) => state.projects.selectedProjectsIds);
  const visitChartDiv = useRef(null);
  useEffect(() => {
    (async (): Promise<void> => {
      const dailyRes = await service.getDailyVisits(selectedProjectsIds, year, month);
      const newDailyVisits = await dailyRes.data;
      drawVisitsChart({ projects, newVisits: newDailyVisits, visitChartDiv, type: 'daily' });
    })();
  }, [selectedProjectsIds, month]);
  return (
    <>
      <div ref={visitChartDiv} />
    </>
  );
}

export default DailyChart;
