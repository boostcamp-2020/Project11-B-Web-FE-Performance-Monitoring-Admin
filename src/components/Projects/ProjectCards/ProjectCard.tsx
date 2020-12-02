import React from 'react';
import { Box, Card, Grid, Typography, styled } from '@material-ui/core';

interface IProjectCardProps {
  name: string;
  dsn: string;
  owner: string;
  members: string[];
}

const CustomCard = styled(Card)({
  minHeight: '300px',
});

// TODO: add parameter props: IProjectCardProps
function ProjectCard(props: IProjectCardProps): React.ReactElement {
  const { name, dsn, owner, members } = props;
  return (
    <Grid item xs={4}>
      <CustomCard>
        <Box p={2}>
          <Typography variant="h3" color="primary">
            {name}
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
      </CustomCard>
    </Grid>
  );
}

export default ProjectCard;
