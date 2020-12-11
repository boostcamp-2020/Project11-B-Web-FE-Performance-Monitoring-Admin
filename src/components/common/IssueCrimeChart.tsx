import React, { useRef, useEffect } from 'react';
import billboard, { bar } from 'billboard.js';
import 'billboard.js/dist/billboard.css';
import service from '../../service';

interface IProps {
  issueId: string;
  width?: string;
  height?: string;
  intervalType?: string;
}

function Chart(props: IProps): React.ReactElement {
  const { issueId, width, height, intervalType } = props;
  const chartContainer = useRef(null);
  const getDate = (date: Date, type: string): string => {
    if (type === 'hour') {
      return `${date.getFullYear()}-${date.getMonth() + 1}-${
        date.getDate() <= 9 ? `0${date.getDate()}` : date.getDate()
      } ${date.getHours() <= 9 ? `0${date.getHours()}` : date.getHours()}:00`;
    }
    return `${date.getFullYear()}-${date.getMonth() + 1}-${
      date.getDate() <= 9 ? `0${date.getDate()}` : date.getDate()
    }`;
  };
  useEffect(() => {
    (async () => {
      if (issueId === '' || chartContainer === null) return;
      const res = await service.getCrimesCountByIssue(issueId, intervalType as string);
      const getXLabel = function formatting(x: number | Date) {
        return typeof x === 'number' ? x : x.getHours();
      };
      const { crimes } = res.data;
      billboard.generate({
        data: {
          x: 'x',
          json: {
            x: crimes.map((crime: any) => {
              const date = new Date(+crime._id);
              return getDate(date, intervalType as string);
            }),
            error: crimes.map((crime: any) => crime.count),
          },
          xFormat: intervalType === 'hour' ? '%Y-%m-%d %H:%M' : '%Y-%m-%d',
          type: bar(),
        },
        legend: {
          show: false,
        },
        axis: {
          x: {
            type: 'timeseries',
            tick: {
              fit: false,
              count: 10,
              format: intervalType === 'hour' ? getXLabel : undefined,
            },
          },
          y: {
            show: false,
          },
        },
        bindto: chartContainer.current,
      });
    })();
  }, [issueId, intervalType]);
  return <div ref={chartContainer} style={{ width, height }} />;
}

Chart.defaultProps = {
  width: '200px',
  height: '100px',
  intervalType: 'hour',
};

export default Chart;
