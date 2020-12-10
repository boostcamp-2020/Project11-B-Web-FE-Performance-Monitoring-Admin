import React from 'react';
import { Box } from '@material-ui/core';
import IssueTable from '../components/Issues/IssueTable';
import IssueHeader from '../components/Issues/IssuesHeader';
import ProjectSelector from '../components/Issues/ProjectSelector';

function Issue(): React.ReactElement {
  return (
    <>
      <ProjectSelector />
      <Box padding={3}>
        <IssueHeader />
        <IssueTable />
      </Box>
    </>
  );
}

export default Issue;
