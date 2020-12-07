import React from 'react';
import { Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { faJs } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IssueType } from '../../../types';
import StatBox from './StatBox';

export interface IProps {
  issue: IssueType;
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
    <Box display="flex" fontSize="large" width="100%" px={3} py={1} className={styles.issueItem}>
      <Box>
        <Box display="flex" gridGap={10}>
          <Typography variant="h2">{issueData.type}</Typography>
          <Box>{`${issueData.stack.function}(${issueData.stack.filename}) `}</Box>
        </Box>
        <Box fontSize="14px">{issueData.message}</Box>
        <Box display="flex">
          <Box mr={1}>
            <FontAwesomeIcon size="lg" icon={faJs} color="#f0db4f" />
          </Box>
          <Box mr={1}>{issueData.project[0].name}</Box>
        </Box>
      </Box>
      <Box display="flex" justifyContent="space-around" minWidth="300px" alignItems="center">
        <Box>
          <Typography variant="h3" color="primary">
            {issueData.errorIds.length}
          </Typography>
        </Box>
        <Box>
          <StatBox name="USERS" count={userSet.size} />
        </Box>
      </Box>
    </Box>
  );
}

export default IssueDetailHeader;
