import React from 'react';
import { Box, Typography, Tooltip, Hidden } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { styled, makeStyles } from '@material-ui/core/styles';
import { AccessTime } from '@material-ui/icons';
import { ReactComponent as JsIcon } from '../../../image/javascript.svg';
import timeAgo from '../../../utils/timeAgo';
import { IIssue } from '../../../types';
import Chart from '../../common/IssueCrimeChart';

export interface IProps {
  issue: IIssue;
}
const StyledLink = styled(Link)({
  fontSize: '18px',
  marginRight: '10px',
  fontWeight: 'bold',
  color: '#4877CF',
  '&:hover': {
    color: '#0B4ABF',
    transition: 'color 0.15s linear 0s',
  },
});
const useStyle = makeStyles({
  issueItem: {
    justifyContent: 'space-between',
    borderBottom: '1px solid #cfcfcf',
    '&:last-child': {
      border: 'none',
    },
  },
  svg: {
    width: '16px',
    height: '16px',
    borderRadius: '1px',
  },
});

function IssueListItem(props: IProps): React.ReactElement {
  const { issue } = props;
  const issueData = issue;
  const styles = useStyle();
  return (
    <Box display="flex" fontSize="small" px={3} className={styles.issueItem}>
      <Box display="flex" flexDirection="column" justifyContent="center">
        <Box>
          <Box gridGap={10}>
            <StyledLink to={`/issue/${issueData._id}`}>{issueData.type}</StyledLink>
            <Typography variant="caption" color="textSecondary">
              {`${issueData.stack.function}(${issueData.stack.filename}) `}
            </Typography>
          </Box>
          <Box fontSize="14px">{issueData.message}</Box>
          <Box display="flex">
            <Box mr={1}>
              <JsIcon className={styles.svg} />
            </Box>
            <Box mr={1}>{issueData.project.name}</Box>
            <Box display="flex" fontSize="small" color="textSecondary">
              <Box>
                <AccessTime fontSize="inherit" />
              </Box>
              <Tooltip
                title={new Date(issueData.lastCrime.occuredAt).toLocaleString()}
                placement="right"
                arrow
              >
                <span> {timeAgo(issueData.lastCrime.occuredAt)}</span>
              </Tooltip>
            </Box>
          </Box>
        </Box>
      </Box>

      <Box display="flex" justifyContent="space-around" alignItems="center" minWidth="33%">
        <Hidden mdDown>
          <Box width="240px">
            <Chart issueId={issue._id} />
          </Box>
        </Hidden>
        <Box display="flex" justifyContent="center" width="80px">
          <Typography variant="h3" color="primary">
            {issueData.crimeCount}
          </Typography>
        </Box>
        <Box display="flex" justifyContent="center" width="80px">
          <Typography variant="h3" color="primary">
            {issueData.userCount}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default React.memo(IssueListItem);
