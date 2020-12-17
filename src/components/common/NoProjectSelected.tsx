import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, Paper, Typography, styled } from '@material-ui/core';
import { ControlPoint as ControlPointIcon, Error as ErrorIcon } from '@material-ui/icons';
import NoProjectWarningdImg from '../../image/noProjectWarning.png';

const FullPaper = styled(Paper)({
  width: '100%',
  height: '100%',
  padding: '30px',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  color: 'primary',
  gap: '20px',
});

function NoProjectSelected(): React.ReactElement {
  const warningMessage = 'Uh-oh, Looks like you have no projects selected!';
  const pleaseSelectMessage = 'Please select projects to display';
  const makeProjectMessage = "Or, if you don't have any projects yet, lets go make one!";
  const createButtonText = 'Create Project';

  return (
    <FullPaper>
      <img width="240" height="200" src={NoProjectWarningdImg} alt="No Projects" />
      <Box ml={5} display="flex" flexDirection="column" justifyContent="space-between">
        <Box display="flex" flexDirection="row" alignItems="center">
          <ErrorIcon style={{ fontSize: 60, marginRight: '10px' }} />
          <Typography variant="h1">{warningMessage} </Typography>
        </Box>
        <Typography variant="h2">{pleaseSelectMessage}</Typography>
        <Typography variant="h2">{makeProjectMessage}</Typography>
        <Link to="/projects/new">
          <Button startIcon={<ControlPointIcon />} variant="contained" color="primary">
            {createButtonText}
          </Button>
        </Link>
      </Box>
    </FullPaper>
  );
}

export default NoProjectSelected;
