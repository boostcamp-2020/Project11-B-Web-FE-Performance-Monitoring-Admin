import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Box, Tabs, Tab } from '@material-ui/core';

import LineChart from './LineChart';
import Progress from '../../common/Progress';
import service from '../../../service';
import { RootState } from '../../../modules';
import useInterval from '../../../hooks/UseInterval';
import useProgress from '../../../hooks/ProgressHooks';

interface IProps {
  filterQuery: Record<string, string[] | undefined>;
}

function TimeCharts(props: IProps): React.ReactElement {
  const selectedPeriod = useSelector((state: RootState) => state.projects.selectedPeriod);

  const { filterQuery } = props;

  const [currTab, setCurrTab] = useState(0);
  const [columns, setColumns] = useState<any>([]);
  const [showProgress, displayProgress, hideProgress] = useProgress();
  const selectedProjects = useSelector((state: RootState) => state.projects.selectedProjectsIds);

  useEffect(() => {
    (async () => {
      displayProgress();
      const res = await service.getCountByInterval({
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

  const getColumnInput = (key: string) => {
    if (!columns[key]) return [];
    const [firstItem] = columns[key];
    if (!firstItem) return [];

    const result = [
      {
        name: 'x',
        values: firstItem.timeframes.map((item: any) => new Date(item.time)),
      },
      ...columns[key].map((group: any) => ({
        name: group.name === '' ? 'events' : group.name,
        values: group.timeframes.map((timeframe: any) => timeframe.count),
      })),
    ];

    return result;
  };

  const getColumnKeys = () => {
    return Object.keys(columns);
  };

  const updateColumns = async () => {
    const res = await service.getCountByInterval({
      projectIds: selectedProjects,
      type: 'recent',
      period: selectedPeriod,
      filters: filterQuery,
    });
    setColumns(res.data);
  };

  useInterval(updateColumns, 30000);

  return showProgress ? (
    <Progress />
  ) : (
    <Box>
      {selectedProjects.length > 0 && (
        <Box>
          <Tabs value={currTab} onChange={handleChange}>
            {getColumnKeys().map((key, index) => (
              <Tab key={key} label={key} id={`tab-${index}`} />
            ))}
          </Tabs>
          <LineChart columns={getColumnInput(getColumnKeys()[currTab])} />
        </Box>
      )}
    </Box>
  );
}

export default TimeCharts;
