import React from 'react';
import { Select, MenuItem, FormControl, InputLabel } from '@material-ui/core';

import { makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
  createStyles({
    h100: {
      height: '100%',
    },
  }),
);

const periods = [
  { label: 'hour', query: '1h' },
  { label: 'day', query: '1d' },
  { label: 'week', query: '1w' },
  { label: '2 weeks', query: '2w' },
  { label: '30 days', query: '1M' },
  { label: '90 days', query: '3M' },
  { label: 'year', query: '1y' },
  { label: 'all', query: '1A' },
];

interface IProps {
  period: string;
  setPeriod: (period: string) => void;
  all?: boolean;
}

function PeriodSelector(props: IProps): React.ReactElement {
  const classes = useStyles();
  const { period, setPeriod, all } = props;

  const handleChange = (event: any) => {
    setPeriod(event.target.value);
  };

  return (
    <FormControl variant="outlined" fullWidth className={classes.h100}>
      <InputLabel>SELECTED PERIOD</InputLabel>
      <Select
        className={classes.h100}
        label="SELECTED PERIOD"
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
        {periods
          .filter((item) => {
            if (item.label === 'all' && !all) return false;
            return true;
          })
          .map((item) => (
            <MenuItem key={item.label} value={item.query} className={classes.h100}>
              Last {item.label}
            </MenuItem>
          ))}
      </Select>
    </FormControl>
  );
}

PeriodSelector.defaultProps = {
  all: false,
};
export default PeriodSelector;
