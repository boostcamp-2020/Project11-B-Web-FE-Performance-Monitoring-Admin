import React from 'react';
import { Box } from '@material-ui/core';

import ProjectsHeader from '../components/Projects/ProjectsHeader';
import ProjectsTitle from '../components/Projects/ProjectsTitle';
import ProjectCards from '../components/Projects/ProjectCards';

function Projects(): React.ReactElement {
  return (
    <Box p={5} display="flex" flexDirection="column">
      <ProjectsHeader />
      <ProjectsTitle />
      <ProjectCards />
    </Box>
  );
}

export default Projects;
