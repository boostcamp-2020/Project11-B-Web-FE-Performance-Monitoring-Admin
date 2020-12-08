import React from 'react';
import { Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { faJs } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
});

function IssueDetailHeader(props: IProps): React.ReactElement {
  const { issue } = props;
  const issueData = issue._id;
  const issueStat = issue._stat[0];
  const userSet = new Set([...issueStat.userIps]);
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
          <Typography variant="h2">{issueData.type}</Typography>
          <Box>{`${issueData.stack.function}(${issueData.stack.filename}) `}</Box>
        </Box>
        <Box fontSize="14px">
          <Typography variant="subtitle1">{issueData.message}</Typography>
        </Box>
        <Box display="flex">
          <Box mr={1}>
            <FontAwesomeIcon size="lg" icon={faJs} color="#f0db4f" />
          </Box>
          <Box mr={1}>{issueData.project[0].name}</Box>
        </Box>
      </Box>
      <Box display="flex" minWidth="300px" alignItems="center">
        <Box mr={1}>
          <StatBox name="EVENTS" color="primary.main" count={issueData.errorIds.length} />
        </Box>
        <Box mr={1}>
          <StatBox name="USERS" color="primary.main" count={userSet.size} />
        </Box>
      </Box>
    </Box>
  );
}

export default IssueDetailHeader;
