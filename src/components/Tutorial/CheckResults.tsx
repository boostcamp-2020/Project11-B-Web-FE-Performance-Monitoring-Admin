import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Box, Button, Typography } from '@material-ui/core';
import BackNextButtons from '../NewProject/BackNextButtons';
import { RootState } from '../../modules';

interface IProps {
  handleBack: () => void;
  handleNext: () => void;
}

function NewProjectDSN(props: IProps): React.ReactElement {
  const { handleBack, handleNext } = props;
  const tutorial = useSelector((state: RootState) => state.tutorial);

  const { checkResult: textContent } = tutorial.text.korean;

  return (
    <Box display="flex" flexDirection="column">
      <Typography>{textContent.description}</Typography>
      <Box p={2} display="flex">
        <Link to="/issue">
          <Button variant="contained">{textContent.issuesButton}</Button>
        </Link>
        <Link to="/discover" style={{ marginLeft: '10px' }}>
          <Button variant="contained">{textContent.discoverButton}</Button>
        </Link>
      </Box>
      <BackNextButtons handleBack={handleBack} handleNext={handleNext} rightButtonText="Finish" />
    </Box>
  );
}

export default NewProjectDSN;
