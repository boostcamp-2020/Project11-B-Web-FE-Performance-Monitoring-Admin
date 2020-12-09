import React, { useState, useEffect } from 'react';
import { Box, Grid } from '@material-ui/core';

import { IProjectCardProps } from '../../../types';
import ProjectSelector from '../../Issues/ProjectSelector';
import PieChart from './PieChart';
import Progress from '../../common/Progress';
import service from '../../../service';

function ShareCharts(): React.ReactElement {
  const [selectedProjects, setSelectedProjects] = useState<IProjectCardProps[]>([]);
  const [columns, setColumns] = useState<any>();

  useEffect(() => {
    (async () => {
      const res = await service.getSharesData({
        projectIds: selectedProjects.map((project) => project._id),
        type: 'recent',
        period: '1w',
      });
      setColumns(res.data);
    })();
  }, [selectedProjects]);

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
    <Box p={3}>
      <ProjectSelector
        selectedProject={selectedProjects}
        setSelectedProject={setSelectedProjects}
      />
      <Grid container spacing={2}>
        {getPieChartInputs(columns).map((input) => (
          <PieChart key={input.title} columns={input.columns} />
        ))}
      </Grid>
    </Box>
  );
}

export default ShareCharts;
