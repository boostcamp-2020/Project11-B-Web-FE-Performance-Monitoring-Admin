import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import 'billboard.js/dist/billboard.css';

import service from '../../service';
import { RootState } from '../../modules';
import drawVisitsChart from '../../utils/visitUtil';

interface IProps {
  year: number;
}

function MonthlyChart(props: IProps): React.ReactElement {
  const { year }: IProps = props;
  const projects = useSelector((state: RootState) => state.projects.projects);
  const selectedProjectsIds = useSelector((state: RootState) => state.projects.selectedProjectsIds);
  const visitChartDiv = useRef(null);
  useEffect(() => {
    (async (): Promise<void> => {
      const monthlyRes = await service.getMonthlyVisitsMulti(selectedProjectsIds, year);
      const newMonthlyVisits = await monthlyRes.data;
      drawVisitsChart({ projects, newVisits: newMonthlyVisits, visitChartDiv, type: 'monthly' });
    })();
  }, [selectedProjectsIds, year]);
  return (
    <>
      <div ref={visitChartDiv} />
    </>
  );
}

export default MonthlyChart;
