import React from 'react';
import { Grid } from '@material-ui/core';

import ProjectCard from './ProjectCard';

function ProjectCards(): React.ReactElement {
  return (
    <Grid>
      <ProjectCard />
      <ProjectCard />
      <ProjectCard />
    </Grid>
  );
}

export default ProjectCards;
