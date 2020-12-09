import React from 'react';
import { Select, MenuItem } from '@material-ui/core';

const periods = [
  { label: 'hour', query: '1h' },
  { label: 'day', query: '1d' },
  { label: 'week', query: '1w' },
  { label: '2 weeks', query: '2w' },
  { label: '30 days', query: '30d' },
  { label: '90 days', query: '90d' },
  { label: 'year', query: '1y' },
];

interface IProps {
  period: string;
  setPeriod: (period: string) => void;
}

function PeriodSelector(props: IProps): React.ReactElement {
  const { period, setPeriod } = props;

  const handleChange = (event: any) => {
    setPeriod(event.target.value);
  };

  return (
    <Select
      label="period"
      value={period}
      onChange={handleChange}
      MenuProps={{
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'left',
        },
        getContentAnchorEl: null,
      }}
    >
      {periods.map((item) => (
        <MenuItem key={item.label} value={item.query}>
          Last {item.label}
        </MenuItem>
      ))}
    </Select>
  );
}

export default PeriodSelector;
