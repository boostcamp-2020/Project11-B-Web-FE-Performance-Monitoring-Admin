import React from 'react';
import { Box } from '@material-ui/core';
import ProjectSelector from '../components/Issues/ProjectSelector';

import SessionTable from '../components/Analysis/SessionTable';

function Analysis(): React.ReactElement {
  return (
    <Box maxWidth="100%" overflow="hidden" p={3}>
      <ProjectSelector />
      <SessionTable />
    </Box>
  );
}

export default Analysis;
