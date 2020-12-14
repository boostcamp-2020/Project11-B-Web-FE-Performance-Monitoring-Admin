import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import 'billboard.js/dist/billboard.css';

import service from '../../service';
import { RootState } from '../../modules';
import drawVisitsChart from '../../utils/visitUtil';
import Progress from '../common/Progress';
import useProgress from '../../hooks/ProgressHooks';

interface IProps {
  year: number;
}

function MonthlyChart(props: IProps): React.ReactElement {
  const { year }: IProps = props;
  const projects = useSelector((state: RootState) => state.projects.projects);
  const selectedProjectsIds = useSelector((state: RootState) => state.projects.selectedProjectsIds);
  const visitChartDiv = useRef(null);
  const [showProgress, displayProgress, hideProgress] = useProgress();
  useEffect(() => {
    (async (): Promise<void> => {
      displayProgress();
      const monthlyRes = await service.getMonthlyVisits(selectedProjectsIds, year);
      const newMonthlyVisits = await monthlyRes.data;
      hideProgress();
      drawVisitsChart({ projects, newVisits: newMonthlyVisits, visitChartDiv, type: 'monthly' });
    })();
  }, [selectedProjectsIds, year]);
  return <>{showProgress ? <Progress /> : <div ref={visitChartDiv} />}</>;
}

export default MonthlyChart;
