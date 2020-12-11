import React from 'react';
import { Box } from '@material-ui/core';
import IssueTable from '../components/Issues/IssueTable';
import IssueHeader from '../components/Issues/IssuesHeader';
import ProjectSelector from '../components/Issues/ProjectSelector';

function Issue(): React.ReactElement {
  return (
    <Box p={3}>
      <ProjectSelector />
      <Box pt={3}>
        <IssueHeader />
        <IssueTable />
      </Box>
    </Box>
  );
}

export default Issue;
