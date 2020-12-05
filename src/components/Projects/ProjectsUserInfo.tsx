import React from 'react';
import { Box, Typography } from '@material-ui/core';
import { AccountBox } from '@material-ui/icons';

interface IProps {
  userName: string;
}

function ProjectsUserInfo(props: IProps): React.ReactElement {
  const { userName } = props;
  return (
    <Box pt={7} display="flex" flexDirection="row" alignItems="center">
      <AccountBox fontSize="large" color="primary" />
      <Typography variant="h2" color="primary">
        {userName}
      </Typography>
    </Box>
  );
}

export default ProjectsUserInfo;
