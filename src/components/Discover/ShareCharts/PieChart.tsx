import React, { useRef, useEffect } from 'react';
import { Grid } from '@material-ui/core';
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
      pie: {
        padding: 1,
      },
      bindto: chartDiv.current,
    });
  }, [columns, flatColumns]);

  return (
    <Grid item xs={6}>
      <div ref={chartDiv} />
    </Grid>
  );
}

export default PieChart;
