import React, { useContext } from 'react';
import { Box } from '@material-ui/core';

import ProjectsHeader from '../components/Projects/ProjectsHeader';
import ProjectsUserInfo from '../components/Projects/ProjectsUserInfo';
import ProjectCards from '../components/Projects/ProjectCards';
import UserContext from '../context';

function Projects(): React.ReactElement {
  const title = 'Projects';
  const { user } = useContext(UserContext);
  return (
    <Box p={5} display="flex" flexDirection="column">
      <ProjectsHeader title={title} />
      <ProjectsUserInfo userName={user.nickname as string} />
      <ProjectCards />
    </Box>
  );
}

export default Projects;
