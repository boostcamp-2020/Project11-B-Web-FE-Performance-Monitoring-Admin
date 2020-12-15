import React from 'react';
import { useSelector } from 'react-redux';
import { Box } from '@material-ui/core';

import ProjectsHeader from '../components/Projects/ProjectsHeader';
import ProjectsUserInfo from '../components/Projects/ProjectsUserInfo';
import ProjectCards from '../components/Projects/ProjectCards';
import { RootState } from '../modules';

function Projects(): React.ReactElement {
  const title = 'Projects';
  const user = useSelector((state: RootState) => state.user);
  return (
    <Box p={5} display="flex" flexDirection="column">
      <ProjectsHeader title={title} />
      <ProjectsUserInfo userName={user.nickname as string} />
      <ProjectCards />
    </Box>
  );
}

export default Projects;
