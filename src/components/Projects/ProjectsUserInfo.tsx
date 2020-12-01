import React from 'react';
import { Box, Typography } from '@material-ui/core';
import { AccountBox } from '@material-ui/icons';

function ProjectsUserInfo(): React.ReactElement {
  const name = 'Junsu Shin';

  return (
    <Box pt={2} display="flex" flexDirection="row" alignItems="center">
      <AccountBox fontSize="large" color="primary" />
      <Typography variant="h2" color="primary">
        {name}
      </Typography>
    </Box>
  );
}

export default ProjectsUserInfo;
