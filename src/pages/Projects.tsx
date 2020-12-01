import React from 'react';
import { Box } from '@material-ui/core';

import ProjectsHeader from '../components/Projects/ProjectsHeader';
import ProjectsUserInfo from '../components/Projects/ProjectsUserInfo';
import ProjectCards from '../components/Projects/ProjectCards';

function Projects(): React.ReactElement {
  return (
    <Box p={5} display="flex" flexDirection="column">
      <ProjectsHeader />
      <ProjectsUserInfo />
      <ProjectCards />
    </Box>
  );
}

export default Projects;
