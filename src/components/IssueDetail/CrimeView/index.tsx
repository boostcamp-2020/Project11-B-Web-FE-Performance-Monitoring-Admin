import React, { useState, useEffect } from 'react';
import { Box, createStyles, makeStyles, Theme } from '@material-ui/core';

import Progress from '../../common/Progress';
import CrimeHeader from './CrimeHeader';
import CrimeTags from './CrimeTags';
import CrimeStack from './CrimeStack';
import TagDetail from './TagDetail';

import service from '../../../service';

interface IStack {
  _id: string;
  columnNo: string;
  lineNo: string;
  function: string;
  filename: string;
}

interface ICrime {
  _id: string;
  meta: {
    browser: {
      name: string;
      version: string;
    };
    os: {
      name: string;
      version: string;
    };
    url: string;
    ip: string;
  };
  message: string;
  type: string;
  stack: IStack[];
  occuredAt: string;
  sdk: {
    name: string;
    version: string;
  };
}

interface IProps {
  issueId: string;
  errorIds: string[];
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    crimePropertyBox: {
      padding: '32px',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderBottom: '1px solid #E2DEE6',
    },
  }),
);

function CrimeView(props: IProps): React.ReactElement {
  const classes = useStyles();
  const { issueId, errorIds } = props;
  const [crimeIndex, setCrimeIndex] = useState(0);
  const [crime, setCrime] = useState<ICrime>();

  useEffect(() => {
    if (errorIds.length === 0) return;
    (async () => {
      const crimeId = errorIds[crimeIndex];
      const res = await service.getCrime(crimeId);
      setCrime(res);
    })();
  }, [crimeIndex, errorIds]);

  const handleBack = () => {
    setCrimeIndex((prevIndex) => prevIndex - 1);
  };

  const handleNext = () => {
    setCrimeIndex((prevIndex) => prevIndex + 1);
  };

  return crime === undefined ? (
    <Progress />
  ) : (
    <Box>
      <CrimeHeader
        className={classes.crimePropertyBox}
        crimeId={crime._id}
        occuredAt={crime.occuredAt}
        handleBack={handleBack}
        handleNext={handleNext}
      />
      <CrimeTags />
      <CrimeStack />
      {/* <TagDetail title="USER" content={} />
      <TagDetail title="BROWSER" content={} />
      <TagDetail title="OPERATING SYSTEM" content={} /> */}
    </Box>
  );
}

export default CrimeView;
