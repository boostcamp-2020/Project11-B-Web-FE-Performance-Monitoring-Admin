import React, { useState, useEffect } from 'react';
import { Box, Tabs, Tab } from '@material-ui/core';

import { useSelector } from 'react-redux';

import TabPanel from './TabPanel';
import PieChart from './PieChart';
import Progress from '../../common/Progress';
import service from '../../../service';
import { RootState } from '../../../modules';
import useProgress from '../../../hooks/ProgressHooks';

interface IProps {
  filterQuery: Record<string, string[] | undefined>;
}

function ShareCharts(props: IProps): React.ReactElement {
  const { filterQuery } = props;

  const [currTab, setCurrTab] = useState(0);
  const [columns, setColumns] = useState<any>();
  const selectedPeriod = useSelector((state: RootState) => state.projects.selectedPeriod);

  const [showProgress, displayProgress, hideProgress] = useProgress();
  const selectedProjects = useSelector((state: RootState) => state.projects.selectedProjectsIds);

  useEffect(() => {
    (async () => {
      displayProgress();
      const res = await service.getSharesData({
        projectIds: selectedProjects,
        type: 'recent',
        period: selectedPeriod,
        filters: filterQuery,
      });
      hideProgress();
      setColumns(res.data);
    })();
  }, [selectedProjects, selectedPeriod, filterQuery]);

  const handleChange = (event: any, newValue: number) => {
    setCurrTab(newValue);
  };

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
        label: 'Issue',
        title: 'Shares by Issue',
        columns: getTopNEtc(columnsData.issue, 3).map((issue: any) => ({
          name: processIssueName(issue.message, issue.type, 45),
          values: [issue.count],
        })),
      },
      {
        label: 'Browser',
        title: 'Shares by Browser',
        columns: columnsData.browser.map(mapNameValues),
      },
      {
        label: 'OS',
        title: 'Shares by OS',
        columns: columnsData.os.map(mapNameValues),
      },
      {
        label: 'URL',
        title: 'Shares by URL',
        columns: columnsData.url.map(mapNameValues),
      },
    ];
  };

  return showProgress ? (
    <Progress />
  ) : (
    <Box>
      {selectedProjects.length > 0 && columns !== undefined && (
        <Box>
          <Tabs value={currTab} onChange={handleChange}>
            {getPieChartInputs(columns).map((input, index) => (
              <Tab key={input.label} label={input.label} id={`tab-${index}`} />
            ))}
          </Tabs>
          {getPieChartInputs(columns).map((input, index) => (
            <TabPanel key={input.label} index={index} value={currTab}>
              <PieChart columns={input.columns} />
            </TabPanel>
          ))}
        </Box>
      )}
    </Box>
  );
}

export default ShareCharts;
