import React from 'react';
import { Box, Hidden, Typography } from '@material-ui/core';

function IssueToolbar(): React.ReactElement {
  return (
    <Box
      bgcolor="#eee"
      borderBottom={1}
      borderColor="#eee"
      px={3}
      display="flex"
      minHeight="50px"
      justifyContent="space-between"
    >
      <Box />

      <Box display="flex" justifyContent="space-around" alignItems="center" minWidth="33%">
        <Hidden mdDown>
          <Box width="240px" display="flex" justifyContent="center">
            <Typography variant="h4" color="textSecondary">
              Graph
            </Typography>
          </Box>
        </Hidden>
        <Box display="flex" justifyContent="center" width="80px">
          <Typography variant="h4" color="textSecondary">
            Events
          </Typography>
        </Box>
        <Box display="flex" justifyContent="center" width="80px">
          <Typography variant="h4" color="textSecondary">
            Users
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default IssueToolbar;
