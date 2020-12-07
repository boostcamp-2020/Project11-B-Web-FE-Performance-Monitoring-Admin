import React from 'react';
import { Box, createStyles, makeStyles, Typography, Theme } from '@material-ui/core';

import BackNextButtons from '../../NewProject/BackNextButtons';

interface IProps {
  className: string;
  crimeId: string;
  occuredAt: string;
  handleBack: () => void;
  handleNext: () => void;
}

function CrimeHeader(props: IProps): React.ReactElement {
  const { className, crimeId, occuredAt, handleBack, handleNext } = props;

  return (
    <Box className={className}>
      <Box>
        <Typography>
          <strong>Event</strong> {crimeId}
        </Typography>
        <Typography color="primary">{new Date(occuredAt).toString()}</Typography>
      </Box>
      <BackNextButtons handleBack={handleBack} handleNext={handleNext} />
    </Box>
  );
}

export default CrimeHeader;
