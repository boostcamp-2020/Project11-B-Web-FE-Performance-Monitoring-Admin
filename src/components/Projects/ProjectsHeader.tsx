import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, Typography } from '@material-ui/core';
import { ControlPoint as ControlPointIcon } from '@material-ui/icons';

function ProjectHeader(): React.ReactElement {
  const titleText = 'Projects';
  const createButtonText = 'Create Project';

  return (
    <Box display="flex" flexDirection="row" justifyContent="space-between">
      <Typography variant="h1">{titleText}</Typography>
      <Button startIcon={<ControlPointIcon />} variant="contained" color="primary">
        <Link to="/projects/new">{createButtonText}</Link>
      </Button>
    </Box>
  );
}

export default ProjectHeader;
