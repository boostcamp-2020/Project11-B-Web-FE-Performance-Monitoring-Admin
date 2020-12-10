import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Grid } from '@material-ui/core';

import ProjectCard from './ProjectCard';
import { initializeProjects } from '../../../modules/projects';
import { RootState } from '../../../modules';

function ProjectCards(): React.ReactElement {
  const projects = useSelector((state: RootState) => state.projects.projects);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeProjects());
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
