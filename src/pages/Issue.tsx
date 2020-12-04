import React from 'react';

import { Box } from '@material-ui/core';
import IssueTable from '../components/Issues/IssueTable';
import IssueHeader from '../components/Issues/IssuesHeader';
import Page from '../components/layout/Page';

function Issue(): React.ReactElement {
  return (
    <Page title="issue">
      <>
        <Box padding={3}>
          <IssueHeader />
          <IssueTable />
        </Box>
      </>
    </Page>
  );
}

export default Issue;
