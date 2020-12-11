import React, { useState, useEffect } from 'react';
import { Box, Tabs, Tab } from '@material-ui/core';

import { IProjectCardProps } from '../../../types';
import LineChart from './LineChart';
import Progress from '../../common/Progress';
import service from '../../../service';

interface IProps {
  selectedProjects: IProjectCardProps[];
  period: string;
}
function TimeCharts(props: IProps): React.ReactElement {
  const { selectedProjects, period } = props;

  const [currTab, setCurrTab] = useState(0);
  const [columns, setColumns] = useState<any>([]);

  useEffect(() => {
    (async () => {
      const res = await service.getCountByInterval({
        projectIds: selectedProjects.map((project) => project._id),
        type: 'recent',
        period,
      });
      setColumns(res.data);
    })();
  }, [selectedProjects, period]);

  const handleChange = (event: any, newValue: number) => {
    setCurrTab(newValue);
  };

  const getColumnInput = (key: string) => {
    const [firstItem] = columns[key];

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

  return columns === undefined ? (
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
          <LineChart columns={getColumnInput(getColumnKeys()[currTab])} period={period} />
        </Box>
      )}
    </Box>
  );
}

export default TimeCharts;
