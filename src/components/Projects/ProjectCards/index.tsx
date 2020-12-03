import React from 'react';
import { Box, Grid } from '@material-ui/core';

import ProjectCard from './ProjectCard';

const projects = [
  {
    name: 'MyProject1',
    dsn: 'panopticon.gq/api/errors/MyProject1',
    owner: 'junsushin-dev',
    members: [],
  },
  {
    name: 'MyProject2',
    dsn: 'panopticon.gq/api/errors/MyProject2',
    owner: 'junsushin-dev',
    members: ['saeeng', 'juyoungpark', 'EarlyHail'],
  },
  {
    name: 'MyProject3',
    dsn: 'panopticon.gq/api/errors/MyProject3',
    owner: 'saeeng',
    members: ['juyoungpark', 'EarlyHail'],
  },
];

function ProjectCards(): React.ReactElement {
  return (
    <Box pt={2}>
      <Grid container spacing={3}>
        {projects.map((props) => (
          <ProjectCard
            key={props.dsn}
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
