import React from 'react';
import { Box } from '@material-ui/core';
import IssueTable from '../components/Issues/IssueTable';
import IssueHeader from '../components/Issues/IssuesHeader';
import FilterPage from '../components/layout/FilterPage';

function Issue(): React.ReactElement {
  return (
    <>
      <FilterPage>
        <Box pt={3}>
          <IssueHeader />
          <IssueTable />
        </Box>
      </FilterPage>
    </>
  );
}

export default Issue;
