import React, { useRef, useEffect } from 'react';
import billboard, { bar } from 'billboard.js';
import 'billboard.js/dist/billboard.css';
import service from '../../../service';

interface IProps {
  issueId: string;
}

function Chart(props: IProps): React.ReactElement {
  const { issueId } = props;
  const chartContainer = useRef(null);
  useEffect(() => {
    (async () => {
      const res = await service.getCrimesCountByIssue(issueId);
      const { crimes } = res.data;
      billboard.generate({
        data: {
          x: 'x',
          json: {
            x: crimes.map((crime: any) => {
              const date = new Date(+crime._id);
              return `${date.getFullYear()}-${date.getMonth()}-${
                date.getDate() <= 9 ? `0${date.getDate()}` : date.getDate()
              } ${date.getHours() <= 9 ? `0${date.getHours()}` : date.getHours()}:00`;
            }),
            error: crimes.map((crime: any) => crime.count),
          },
          xFormat: '%Y-%m-%d %H:%M',
          type: bar(),
        },
        legend: {
          show: false,
        },
        axis: {
          x: {
            type: 'timeseries',
            tick: {
              show: false,
              text: {
                show: false,
              },
            },
          },
          y: {
            tick: {
              values: [0, 10],
              show: false,
              text: {
                show: false,
              },
            },
          },
        },
        bindto: chartContainer.current,
      });
    })();
  }, [issueId]);
  return <div ref={chartContainer} style={{ width: '200px', height: '100px' }} />;
}

export default Chart;
