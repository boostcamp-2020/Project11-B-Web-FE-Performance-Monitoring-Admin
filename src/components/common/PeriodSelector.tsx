import React from 'react';
import { Select, MenuItem, FormControl, InputLabel } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../modules';
import { setSelectedPeriodAction } from '../../modules/filters';
import { IPeriod } from '../../types';

const useStyles = makeStyles(() =>
  createStyles({
    h100: {
      height: '100%',
    },
  }),
);

const periods: IPeriod[] = [
  { label: 'hour', query: '1h' },
  { label: 'day', query: '1d' },
  { label: 'week', query: '1w' },
  { label: '2 weeks', query: '2w' },
  { label: '30 days', query: '1M' },
  { label: '90 days', query: '3M' },
  { label: 'year', query: '1y' },
  { label: 'all', query: '1A' },
];

function PeriodSelector(): React.ReactElement {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selectedPeriod = useSelector((state: RootState) => state.projects.selectedPeriod);

  const handleSelectChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const newSelectedPeriod = event.target.value as string;
    dispatch(setSelectedPeriodAction(newSelectedPeriod));
  };

  return (
    <FormControl variant="outlined" fullWidth className={classes.h100}>
      <InputLabel>SELECTED PERIOD</InputLabel>
      <Select
        className={classes.h100}
        label="SELECTED PERIOD"
        value={selectedPeriod}
        onChange={handleSelectChange}
        MenuProps={{
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'left',
          },
          getContentAnchorEl: null,
        }}
      >
        {periods.map((item) => (
          <MenuItem key={item.label} value={item.query} className={classes.h100}>
            {`${item.label === 'all' ? '' : 'Last '}${item.label}`}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default PeriodSelector;
