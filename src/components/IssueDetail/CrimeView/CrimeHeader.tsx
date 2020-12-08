import React from 'react';
import { Box, createStyles, makeStyles, Typography, Theme } from '@material-ui/core';

import { ICrime } from './types';
import BackNextButtons from '../../NewProject/BackNextButtons';

interface IProps {
  className: string;
  crime: ICrime;
  disableBack: boolean;
  disableNext: boolean;
  handleBack: () => void;
  handleNext: () => void;
}

function CrimeHeader(props: IProps): React.ReactElement {
  const { className, crime, disableBack, disableNext, handleBack, handleNext } = props;
  const { _id: crimeId, occuredAt } = crime;

  return (
    <Box className={className}>
      <Box>
        <Typography>
          <strong>Event</strong> {crimeId}
        </Typography>
        <Typography color="primary">{new Date(occuredAt).toString()}</Typography>
      </Box>
      <BackNextButtons
        disableBack={disableBack}
        disableNext={disableNext}
        handleBack={handleBack}
        handleNext={handleNext}
      />
    </Box>
  );
}

export default CrimeHeader;
