import React from 'react';
import { Box, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { styled, makeStyles } from '@material-ui/core/styles';
import { AccessTime } from '@material-ui/icons';
import { faJs } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import timeAgo from '../../../utils/timeAgo';
import { IProps } from '../issueTypes';

const StyledLink = styled(Link)({
  fontSize: '16px',
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
});

function IssueListItem(props: IProps): React.ReactElement {
  const { issue } = props;
  const styles = useStyle();
  return (
    <Box display="flex" fontSize="small" px={3} py={1} className={styles.issueItem}>
      <Box>
        <Box display="flex" gridGap={10}>
          <StyledLink to={`/issue/${issue._id}`}>{issue.type}</StyledLink>
          <Box>{`${issue.stack.function}(${issue.stack.filename}) `}</Box>
        </Box>
        <Box fontSize="14px">{issue.message}</Box>
        <Box display="flex">
          <Box mr={1}>
            <FontAwesomeIcon size="lg" icon={faJs} color="#f0db4f" />
          </Box>
          <Box mr={1}>{issue.project[0].name}</Box>
          <Box display="flex" fontSize="small" color="textSecondary">
            <Box>
              <AccessTime fontSize="inherit" />
            </Box>
            <span> {timeAgo(issue.errors[0].occuredAt)}</span>
          </Box>
        </Box>
      </Box>
      <Box display="flex" justifyContent="space-around" minWidth="300px" alignItems="center">
        <Box>
          <Typography variant="h3" color="primary">
            {issue.errorIds.length}
          </Typography>
        </Box>
        <Box>
          <Typography variant="h3" color="primary">
            {issue.errorIds.length}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default IssueListItem;
