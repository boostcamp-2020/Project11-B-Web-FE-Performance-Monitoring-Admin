import React from 'react';
import { Box, CircularProgress } from '@material-ui/core';

function Progress(): React.ReactElement {
  return (
    <Box mt={20} display="flex" flexDirection="column" alignItems="center">
      <CircularProgress size="12rem" />
    </Box>
  );
}

export default Progress;
