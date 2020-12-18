import React, { useRef, useEffect } from 'react';
import bb, { line } from 'billboard.js';
import { useSelector } from 'react-redux';
import { RootState } from '../../../modules';

interface IColumn {
  name: string;
  values: number[];
}

interface IProps {
  columns: IColumn[];
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
  const { columns } = props;
  const selectedPeriod = useSelector((state: RootState) => state.projects.selectedPeriod);

  const chartDiv = useRef(null);

  const flatColumns = columns.map((column) => [column.name, ...column.values]);

  useEffect(() => {
    bb.generate({
      data: {
        x: 'x',
        columns: flatColumns,
        type: line(),
      },
      axis: {
        x: {
          type: 'timeseries',
          tick: {
            format: timeFormats[selectedPeriod],
          },
        },
      },
      bindto: chartDiv.current,
    });
  }, [flatColumns, selectedPeriod]);

  return <div ref={chartDiv} />;
}

export default React.memo(LineChart);
