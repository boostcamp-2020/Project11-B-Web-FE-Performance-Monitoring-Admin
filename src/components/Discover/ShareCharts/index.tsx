import React, { useState, useEffect } from 'react';
import { Grid } from '@material-ui/core';

import PieChart from './PieChart';
import Progress from '../../common/Progress';
import service from '../../../service';

// Redux 또는 Context API로 받아온다고 가정
const projectIds = ['5fcee77589e63a7cc85560da'];

function ShareCharts(): React.ReactElement {
  const [columns, setColumns] = useState<any>();

  useEffect(() => {
    (async () => {
      const res = await service.getSharesData({
        projectIds,
        type: 'recent',
        period: '1w',
      });
      setColumns(res.data);
    })();
  }, [projectIds]);

  const getPieChartInputs = (columnsData: any) => {
    const mapNameValues = (item: { name: string; count: number }) => {
      return {
        name: item.name,
        values: [item.count],
      };
    };

    return [
      {
        title: 'Shares by Issue',
        columns: columnsData.issues.map((issue: any) => ({
          name: `${issue.type}: ${issue.message}`,
          values: [issue.count],
        })),
      },
      {
        title: 'Shares by Browser',
        columns: columnsData.browsers.map(mapNameValues),
      },
      {
        title: 'Shares by OS',
        columns: columnsData.types.map(mapNameValues),
      },
      {
        title: 'Shares by URL',
        columns: columnsData.urls.map(mapNameValues),
      },
    ];
  };

  return columns === undefined ? (
    <Progress />
  ) : (
    <Grid container spacing={2}>
      {getPieChartInputs(columns).map((input) => (
        <PieChart key={input.title} columns={input.columns} />
      ))}
    </Grid>
  );
}

export default ShareCharts;
