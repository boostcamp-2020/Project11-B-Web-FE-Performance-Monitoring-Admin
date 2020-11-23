import React, { useEffect, useRef, useCallback } from 'react';
import bb, { line, zoom } from 'billboard.js';
import 'billboard.js/dist/billboard.css';

interface Issue {
  id: number;
  occuredAt: string;
}

interface IProps {
  chartData: Issue[];
}

function Chart(props: IProps): React.ReactElement {
  const { chartData } = props;
  const getChartData = useCallback(
    (issues: Issue[]) => {
      const data: { occuredAt: string; count: number }[] = [];
      for (const issue of chartData) {
        if (!data.length) {
          data.push({ occuredAt: issue.occuredAt, count: 1 });
        } else if (data[data.length - 1].occuredAt === issue.occuredAt)
          data[data.length - 1].count += 1;
        else data.push({ occuredAt: issue.occuredAt, count: 1 });
      }
      return data;
    },
    [chartData],
  );
  const chartDiv = useRef(null);
  useEffect(() => {
    const bindedData = getChartData(chartData);
    bb.generate({
      bindto: chartDiv.current,
      data: {
        x: 'x',
        json: {
          issue: bindedData.map((data) => data.count),
          x: bindedData.map((data) => data.occuredAt),
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
    });
  }, [getChartData, chartData]);
  return <div ref={chartDiv} />;
}
export default Chart;
