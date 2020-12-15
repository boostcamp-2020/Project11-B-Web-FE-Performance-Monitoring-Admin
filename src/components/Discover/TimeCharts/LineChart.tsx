import React, { useRef, useEffect } from 'react';
import bb, { line } from 'billboard.js';

interface IColumn {
  name: string;
  values: number[];
}

interface IProps {
  columns: IColumn[];
  period: string;
}

const timeFormats: Record<string, string> = {
  '1h': '%H:%M',
  '1d': '%H:%M',
  '1w': '%m-%d %H:%M',
  '2w': '%m-%d %H:%M',
  '1M': '%Y-%m-%d',
  '3M': '%Y-%m-%d',
  '1y': '%Y-%m',
};

function LineChart(props: IProps): React.ReactElement {
  const { columns, period } = props;
  const chartDiv = useRef(null);

  const flatColumns = columns.map((column) => [column.name, ...column.values]);

  useEffect(() => {
    const chart = bb.generate({
      data: {
        x: 'x',
        columns: flatColumns,
        type: line(),
      },
      axis: {
        x: {
          type: 'timeseries',
          tick: {
            format: timeFormats[period],
          },
        },
      },
      bindto: chartDiv.current,
    });
  }, [flatColumns, period]);

  return <div ref={chartDiv} />;
}

export default React.memo(LineChart);
