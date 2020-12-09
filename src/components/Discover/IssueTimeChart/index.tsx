import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import bb, { line, zoom } from 'billboard.js';
import 'billboard.js/dist/billboard.css';
import qs from 'qs';
import { RootState } from '../../../modules';
import service from '../../../service';
// ```json
// type: "recent"
// period: "1d" // 1y, 1M, 1d, 1h
// interval: "5m" // 없으면 위에 있는 default
// ```

const defaultData = {
  type: 'recent',
  period: '1d', // 1y, 1M, 1d, 1h,
  interval: '5m', // 없으면 위에 있는 default
};

function Chart(): React.ReactElement {
  const chartDiv = useRef(null);
  const user = useSelector((state: RootState) => state.user);
  useEffect(() => {
    const formatTime = (date: Date): string => {
      return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;
    };
    (async (): Promise<void> => {
      const defaultQuery = qs.stringify(defaultData, { addQueryPrefix: true });
      const res = await service.getStatsData(defaultQuery, user.token as string);
      const statsData = res.data;
      bb.generate({
        data: {
          x: 'x',
          json: {
            issue: statsData.map((count: any) => count.count),
            x: statsData.map((date: any) => formatTime(new Date(date.occuredAt))),
          },
          type: line(),
          xFormat: '%Y-%m-%d %H:%M',
        },
        zoom: {
          enabled: zoom(),
        },
        axis: {
          x: {
            type: 'timeseries',
          },
        },
        bindto: chartDiv.current,
      });
    })();
  }, []);
  return <div ref={chartDiv} />;
}
export default Chart;
