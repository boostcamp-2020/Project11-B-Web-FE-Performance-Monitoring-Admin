import React from 'react';
import { useHistory } from 'react-router-dom';
import { Box, Button, Typography } from '@material-ui/core';
import { ControlPoint as ControlPointIcon } from '@material-ui/icons';

interface IProps {
  title: string;
}

function ProjectHeader(props: IProps): React.ReactElement {
  const { title } = props;
  const history = useHistory();
  const createButtonText = 'Create Project';

  const handleClick = () => {
    history.push('/projects/new');
  };

  return (
    <Box display="flex" flexDirection="row" justifyContent="space-between">
      <Typography variant="h1">{title}</Typography>
      <Button
        onClick={handleClick}
        startIcon={<ControlPointIcon />}
        variant="contained"
        color="primary"
      >
        {createButtonText}
      </Button>
    </Box>
  );
}

export default ProjectHeader;
