import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import bb, { line } from 'billboard.js';
import 'billboard.js/dist/billboard.css';
import { IDailyVisit, IProjectCardProps } from '../../types';

import service from '../../service';
import { RootState } from '../../modules';

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

      const dateColumns = newMonthlyVisits[0].map((dailyInfo: IDailyVisit) => {
        return `${dailyInfo._id.year}-${dailyInfo._id.month}`;
      });
      dateColumns.unshift('x');
      const flatColumns = newMonthlyVisits.map((dailyArray: IDailyVisit[]) => {
        const currentProjectId = dailyArray[0]._id.projectId;
        const countArray: (string | number)[] = dailyArray.map((dailyInfo: IDailyVisit) => {
          return dailyInfo.count;
        });
        const projectObj = projects.find(
          (project: IProjectCardProps) => project._id === currentProjectId,
        );
        const projectName: string = projectObj?.name as string;
        countArray.unshift(projectName);
        return countArray;
      });
      bb.generate({
        data: {
          x: 'x',
          columns: [dateColumns, ...flatColumns],
          xFormat: '%Y-%m',
          type: line(),
        },
        axis: {
          x: {
            type: 'timeseries',
          },
        },
        bindto: visitChartDiv.current,
      });
    })();
  }, [selectedProjectsIds, year]);
  return (
    <>
      <div ref={visitChartDiv} />
    </>
  );
}

export default MonthlyChart;
