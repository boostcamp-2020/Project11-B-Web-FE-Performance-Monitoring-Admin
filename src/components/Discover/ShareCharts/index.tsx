import React, { useState, useEffect } from 'react';
import { Grid } from '@material-ui/core';

import PieChart from './PieChart';
import Progress from '../../common/Progress';
import service from '../../../service';

// Redux 또는 Context API로 받아온다고 가정
const projectIds = ['5fcf7c6d70fc246340a7c37e'];

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

    const getTopNEtc = (issues: { _id: string; count: number }[], topN: number) => {
      if (issues.length <= topN) {
        return issues;
      }
      const topNs = issues.slice(0, topN);
      const rest = issues.slice(topN);
      const etcCount = rest.reduce((acc, curr) => acc + curr.count, 0);
      const etc = {
        _id: 'dummyId',
        type: 'etc',
        message: 'Other',
        count: etcCount,
      };
      return [...topNs, etc];
    };

    return [
      {
        title: 'Shares by Issue',
        columns: getTopNEtc(columnsData.issue, 3).map((issue: any) => ({
          name: issue.type === 'etc' ? issue.message : `${issue.type}: ${issue.message}`,
          values: [issue.count],
        })),
      },
      {
        title: 'Shares by Browser',
        columns: columnsData.browser.map(mapNameValues),
      },
      {
        title: 'Shares by OS',
        columns: columnsData.os.map(mapNameValues),
      },
      {
        title: 'Shares by URL',
        columns: columnsData.url.map(mapNameValues),
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
