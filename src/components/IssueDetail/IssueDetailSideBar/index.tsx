import React from 'react';
import Box from '@material-ui/core/Box';
import Chart from '../../common/IssueCrimeChart';
import IssueDetailTagShares from './IssueDetailTagShares';

interface IProps {
  issueId: string;
}

function IssueDetailSideBar(props: IProps): React.ReactElement {
  const { issueId } = props;
  return (
    <Box px={4} py={3}>
      <Box my={1}>
        <Box>LAST 24 HOURS</Box>
        <Chart issueId={issueId} width="100%" height="100px" />
      </Box>
      <Box my={1}>
        <Box>LAST 30 Days</Box>
        <Chart issueId={issueId} width="100%" intervalType="day" height="100px" />
      </Box>
      <IssueDetailTagShares issueId={issueId} />
    </Box>
  );
}

export default IssueDetailSideBar;
