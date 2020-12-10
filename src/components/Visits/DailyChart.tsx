import React, { useEffect, useRef } from 'react';
import bb, { line, zoom } from 'billboard.js';
import 'billboard.js/dist/billboard.css';
import { IDailyVisit } from '../../types';

import service from '../../service';

interface ICustomDate {
  year: number;
  month: number;
  day: number;
}

function Projects(): React.ReactElement {
  const visitChartDiv = useRef(null);
  const projectId = '5fd0bbb03eaa461e2c83a0c4';
  useEffect(() => {
    const formatTime = (inputDate: ICustomDate): string => {
      return `${inputDate.year}-${inputDate.month}-${inputDate.day}`;
    };
    (async (): Promise<void> => {
      const today = new Date();
      const year = today.getFullYear();
      const month = today.getMonth();

      const dailyRes = await service.getDailyVisits(projectId, year, month);
      const newDailyVisits: IDailyVisit[] = await dailyRes.data;
      bb.generate({
        data: {
          x: 'x',
          json: {
            visits: newDailyVisits.map((count: any) => count.count),
            x: newDailyVisits.map((date: any) => formatTime(date._id)),
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
      <div ref={visitChartDiv} />
    </>
  );
}

export default Projects;
