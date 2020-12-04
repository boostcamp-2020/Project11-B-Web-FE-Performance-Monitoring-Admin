import React, { useState, useEffect } from 'react';
import { Box, Grid } from '@material-ui/core';

import ProjectCard, { IProjectCardProps } from './ProjectCard';
import service from '../../../service';

function ProjectCards(): React.ReactElement {
  const [projects, setProjects] = useState<IProjectCardProps[]>([]);

  useEffect(() => {
    (async () => {
      const response = await service.getProjects();
      setProjects(response.data.projects);
    })();
  }, []);

  return (
    <Box pt={2}>
      <Grid container spacing={3}>
        {projects.map((props) => (
          <ProjectCard
            key={props._id}
            _id={props._id}
            name={props.name}
            owner={props.owner}
            users={props.users}
          />
        ))}
      </Grid>
    </Box>
  );
}

export default ProjectCards;
