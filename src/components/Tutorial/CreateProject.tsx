import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, Typography } from '@material-ui/core';

import BackNextButtons from '../NewProject/BackNextButtons';
import { RootState } from '../../modules';
import { addTestProject } from '../../modules/tutorial';

interface IProps {
  handleBack: () => void;
  handleNext: () => void;
}

function CreateProject(props: IProps): React.ReactElement {
  const { handleBack, handleNext } = props;
  const testProjectButtonText = 'Create a test project!';
  const tutorial = useSelector((state: RootState) => state.tutorial);
  const dispatch = useDispatch();

  const { createProject: textContent } = tutorial.text.korean;

  const handleClick = () => {
    dispatch(addTestProject());
  };

  return (
    <Box display="flex" flexDirection="column">
      <Typography>{textContent.welcome}</Typography>
      <Typography>{textContent.description}</Typography>
      <Box p={2}>
        <Button variant="contained" disabled={tutorial.isProjectCreated} onClick={handleClick}>
          {testProjectButtonText}
        </Button>
      </Box>
      {tutorial.isProjectCreated && (
        <Box>
          <Typography>{textContent.congrats}</Typography>
          <Typography>{textContent.checkResult}</Typography>
          <Box p={2}>
            <Link to="/projects">
              <Button variant="contained">{textContent.goToProjects}</Button>
            </Link>
          </Box>
        </Box>
      )}
      <BackNextButtons
        disableBack
        disableNext={!tutorial.isProjectCreated}
        handleBack={handleBack}
        handleNext={handleNext}
      />
    </Box>
  );
}

export default CreateProject;
