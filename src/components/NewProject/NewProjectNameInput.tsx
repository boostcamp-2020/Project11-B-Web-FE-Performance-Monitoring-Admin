import React, { useState, useEffect } from 'react';
import { Box, TextField, styled } from '@material-ui/core';

import BackNextButtons from './BackNextButtons';

const CustomTextField = styled(TextField)({
  maxWidth: '300px',
});

interface IProps {
  name: string;
  setName: (name: string) => void;
  handleBack: () => void;
  handleNext: () => void;
}

function NewProjectNameInput(props: IProps): React.ReactElement {
  const { name, setName, handleBack, handleNext } = props;
  const labelText = 'Project name';
  const [inputText, setInputText] = useState('');

  const handleChange = (event: any) => {
    setInputText(event.target.value);
  };

  const handleClick = () => {
    if (inputText === '') return;
    setName(inputText);
    handleNext();
  };

  useEffect(() => {
    setInputText(name);
  }, []);

  return (
    <Box pt={1} display="flex" flexDirection="column">
      <CustomTextField label={labelText} required defaultValue={name} onChange={handleChange} />
      <BackNextButtons
        disableBack
        disableNext={inputText === ''}
        handleBack={handleBack}
        handleNext={handleClick}
      />
    </Box>
  );
}

export default NewProjectNameInput;
