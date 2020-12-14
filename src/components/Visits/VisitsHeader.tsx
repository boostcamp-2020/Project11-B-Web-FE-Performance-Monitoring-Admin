import React from 'react';
import { Box } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import Typography from '@material-ui/core/Typography';

interface IProps {
  year: number;
  month: number;
  nextMonth: () => void;
  beforeMonth: () => void;
}

function VisitsHeader(props: IProps): React.ReactElement {
  const { year, month, nextMonth, beforeMonth }: IProps = props;
  return (
    <Box m={3} display="flex" justifyContent="center" alignItems="center">
      <IconButton>
        <ArrowLeftIcon fontSize="large" onClick={beforeMonth} />
      </IconButton>
      <Typography variant="h2">
        {year}-{month}
      </Typography>
      <IconButton>
        <ArrowRightIcon fontSize="large" onClick={nextMonth} />
      </IconButton>
    </Box>
  );
}

export default VisitsHeader;
