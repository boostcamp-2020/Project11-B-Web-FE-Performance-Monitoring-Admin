import React, { useState, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { Box, createStyles, makeStyles, Theme } from '@material-ui/core';
import { RootState } from '../../../modules';
import { setCrime } from '../../../modules/crime';

import { ICrime } from '../../../types';
import Progress from '../../common/Progress';
import CrimeHeader from './CrimeHeader';
import CrimeTags from './CrimeTags';
import CrimeStack from './CrimeStack';
import TagDetail from './TagDetail';

import { convertIP } from '../../../utils/convertIP';
import service from '../../../service';

interface IProps {
  crimeIds: string[];
  crimeIndex: number;
  handleBack: () => void;
  handleNext: () => void;
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
  const crime = useSelector((state: RootState) => state.crime);
  const { crimeIds, crimeIndex, handleNext, handleBack } = props;
  const dispatch = useDispatch();
  const [isFetching, setIsFetching] = useState<boolean>(false);

  useEffect(() => {
    if (crimeIds.length === 0) return;
    const crimeId = crimeIds[crimeIndex];
    dispatch(setCrime(crimeId, setIsFetching));
  }, [crimeIndex, crimeIds]);

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
        disableBack={crimeIndex === 0}
        disableNext={crimeIndex === crimeIds.length - 1}
        handleBack={handleBack}
        handleNext={handleNext}
      />
      {isFetching ? (
        <Progress />
      ) : (
        <Box>
          <CrimeTags className={classes.titleBox} crime={crime} />
          <CrimeStack className={classes.titleBox} crime={crime} />
          {getTagDetailContents(crime).map((item) => (
            <TagDetail
              key={item.title}
              className={classes.titleBox}
              title={item.title}
              contents={item.contents}
            />
          ))}
        </Box>
      )}
    </Box>
  );
}

export default CrimeView;
