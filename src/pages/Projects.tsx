import React from 'react';
import { Box } from '@material-ui/core';

import ProjectHeader from '../components/Projects/ProjectHeader';
import ProjectTitle from '../components/Projects/ProjectTitle';
import ProjectCards from '../components/Projects/ProjectCards';

function Projects(): React.ReactElement {
  return (
    <Box p={5} display="flex" flexDirection="column">
      <ProjectHeader />
      <ProjectTitle />
      <ProjectCards />
    </Box>
  );
}

export default Projects;
