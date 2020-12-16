import React from 'react';
import { Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { ReactComponent as JsIcon } from '../../../image/javascript.svg';
import { IIssue } from '../../../types';
import StatBox from './StatBox';

export interface IProps {
  issue: IIssue;
}

const useStyle = makeStyles({
  issueItem: {
    justifyContent: 'space-between',
    borderBottom: '1px solid #cfcfcf',
    '&:last-child': {
      border: 'none',
    },
  },
  svg: {
    width: '18px',
    height: '18px',
    borderRadius: '1px',
    marginRight: '4px',
  },
});

function IssueDetailHeader(props: IProps): React.ReactElement {
  const { issue } = props;
  const styles = useStyle();
  return (
    <Box
      display="flex"
      fontSize="large"
      width="100%"
      px={4}
      pr={10}
      py={4}
      className={styles.issueItem}
    >
      <Box>
        <Box display="flex" gridGap={10}>
          <Typography variant="h2">{issue.type}</Typography>
        </Box>
        <Box fontSize="14px">
          <Typography variant="subtitle1">{issue.message}</Typography>
        </Box>
        <Box display="flex" alignItems="center" justifyContent="center">
          <JsIcon className={styles.svg} />

          <Box mr={1}>{issue.project.name}</Box>
        </Box>
      </Box>
      <Box display="flex" minWidth="300px" alignItems="center">
        <Box mr={1}>
          <StatBox name="EVENTS" color="primary.main" count={issue.crimeCount} />
        </Box>
        <Box mr={1}>
          <StatBox name="USERS" color="primary.main" count={issue.userCount} />
        </Box>
      </Box>
    </Box>
  );
}

export default React.memo(IssueDetailHeader);
