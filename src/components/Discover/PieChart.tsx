import React, { useRef, useEffect } from 'react';
import bb, { pie } from 'billboard.js';

interface IColumn {
  name: string;
  values: number[];
}

interface IProps {
  columns: IColumn[];
}

function PieChart(props: IProps): React.ReactElement {
  const { columns } = props;
  const chartDiv = useRef(null);

  const flatColumns = columns.map((column) => [column.name, ...column.values]);

  useEffect(() => {
    bb.generate({
      data: {
        columns: flatColumns,
        type: pie(),
      },
      bindto: chartDiv.current,
    });
  });

  return <div ref={chartDiv} />;
}

export default PieChart;
