import React, { useEffect, useRef } from 'react';
import { Box } from '@material-ui/core';
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
    <Box m={3} display="flex" justifyContent="center">
      <ArrowLeftIcon fontSize="large" onClick={beforeMonth} />
      <Typography variant="h2">
        {year}-{month}
      </Typography>
      <ArrowRightIcon fontSize="large" onClick={nextMonth} />
    </Box>
  );
}

export default VisitsHeader;
