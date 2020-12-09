import React, { useState, useEffect } from 'react';
import { Box, Grid } from '@material-ui/core';

import { IProjectCardProps } from '../../../types';
import PieChart from './PieChart';
import Progress from '../../common/Progress';
import service from '../../../service';
import ChartFrame from '../ChartFrame';

interface IProps {
  selectedProjects: IProjectCardProps[];
}
function ShareCharts(props: IProps): React.ReactElement {
  const [columns, setColumns] = useState<any>();
  const { selectedProjects } = props;
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

    const processIssueName = (message: string, type: string, maxLen: number) => {
      const fullMessage = type === 'etc' ? message : `${type}: ${message}`;
      const cutMessage =
        fullMessage.length > maxLen - 3 ? `${fullMessage.slice(0, maxLen - 3)}...` : fullMessage;
      return cutMessage;
    };

    return [
      {
        title: 'Shares by Issue',
        columns: getTopNEtc(columnsData.issue, 3).map((issue: any) => ({
          name: processIssueName(issue.message, issue.type, 45),
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
    <>
      {selectedProjects.length > 0 && (
        <>
          {getPieChartInputs(columns).map((input) => (
            <ChartFrame xs={4}>
              <PieChart key={input.title} columns={input.columns} />
            </ChartFrame>
          ))}
        </>
      )}
    </>
  );
}

export default ShareCharts;
