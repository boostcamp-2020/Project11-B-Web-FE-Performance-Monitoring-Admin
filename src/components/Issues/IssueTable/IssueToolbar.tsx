import React from 'react';
import { Box, Checkbox, Button, Typography } from '@material-ui/core';

function IssueToolbar(): React.ReactElement {
  return (
    <Box
      bgcolor="#eee"
      borderBottom={1}
      borderColor="#eee"
      px={3}
      display="flex"
      justifyContent="space-between"
    >
      <Box>
        <Box display="flex" gridGap={5}>
          <Box display="flex" alignItems="center">
            <Checkbox checked={false} inputProps={{ 'aria-label': 'primary checkbox' }} />
          </Box>
          <Box display="flex" alignItems="center" fontSize="10px">
            <Button variant="outlined">
              <Box component="span" fontSize="0.625rem" fontWeight={900}>
                Resolve
              </Box>
            </Button>
          </Box>
          <Box display="flex" alignItems="center">
            <Button variant="outlined">
              <Box component="span" fontSize="0.625rem" fontWeight={900}>
                Ignore
              </Box>
            </Button>
          </Box>
          <Box display="flex" alignItems="center">
            <Button variant="outlined">
              <Box component="span" fontSize="0.625rem" fontWeight={900}>
                Merge
              </Box>
            </Button>
          </Box>
        </Box>
      </Box>
      <Box display="flex" justifyContent="space-around" minWidth="300px">
        <Box display="flex" alignItems="center">
          <Typography variant="h4" color="textSecondary">
            Events
          </Typography>
        </Box>
        <Box display="flex" alignItems="center">
          <Typography variant="h4" color="textSecondary">
            {' '}
            Assignee
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default IssueToolbar;
