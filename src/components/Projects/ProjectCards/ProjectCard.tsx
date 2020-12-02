import React from 'react';
import { Box, Card, Grid, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';

interface IProjectCardProps {
  name: string;
  dsn: string;
  owner: string;
  members: string[];
}

// TODO: add parameter props: IProjectCardProps
function ProjectCard(props: IProjectCardProps): React.ReactElement {
  const { name, dsn, owner, members } = props;
  // 임시 값입니다.
  return (
    <Grid item xs={4}>
      <Card>
        <Box p={2}>
          <Typography variant="h3" color="primary">
            <Link to="/project/12345">{name}</Link>
          </Typography>
          <Box pt={2}>
            <Typography variant="h4">DSN</Typography>
            <Typography>{dsn}</Typography>
          </Box>
          <Box pt={2}>
            <Typography variant="h4">Owner</Typography>
            <Typography>{owner}</Typography>
          </Box>
          <Box pt={2}>
            <Typography variant="h4">Members</Typography>
            {members.map((member) => (
              <Typography>{member}</Typography>
            ))}
          </Box>
        </Box>
      </Card>
    </Grid>
  );
}

export default ProjectCard;
