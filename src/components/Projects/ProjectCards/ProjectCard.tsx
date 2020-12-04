import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Card, Grid, Typography, styled } from '@material-ui/core';

interface IUser {
  _id: string;
  uid: number;
  nickname: string;
  email: string;
}
export interface IProjectCardProps {
  _id: string;
  name: string;
  owner: IUser;
  users: IUser[];
}

const CustomCard = styled(Card)({
  minHeight: '300px',
});

function ProjectCard(props: IProjectCardProps): React.ReactElement {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { _id, name, owner, users } = props;

  const dsn = `http://panopticon.gq/api/error/${_id}`;

  return (
    <Grid item xs={4}>
      <CustomCard>
        <Box display="flex" flexDirection="column" p={2}>
          <Typography variant="h3" color="primary">
            <Link to={`/project/${_id}`}>{name}</Link>
          </Typography>
          <Box pt={2}>
            <Typography variant="h4">DSN</Typography>
            <Typography style={{ wordWrap: 'break-word' }}>{dsn}</Typography>
          </Box>
          <Box pt={2}>
            <Typography variant="h4">Owner</Typography>
            <Typography>{owner.nickname}</Typography>
          </Box>
          <Box pt={2}>
            <Typography variant="h4">Users</Typography>
            {users.map(({ nickname }) => (
              <Typography key={nickname}>{nickname}</Typography>
            ))}
          </Box>
        </Box>
      </CustomCard>
    </Grid>
  );
}

export default ProjectCard;
