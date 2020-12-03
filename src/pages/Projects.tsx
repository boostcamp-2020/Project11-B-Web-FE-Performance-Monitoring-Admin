import React from 'react';
import { Box } from '@material-ui/core';

import ProjectsHeader from '../components/Projects/ProjectsHeader';
import ProjectsUserInfo from '../components/Projects/ProjectsUserInfo';
import ProjectCards from '../components/Projects/ProjectCards';

function Projects(): React.ReactElement {
  const title = 'Projects';
  const userName = 'Junsu Shin';
  return (
    <Box p={5} display="flex" flexDirection="column">
      <ProjectsHeader title={title} />
      <ProjectsUserInfo userName={userName} />
      <ProjectCards />
    </Box>
  );
}

export default Projects;
