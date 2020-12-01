import React from 'react';
import { Box, Typography } from '@material-ui/core';
import { AccountBox } from '@material-ui/icons';

function ProjectsUserInfo(): React.ReactElement {
  return (
    <Box>
      <AccountBox />
      <Typography>Junsu Shin</Typography>
    </Box>
  );
}

export default ProjectsUserInfo;
