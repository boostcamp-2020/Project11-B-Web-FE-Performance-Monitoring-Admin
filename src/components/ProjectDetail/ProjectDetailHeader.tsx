import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, Typography } from '@material-ui/core';
import { ControlPoint as ControlPointIcon } from '@material-ui/icons';

interface IProps {
  title: string;
}

function ProjectHeader(props: IProps): React.ReactElement {
  const { title } = props;

  return (
    <Box display="flex" flexDirection="row" justifyContent="space-between">
      <Typography variant="h1">{title}</Typography>
    </Box>
  );
}

export default ProjectHeader;
