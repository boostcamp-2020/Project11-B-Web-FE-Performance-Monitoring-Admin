import React, { useState, useEffect } from 'react';
import { Box, createStyles, makeStyles, Theme } from '@material-ui/core';

import { ICrime } from './types';
import Progress from '../../common/Progress';
import CrimeHeader from './CrimeHeader';
import CrimeTags from './CrimeTags';
import CrimeStack from './CrimeStack';
import TagDetail from './TagDetail';

import { convertIP } from '../../../utils/convertIP';
import service from '../../../service';

interface IProps {
  errorIds: string[];
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    horizontalBox: {
      padding: '32px',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderBottom: '1px solid #E2DEE6',
    },
    titleBox: {
      padding: '32px',
      display: 'flex',
      flexDirection: 'column',
      borderBottom: '1px solid #E2DEE6',
    },
  }),
);

function CrimeView(props: IProps): React.ReactElement {
  const classes = useStyles();
  const { errorIds } = props;
  const [crimeIndex, setCrimeIndex] = useState(0);
  const [crime, setCrime] = useState<ICrime>();

  useEffect(() => {
    if (errorIds.length === 0) return;
    (async () => {
      const crimeId = errorIds[crimeIndex];
      const { data } = await service.getCrime(crimeId);
      setCrime(data);
    })();
  }, [crimeIndex, errorIds]);

  const handleBack = () => {
    setCrimeIndex((prevIndex) => prevIndex - 1);
  };

  const handleNext = () => {
    setCrimeIndex((prevIndex) => prevIndex + 1);
  };

  const getTagDetailContents = (curr: ICrime) => {
    const { browser, os, ip } = curr.meta;
    return [
      {
        title: 'USER',
        contents: [{ label: 'IP Address', content: convertIP(ip) }],
      },
      {
        title: 'BROWSER',
        contents: [
          { label: 'Name', content: browser.name },
          { label: 'Version', content: browser.version },
        ],
      },
      {
        title: 'OPERATING SYSTEM',
        contents: [
          { label: 'Name', content: os.name },
          { label: 'Version', content: os.version },
        ],
      },
      {
        title: 'SDK',
        contents: [
          { label: 'Name', content: curr.sdk.name },
          { label: 'Version', content: curr.sdk.version },
        ],
      },
    ];
  };

  return crime === undefined ? (
    <Progress />
  ) : (
    <Box>
      <CrimeHeader
        className={classes.horizontalBox}
        crime={crime}
        handleBack={handleBack}
        handleNext={handleNext}
      />
      <CrimeTags className={classes.titleBox} crime={crime} />
      <CrimeStack className={classes.titleBox} crime={crime} />
      {getTagDetailContents(crime).map((item) => (
        <TagDetail className={classes.titleBox} title={item.title} contents={item.contents} />
      ))}
    </Box>
  );
}

export default CrimeView;
