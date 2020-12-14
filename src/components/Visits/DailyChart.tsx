import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import 'billboard.js/dist/billboard.css';

import { RootState } from '../../modules';
import drawVisitsChart from '../../utils/visitUtil';
import service from '../../service';
import Progress from '../common/Progress';
import useProgress from '../../hooks/ProgressHooks';

interface IProps {
  year: number;
  month: number;
}

function DailyChart(props: IProps): React.ReactElement {
  const { year, month }: IProps = props;
  const projects = useSelector((state: RootState) => state.projects.projects);
  const selectedProjectsIds = useSelector((state: RootState) => state.projects.selectedProjectsIds);
  const visitChartDiv = useRef(null);
  const [showProgress, displayProgress, hideProgress] = useProgress();

  useEffect(() => {
    (async (): Promise<void> => {
      displayProgress();
      const dailyRes = await service.getDailyVisits(selectedProjectsIds, year, month);
      const newDailyVisits = await dailyRes.data;
      hideProgress();
      drawVisitsChart({ projects, newVisits: newDailyVisits, visitChartDiv, type: 'daily' });
    })();
  }, [selectedProjectsIds, month]);
  return <>{showProgress ? <Progress /> : <div ref={visitChartDiv} />}</>;
}

export default DailyChart;
