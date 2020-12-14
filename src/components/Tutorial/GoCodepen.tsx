import React from 'react';
import { Box, Button, Typography } from '@material-ui/core';
import { useSelector } from 'react-redux';
import BackNextButtons from '../NewProject/BackNextButtons';
import { RootState } from '../../modules';

interface IProps {
  handleBack: () => void;
  handleNext: () => void;
}

function NewProjectDSN(props: IProps): React.ReactElement {
  const { handleBack, handleNext } = props;
  const tutorial = useSelector((state: RootState) => state.tutorial);

  return (
    <Box display="flex" flexDirection="column">
      <Typography>{tutorial.text.korean.goCodepen.description}</Typography>
      <Box p={2}>
        <a
          href="https://codesandbox.io/s/misty-glitter-hw58z?file=/src/index.js"
          target="_blank"
          rel="noreferrer"
        >
          <Button variant="contained">{tutorial.text.korean.goCodepen.buttonText}</Button>
        </a>
      </Box>
      <BackNextButtons handleBack={handleBack} handleNext={handleNext} />
    </Box>
  );
}

export default NewProjectDSN;
