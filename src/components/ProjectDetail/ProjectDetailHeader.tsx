import React from 'react';
import { Box, Typography } from '@material-ui/core';

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
