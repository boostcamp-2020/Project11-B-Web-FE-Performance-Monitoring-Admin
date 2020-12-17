import React from 'react';

import { Box, Typography } from '@material-ui/core';

function Error(): React.ReactElement {
  return (
    <Box display="flex" justifyContent="center" pt={25}>
      <Box display="flex" flexDirection="column" alignItems="center">
        <Box mb={10}>
          <Typography variant="h1">Something went Wrong...</Typography>
        </Box>
        <a href="/">
          <Typography variant="h3">Back to main</Typography>
        </a>
      </Box>
    </Box>
  );
}

export default Error;
