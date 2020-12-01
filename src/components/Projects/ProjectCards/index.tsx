import React from 'react';
import { Box, Grid } from '@material-ui/core';

import ProjectCard from './ProjectCard';

const testProps = {
  name: 'MyProject',
  dsn: 'panopticon.gq/api/errors/MyProject',
  owner: 'junsushin-dev',
  members: ['saeeng', 'juyoungpark', 'EarlyHail'],
};

const projectsProps = [testProps, testProps, testProps];

function ProjectCards(): React.ReactElement {
  return (
    <Box pt={2}>
      <Grid container spacing={3}>
        {projectsProps.map((props) => (
          <ProjectCard
            name={props.name}
            dsn={props.dsn}
            owner={props.owner}
            members={props.members}
          />
        ))}
      </Grid>
    </Box>
  );
}

export default ProjectCards;
