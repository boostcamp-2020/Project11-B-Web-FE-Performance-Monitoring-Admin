import React from 'react';
import { Box } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { styled, makeStyles } from '@material-ui/core/styles';

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
    borderBottom: '1px solid #cfcfcf',
    '&:last-child': {
      border: 'none',
    },
  },
});

interface IStack {
  columnNo: string;
  lineNo: string;
  function: string;
  filename: string;
}
interface IssueType {
  _id: string;
  message: string;
  stack: IStack[];
  occuredAt: Date;
  sdk: {
    name: string;
    version: string;
  };
  meta: {
    broswer: {
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
}

interface IProps {
  issue: IssueType;
}

function IssueListItem(props: IProps): React.ReactElement {
  const { issue } = props;
  const styles = useStyle();
  return (
    <Box px={4} py={2} className={styles.issueItem}>
      <Box display="flex" gridGap={10}>
        <StyledLink to={`/issue/${issue._id}`}>ReferencedError</StyledLink>
        <Box color="#817091">{issue.stack[0].filename}</Box>
      </Box>
      <Box fontSize="14px">{issue.message}</Box>
      <Box display="flex" gridGap={10}>
        <Box color="#817091">JuyoungPark</Box>
        <Box color="#817091">{issue.occuredAt}</Box>
      </Box>
    </Box>
  );
}

export default IssueListItem;
