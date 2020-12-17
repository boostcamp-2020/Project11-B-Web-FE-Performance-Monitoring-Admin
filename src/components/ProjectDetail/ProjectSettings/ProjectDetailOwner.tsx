import React from 'react';
import { Box, Typography } from '@material-ui/core';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';

export interface IUser {
  projects: [];
  _id: string;
  uid: number;
  email: string | null;
  nickname: string;
}

export interface IProject {
  users: IUser[];
  _id: string;
  name: string;
  description: string;
  owner: IUser;
}

interface IProps {
  name: string;
}

function ProjectDetailOwner(props: IProps): React.ReactElement {
  const { name } = props;

  return (
    <Box display="flex" flexDirection="row" alignItems="center">
      <SupervisorAccountIcon />
      <Typography>OWNER :</Typography>
      <Box ml={2} p={1}>
        <Typography variant="h3" color="primary">
          {name}
        </Typography>
      </Box>
    </Box>
  );
}

export default ProjectDetailOwner;
