import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box } from '@material-ui/core';
import bb, { line, zoom } from 'billboard.js';
import 'billboard.js/dist/billboard.css';
import { initializeVisits, testInitialVisits } from '../../modules/visits';
import { IVisits, IMonthlyVisit, IDailyVisit } from '../../types';

import service from '../../service';
import { RootState } from '../../modules';

interface ICustomDate {
  year: number;
  month: number;
  day: number;
}

function Projects(): React.ReactElement {
  const visitChartDiv = useRef(null);
  const projectId = '5fd0bbb03eaa461e2c83a0c4';
  const dailyVisits = useSelector((state: RootState) => state.visits.dailyVisits);
  const dispatch = useDispatch();
  useEffect(() => {
    const formatTime = (inputDate: ICustomDate): string => {
      return `${inputDate.year}-${inputDate.month}-${inputDate.day}`;
    };
    (async (): Promise<void> => {
      const today = new Date();
      const year = today.getFullYear();
      const month = today.getMonth();

      const monthlyRes = await service.getMonthlyVisits(projectId, year);
      const dailyRes = await service.getDailyVisits(projectId, year, month);

      const newMonthlyVisits: IMonthlyVisit[] = monthlyRes.data;
      const newDailyVisits: IDailyVisit[] = dailyRes.data;

      const newVisits: IVisits = { monthlyVisits: newMonthlyVisits, dailyVisits: newDailyVisits };
      dispatch(testInitialVisits(newVisits));
      bb.generate({
        data: {
          x: 'x',
          json: {
            visits: dailyVisits.map((count: any) => count.count),
            x: dailyVisits.map((date: any) => formatTime(date._id)),
          },
          type: line(),
          xFormat: '%Y-%m-%d',
        },
        zoom: {
          enabled: zoom(),
        },
        axis: {
          x: {
            type: 'timeseries',
          },
        },
        bindto: visitChartDiv.current,
      });
    })();
  }, [projectId]);
  return (
    <>
      <div ref={visitChartDiv} />;
    </>
  );
}

export default Projects;
