import React, { useRef, useEffect } from 'react';
import bb, { line } from 'billboard.js';

interface IColumn {
  name: string;
  values: number[];
}

interface IProps {
  columns: IColumn[];
}

function LineChart(props: IProps): React.ReactElement {
  const { columns } = props;
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
        },
      },
      bindto: chartDiv.current,
    });
  }, [flatColumns]);

  return <div ref={chartDiv} />;
}

export default LineChart;
